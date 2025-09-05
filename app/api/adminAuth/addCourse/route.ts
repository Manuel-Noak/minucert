import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { form, courseExists } = await request.json();

    if (courseExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Course Id and it provider already exists",
        },
        { status: 400 }
      );
    }

    if (!form) {
      return NextResponse.json(
        { success: false, message: "No form found" },
        { status: 400 }
      );
    }

    const hasEmptyValue = Object.entries(form).some(([key, value]) => {
      if (
        key !== "thumbnailLink" &&
        (!value || value.toString().trim().length === 0)
      ) {
        return true;
      }
      return false;
    });

    if (hasEmptyValue) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields except thumbnailLink are required",
        },
        { status: 400 }
      );
    }

    const {
      courseCode,
      courseName,
      coursePrice,
      thumbnailLink,
      provider,
      currency,
      category,
    } = form;

    const [providerId] = await db
      .select({ id: certificationProvider.id })
      .from(certificationProvider)
      .where(eq(certificationProvider.name, provider));

    if (!providerId) {
      return NextResponse.json(
        { success: false, message: "Invalid provider" },
        { status: 400 }
      );
    }

    const price = Number(coursePrice.replace(",", "")) * 100;
    const course_id = Number(courseCode);

    if (Number.isNaN(price) || Number.isNaN(course_id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Price and Course Id must be numbers",
        },
        { status: 400 }
      );
    }

    await db.insert(certification).values({
      title: courseName,
      courseId: course_id,
      price,
      category,
      currencyCode: currency,
      thumbnailLink,
      providerId: providerId.id,
    });

    return NextResponse.json({
      success: true,
      message: `The ${courseName} course has been successfully added`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
