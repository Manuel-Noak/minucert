import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    courseCode,
    courseName,
    coursePrice,
    thumbnailLink,
    provider,
    currency,
    category,
  } = await request.json();

  const [providerId] = await db
    .select({ id: certificationProvider.id })
    .from(certificationProvider)
    .where(eq(certificationProvider.name, provider));
  if (!providerId) {
    return NextResponse.json(
      { success: false, message: "Invalid Id" },
      { status: 400 }
    );
  }
  console.log(coursePrice.replace(",", ""));

  const price = Number(coursePrice.replace(",", "")) * 100;
  console.log("sp");

  await db.insert(certification).values({
    title: courseName,
    courseId: courseCode,
    price,
    category,
    currencyCode: currency,
    thumbnailLink,
    providerId: providerId.id,
  });

  return NextResponse.json({ success: true });
}
