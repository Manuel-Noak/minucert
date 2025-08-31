import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { form, courseExists } = await request.json();
    if (courseExists) {
      return NextResponse.json({
        success: false,
        message: "Course Id and it provider already exists",
      });
    }
    if (!form) {
      return NextResponse.json({ success: false, message: "No form found" });
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
    // console.log(
    //   courseCode,
    //   courseName,
    //   coursePrice,
    //   thumbnailLink,
    //   provider,
    //   currency,
    //   category
    // );

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
    console.log(providerId);

    const price = Number(coursePrice.replace(",", "")) * 100;
    const course_id = Number(courseCode);
    if (Number.isNaN(price) || Number.isNaN(course_id)) {
      return NextResponse.json({
        success: false,
        message: "Price and Course Id must be numbers",
      });
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
    console.log("yes");

    return NextResponse.json({ success: true });
  } catch (err) {
    //  console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
