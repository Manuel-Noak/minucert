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
    const [course] = await db
      .select({
        id,
        category,
        courseId,
        price,
        thumbnailLink,
        title,
        providerId,
        api: apiBaseUrl,
      })
      .from(certification)
      .innerJoin(
        certificationProvider,
        eq(certificationProvider.id, Number(providerId))
      )
      .where(eq(certification.id, Number(paramId)));

    if (!course) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const response = NextResponse.json({ success: true, info: course });
    response.cookies.set(
      "courseInfo",
      JSON.stringify({
        amount: (Number(course.price) / 100).toFixed(2),
        category: course.category,
        title: course.title,
        id: course.id,
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
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
