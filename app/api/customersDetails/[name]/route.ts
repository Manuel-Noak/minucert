import { db } from "@/db";
import {
  certification,
  certificationProvider,
  customer,
  customerCertificationOrders,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ name: number }> }
) {
  try {
    const { name } = await context.params;

    const result = await db
      .select({
        id: customer.id,
        fullname: sql<string>`CONCAT(${customer.firstName}, ' ', ${customer.lastName})`,
        email: customer.email,
        program: certification.title,
        status: customerCertificationOrders.status,
        date: customerCertificationOrders.createdOn,
      })
      .from(customerCertificationOrders)
      .innerJoin(
        customer,
        eq(customerCertificationOrders.customerId, customer.id)
      )
      .innerJoin(
        certification,
        eq(customerCertificationOrders.certificationId, certification.id)
      )
      .innerJoin(
        certificationProvider,
        eq(certification.providerId, certificationProvider.id)
      )
      .where(eq(certificationProvider.name, name)); // ✅ filter by category

    return NextResponse.json({
      success: true,
      customers: result,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
