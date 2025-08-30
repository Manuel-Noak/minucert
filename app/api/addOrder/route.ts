import { db } from "@/db";
import {
  certification,
  customer,
  customerCertificationOrders,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, firstName, lastName, phone, address, id } = body;

    if (
      email.length === 0 ||
      firstName.length === 0 ||
      phone.length == 0 ||
      lastName.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Incomplete credentials" },
        { status: 400 }
      );
    }

    // 1. Check if customer exists, else insert
    let customerExist = await db
      .select()
      .from(customer)
      .where(eq(customer.email, email));

    if (customerExist.length === 0) {
      await db.insert(customer).values({
        email,
        firstName,
        lastName,
        phoneNumber: phone, // assuming your schema uses phoneNumber
        address,
      });

      [customerExist] = await db
        .select()
        .from(customer)
        .where(eq(customer.email, email));
    } else {
      [customerExist] = customerExist;
    }

    const [certificationDetail] = await db
      .select()
      .from(certification)
      .where(eq(certification.id, id));

    if (!certificationDetail) {
      return NextResponse.json(
        { success: false, message: "Invalid certification ID" },
        { status: 400 }
      );
    }

    // 3. Check if order already exists
    const [existingOrder] = await db
      .select()
      .from(customerCertificationOrders)
      .where(
        and(
          eq(customerCertificationOrders.customerId, customerExist.id),
          eq(customerCertificationOrders.certificationId, id),
          eq(customerCertificationOrders.status, "Pending")
        )
      );
    let ref =
      Math.floor(Math.random() * 1000) +
      crypto.randomUUID() +
      Math.floor(Math.random() * 1000000 + 1);
    if (!existingOrder) {
      ref = crypto.randomUUID();
      await db.insert(customerCertificationOrders).values({
        customerId: customerExist.id,
        certificationId: id,
        status: "Pending",
        reference: ref,
      });
    }
    return NextResponse.json({ success: true, ref });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, refresh page",
      },
      { status: 500 }
    );
  }
}
