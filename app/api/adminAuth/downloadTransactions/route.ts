import { db } from "@/db";
import {
  customer,
  customerCertificationOrders,
  certification,
  certificationPurchaseTransaction,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  // Run your query
  const rows = await db
    .select({
      id: certificationPurchaseTransaction.id,
      fullname: sql<string>`CONCAT(${customer.firstName}, ' ', ${customer.lastName})`,
      email: customer.email,
      program: certification.title,
      status: certificationPurchaseTransaction.status,
      body: certificationPurchaseTransaction.responseBody,
      date: certificationPurchaseTransaction.createdOn,
    })
    .from(certificationPurchaseTransaction)
    .innerJoin(
      customerCertificationOrders,
      eq(
        certificationPurchaseTransaction.certificationOrderId,
        customerCertificationOrders.id
      )
    )
    .innerJoin(
      customer,
      eq(customerCertificationOrders.customerId, customer.id)
    )
    .innerJoin(
      certification,
      eq(customerCertificationOrders.certificationId, certification.id)
    );

  // Create a streaming encoder
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      if (!rows.length) {
        controller.enqueue(encoder.encode("No Transaction found\n"));
        controller.close();
        return;
      }

      // Write CSV header
      const headers = Object.keys(rows[0]).join(",") + "\n";
      controller.enqueue(encoder.encode(headers));

      // Write each row one by one
      for (const row of rows) {
        const line =
          Object.values(row)
            .map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`)
            .join(",") + "\n";
        controller.enqueue(encoder.encode(line));
      }

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="transactions.csv"`,
    },
  });
}
