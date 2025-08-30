import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await context.params;

    const { id, category, courseId, price, thumbnailLink, title, providerId } =
      certification;
    const { apiBaseUrl } = certificationProvider;
    const course = await db
      .select({
        id,
        category,
        courseId,
        price,
        thumbnailLink,
        title,
        providerId,
      })
      .from(certification)
      .where(eq(certification.id, paramId));

    if (course.length === 0) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const api = await db
      .select({ apiBaseUrl })
      .from(certificationProvider)
      .where(eq(certificationProvider.id, course[0].providerId));
    if (api.length === 0) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const info = { ...course[0], ...api[0] };

    const response = NextResponse.json({ success: true, info });
    response.cookies.set(
      "courseInfo",
      JSON.stringify({
        amount: (Number(info.price) / 100).toFixed(2),
        category: info.category,
        title: info.title,
        id: info.id,
      }),
      {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 5,
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
