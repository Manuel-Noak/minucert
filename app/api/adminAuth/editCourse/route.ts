import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm"; // Import and function
import { NextResponse } from "next/server";

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { form } = await request.json();

    if (!form) {
      return NextResponse.json(
        { success: false, message: "No form found" },
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
      mainId,
    } = form;

    if (!isValidUrl(thumbnailLink)) {
      return NextResponse.json(
        {
          success: false,
          message: "ThumbnailLink is invalid",
        },
        { status: 400 }
      );
    }

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

    // Use and() function to combine multiple conditions
    const [result] = await db
      .update(certification)
      .set({
        title: courseName,
        courseId: course_id,
        price,
        category,
        currencyCode: currency,
        thumbnailLink,
        providerId: providerId.id,
      })
      .where(eq(certification.id, mainId));

    if (result.affectedRows < 1) {
      return NextResponse.json({
        success: false,
        message: "No data was changed",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully edited ${courseName}`,
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
