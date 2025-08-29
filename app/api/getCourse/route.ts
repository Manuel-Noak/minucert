import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const courseInfo = (await cookieStore).get("courseInfo")?.value;

    if (!courseInfo) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    return NextResponse.json({ success: true, info: JSON.parse(courseInfo) });
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
