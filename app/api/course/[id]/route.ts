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

    const [course] = await db
      .select({
        id: certification.id,
        category: certification.category,
        courseId: certification.courseId,
        price: certification.price,
        thumbnailLink: certification.thumbnailLink,
        title: certification.title,
        providerId: certification.providerId,
        api: certificationProvider.apiBaseUrl,
      })
      .from(certification)
      .innerJoin(
        certificationProvider,
        eq(certificationProvider.id, certification.providerId) // ✅ correct join
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
