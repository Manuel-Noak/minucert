import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db
      .select({
        id: certification.id,
        courseName: certification.title,
        coursePrice: certification.price,
        courseCode: certification.courseId,
        provider: certificationProvider.name,
        currency: certification.currencyCode,
        category: certification.category,
      })
      .from(certification)
      .innerJoin(
        certificationProvider,
        eq(certificationProvider.id, certification.providerId)
      );

    return NextResponse.json({
      success: true,
      courses: result,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, refresh page ",
      },
      { status: 500 }
    );
  }
}
