import {
  Certification,
  CertificationOrder,
  Customer,
  CertificationPurchaseTransaction,
} from "@/app/(model)/dto/EntityDtos";
import { InitializeCourseOrderDto } from "@/app/(model)/transaction/dto/InitializeCourseOrderDto";
import { db } from "@/db";
import {
  certification,
  customer,
  customerCertificationOrders,
  certificationPurchaseTransaction,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { generateDailyHash } from "../../(components)/(common)/utils";
import {
  PaystackMetadata,
  PaystackCreateTransactionDto,
  PaystackCreateTransactionResponseDto,
} from "@/app/(model)/transaction/dto/PaystackDto";
import { postRequest } from "@/app/(components)/(common)/network/PostRequest";
import { verifyTransaction } from "../verifyPayment/route";
import { ResponseCodes } from "@/app/(model)/data";

export async function POST(request: Request) {
  try {
    const body: InitializeCourseOrderDto = await request.json();

    const { email, firstName, lastName, phone, address, id } = body;

    if (
      email.length === 0 ||
      firstName.length === 0 ||
      phone.length == 0 ||
      lastName.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Incomplete data to initiate order" },
        { status: 400 }
      );
    }

    const existingCustomer = await getOrCreateCustomer(
      email,
      firstName,
      lastName,
      phone,
      address
    );

    const certificationDetail = await getCertification(id);

    if (!certificationDetail) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid certification ID",
          code: ResponseCodes.CERTIFICATION_NOT_FOUND,
        },
        { status: 404 }
      );
    }

    return await createOrderAndInitiateTransaction(
      existingCustomer,
      certificationDetail
    );
  } catch (err) {
    console.error("Something went wrong ", err);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, refresh page",
      },
      { status: 500 }
    );
  }
}

async function getOrCreateCustomer(
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string
): Promise<Customer> {
  let existingCustomers = (await db
    .select()
    .from(customer)
    .where(eq(customer.email, email))) as Customer[];

  if (!existingCustomers || existingCustomers.length === 0) {
    await db.insert(customer).values({
      email,
      firstName,
      lastName,
      phoneNumber: phone,
      address,
    });

    existingCustomers = (await db
      .select()
      .from(customer)
      .where(eq(customer.email, email))) as Customer[];
  }

  const [existingCustomer] = existingCustomers;

  return existingCustomer;
}

async function getCertification(
  certificationId: number
): Promise<Certification> {
  const [certificationDetail] = (await db
    .select()
    .from(certification)
    .where(eq(certification.id, certificationId))) as Certification[];

  return certificationDetail;
}

async function createOrderAndInitiateTransaction(
  customer: Customer,
  certification: Certification
) {
  const orderReference = generateDailyHash(`${customer.id}${certification.id}`);

  let existingOrders: CertificationOrder[] = await getOrderByReference(
    orderReference
  );

  if (!existingOrders || existingOrders.length == 0) {
    const result = await createPendingOrder(
      customer,
      certification,
      orderReference
    );

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Could not create order" },
        { status: 500 }
      );
    }

    existingOrders = await getOrderByReference(orderReference);
  }

  const [order] = existingOrders;

  if (order.status === "COMPLETED") {
    const transactions: CertificationPurchaseTransaction[] =
      await getExistingTransactionByOrderId(order);

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "There is a completed order with no transaction",
        },
        { status: 404 }
      );
    }

    const [transaction] = transactions;

    try {
      return await {
        ...verifyTransaction(transaction.transactionReference),
        code: ResponseCodes.DUPLICATE_TRANSACTION,
      };
    } catch (error) {
      console.error(
        `Error trying to verify completed transaction for order ${order.reference}`,
        error
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Something went wrong while to verify transaction for completed order",
        },
        { status: 500 }
      );
    }
  }

  //initiateTransaction on paystack
  const callbackUrl = `${process.env.BASE_URL}/certifications/checkout`;

  const metadata: PaystackMetadata = {
    customer_id: customer.id,
    course_id: certification.id,
    callback_url: callbackUrl,
    custom_fields: [
      {
        display_name: "Name",
        variable_name: "name",
        value: `${customer.firstName} ${customer.lastName}`,
      },
      {
        display_name: "Phone",
        variable_name: "phone",
        value: customer.phoneNumber,
      },
    ],
  };

  const paystackCreateTransactionDto: PaystackCreateTransactionDto = {
    amount: certification.price,
    email: customer.email,
    callback_url: callbackUrl,
    metadata,
  };

  const payload = JSON.stringify(paystackCreateTransactionDto);
  const url = `${process.env.PAYSTACK_INITIATE_TRANSACTION_URL}`;
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };

  let result: PaystackCreateTransactionResponseDto;
  try {
    const response = await postRequest<PaystackCreateTransactionResponseDto>(
      url,
      payload,
      header
    );

    console.log("Response " + response);
    result = response;
  } catch (error) {
    console.error("Paystack API call failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while trying to communicate with payment gateway",
      },
      { status: 500 }
    );
  }

  const data = result.data;
  if (result.status) {
    //create transaction
    const insertTrxResult = await createPendingTransaction(
      order.id,
      certification.price,
      data.reference
    );

    if (!insertTrxResult) {
      return NextResponse.json(
        { success: false, message: "Could not create transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        code: ResponseCodes.SUCCESS,
        authorizedUrl: data.authorization_url,
        accessCode: data.access_code,
        reference: data.access_code,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Could not create order or transaction" },
    { status: 400 }
  );
}

async function getOrderByReference(
  reference: string
): Promise<CertificationOrder[]> {
  return (await db
    .select()
    .from(customerCertificationOrders)
    .where(
      eq(customerCertificationOrders.reference, reference)
    )) as CertificationOrder[];
}

async function createPendingOrder(
  customer: Customer,
  certification: Certification,
  reference: string
) {
  return await db.insert(customerCertificationOrders).values({
    customerId: customer.id,
    certificationId: certification.id,
    status: "PENDING",
    reference,
  });
}

async function getExistingTransactionByOrderId(
  order: CertificationOrder
): Promise<CertificationPurchaseTransaction[]> {
  return (await db
    .select()
    .from(certificationPurchaseTransaction)
    .where(
      eq(certificationPurchaseTransaction.certificationOrderId, order.id)
    )) as CertificationPurchaseTransaction[];
}

async function createPendingTransaction(
  certificationOrderId: number,
  amount: number,
  transactionReference: string
) {
  return await db.insert(certificationPurchaseTransaction).values({
    certificationOrderId,
    amount,
    status: "PENDING",
    transactionReference,
    paymentGateway: "PAYSTACK",
  });
}
