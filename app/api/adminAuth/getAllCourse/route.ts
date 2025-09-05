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
        coursePrice: certification.price, // Keep as number
        courseCode: certification.courseId,
        provider: certificationProvider.name,
        currency: certification.currencyCode,
        category: certification.category,
        thumbnailLink: certification.thumbnailLink,
      })
      .from(certification)
      .innerJoin(
        certificationProvider,
        eq(certificationProvider.id, certification.providerId)
      );

    const courses = result.map((course) => ({
      ...course,
      coursePrice: String(course.coursePrice! / 100), // Convert to string
    }));
    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong, refresh page ",
      },
      { status: 500 }
    );
  }
}
