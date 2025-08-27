import { db } from "@/db";
import { certification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  const { category } = await context.params;
  if (!request.headers.get("host")?.startsWith("localhost:3000")) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const { title, price, courseId, thumbnailLink, currencyCode } = certification;

  const info = await db
    .select({ title, price, courseId, thumbnailLink, currencyCode })
    .from(certification)
    .where(eq(certification.category, category));
  if (!info[0]) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  console.log(info);

  return NextResponse.json({ success: true, info });
}
