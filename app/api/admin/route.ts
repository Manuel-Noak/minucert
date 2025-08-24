import { NextResponse } from "next/server";
import { db } from "@/db";
import { admin } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const res = await db.select().from(admin).where(eq(admin.email, email));

  console.log(res);

  return NextResponse.json({ success: true });
}
