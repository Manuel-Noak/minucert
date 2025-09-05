import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
  customerCertificationOrders,
  certificationPurchaseTransaction,
  certificationPurchaseTransactionLog,
} from "@/db/schema";
import { CertificationPurchaseTransaction } from "@/app/(model)/dto/EntityDtos";
import { PaystackVerifyTransactionResponseDto } from "@/app/(model)/transaction/dto/PaystackDto";
import { ResponseCodes } from "@/app/(model)/data";
import { NextResponse } from "next/server";

export async function verifyTransaction(reference: string) {
  if (!reference) {
    return NextResponse.json(
      { success: false, message: "Transaction reference is required" },
      { status: 400 }
    );
  }

  const transactions: CertificationPurchaseTransaction[] = await getTransaction(
    reference
  );

  if (!transactions || transactions.length === 0) {
    return NextResponse.json(
      { success: false, message: "Transaction not found" },
      { status: 404 }
    );
  }

  const [transaction] = transactions;

  let verify;
  try {
    verify = await fetch(
      `${process.env.PAYSTACK_VERIFY_TRANSACTION_URL}/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Error on payment gateway",
      },
      { status: 500 }
    );
  }

  const result = await verify.json();

  try {
    if (result.status && result.data.status === "success") {
      const mappedResponse = result as PaystackVerifyTransactionResponseDto;

      await updateOrder("COMPLETED", transaction);

      if (mappedResponse.data.amount >= transaction.amount) {
        await updateSuccessfulPurchaseTransaction(
          "COMPLETED",
          JSON.stringify(result),
          mappedResponse,
          transaction
        );
      } else {
        await updateSuccessfulPurchaseTransaction(
          "PARTIALLY_COMPLETED",
          JSON.stringify(result),
          mappedResponse,
          transaction
        );
      }

      const [updatedTransaction]: CertificationPurchaseTransaction[] =
        await getTransaction(transaction.transactionReference);

      await createNewTransactionLog(updatedTransaction);

      return NextResponse.json(
        {
          success: true,
          data: result.data,
          code: ResponseCodes.VERIFIED_TRANSACTION,
        },
        { status: 200 }
      );
    } else {
      await updateFailedPurchaseTransaction(
        "FAILED",
        JSON.stringify(result),
        transaction
      );

      const [updatedTransaction]: CertificationPurchaseTransaction[] =
        await getTransaction(transaction.transactionReference);

      await createNewTransactionLog(updatedTransaction);

      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
          data: result.data,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(
      `Error trying to update record for transaction ${reference}`,
      error
    );

    return NextResponse.json(
      { success: false, message: "Error on updating records" },
      { status: 500 }
    );
  }
}

// keep helpers inside this file
async function getTransaction(
  transactionReference: string
): Promise<CertificationPurchaseTransaction[]> {
  return (await db
    .select()
    .from(certificationPurchaseTransaction)
    .where(
      eq(
        certificationPurchaseTransaction.transactionReference,
        transactionReference
      )
    )) as CertificationPurchaseTransaction[];
}

async function updateOrder(
  status: string,
  transaction: CertificationPurchaseTransaction
) {
  await db
    .update(customerCertificationOrders)
    .set({ status })
    .where(
      eq(customerCertificationOrders.id, transaction.certificationOrderId)
    );
}

async function updateSuccessfulPurchaseTransaction(
  status: string,
  responseBody: string,
  mappedResponse: PaystackVerifyTransactionResponseDto,
  transaction: CertificationPurchaseTransaction
) {
  await db
    .update(certificationPurchaseTransaction)
    .set({
      status,
      paymentId: mappedResponse.data.id,
      paymentGatewayStatus: mappedResponse.data.status,
      responseBody,
    })
    .where(eq(certificationPurchaseTransaction.id, transaction.id));
}

async function updateFailedPurchaseTransaction(
  status: string,
  responseBody: string,
  transaction: CertificationPurchaseTransaction
) {
  await db
    .update(certificationPurchaseTransaction)
    .set({ status, responseBody })
    .where(eq(certificationPurchaseTransaction.id, transaction.id));
}

async function createNewTransactionLog(
  updatedTransaction: CertificationPurchaseTransaction
) {
  await db.insert(certificationPurchaseTransactionLog).values({
    certificationOrderId: updatedTransaction.certificationOrderId,
    amount: updatedTransaction.amount,
    status: updatedTransaction.status,
    transactionReference: updatedTransaction.transactionReference,
    paymentGateway: updatedTransaction.paymentGateway,
    paymentId: updatedTransaction.paymentId,
    paymentGatewayStatus: updatedTransaction.paymentGatewayStatus,
    responseBody: updatedTransaction.responseBody,
  });
}
