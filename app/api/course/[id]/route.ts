import { db } from "@/db";
import { certification, certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { category, courseId, price, thumbnailLink, title, providerId } =
    certification;
  const { apiBaseUrl } = certificationProvider;
  const course = await db
    .select({ category, courseId, price, thumbnailLink, title, providerId })
    .from(certification)
    .where(eq(certification.id, id));

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
      amount: info.price,
      category: info.category,
      title: info.title,
    }),
    {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 5,
    }
  );

  return response;
}
