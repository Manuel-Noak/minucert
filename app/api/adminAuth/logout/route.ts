import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 0,
    });

    return response;
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    });
  }
}
