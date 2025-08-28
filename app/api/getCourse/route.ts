import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const courseInfo = (await cookieStore).get("courseInfo")?.value;

  if (!courseInfo) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  return NextResponse.json({ success: true, info: JSON.parse(courseInfo) });
}
