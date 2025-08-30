import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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

    const price = Number(coursePrice.replace(",", "")) * 100;

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
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, refresh page",
      },
      { status: 500 }
    );
  }
}
