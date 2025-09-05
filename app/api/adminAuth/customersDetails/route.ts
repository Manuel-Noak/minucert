import { db } from "@/db";
import {
  certification,
  certificationProvider,
  customer,
  customerCertificationOrders,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

interface OrderInfo {
  id: number | null;
  fullname: string;
  email: string | null;
  program: string | null;
  status: string | null;
  date: Date | null;
}
export async function GET() {
  try {
    const rows = await db
      .select({
        providerName: certificationProvider.name,
        id: customer.id,
        fullname: sql<string>`CONCAT(${customer.firstName}, ' ', ${customer.lastName})`,
        email: customer.email,
        program: certification.title,
        status: customerCertificationOrders.status,
        date: customerCertificationOrders.createdOn,
      })
      .from(customerCertificationOrders)
      .leftJoin(
        customer,
        eq(customerCertificationOrders.customerId, customer.id)
      )
      .leftJoin(
        certification,
        eq(customerCertificationOrders.certificationId, certification.id)
      )
      .leftJoin(
        certificationProvider,
        eq(certification.providerId, certificationProvider.id)
      );

    const grouped = rows.reduce((acc, row) => {
      const existing = acc.find((p) => p.providerName === row.providerName);
      const orderInfo: OrderInfo = {
        id: row.id,
        fullname: row.fullname,
        email: row.email,
        program: row.program,
        status: row.status,
        date: row.date,
      };

      if (existing) {
        existing.courseOrders.push(orderInfo);
      } else {
        acc.push({
          providerName: row.providerName!,
          courseOrders: [orderInfo],
        });
      }

      return acc;
    }, [] as { providerName: string; courseOrders: OrderInfo[] }[]);

    return NextResponse.json({
      success: true,
      customers: grouped,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Connectivity Issue",
      },
      { status: 500 }
    );
  }
}
