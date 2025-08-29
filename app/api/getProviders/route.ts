import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const providers = await db
    .select({ name: certificationProvider.name })
    .from(certificationProvider);
  const categories = await db
    .select({ name: sql<string>`DISTINCT ${certification.category}` })
    .from(certification);
  return NextResponse.json({ success: true, providers, categories });
}
