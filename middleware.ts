import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("admin/dashboard")) {
    try {
      if (!token) {
        return NextResponse.redirect(new URL("/admin/sign-in", request.url));
      }

      const decodeToken = jwt.verify(token, "admin@gmail.com201902");
      if (!decodeToken?.email || !decodeToken?.role) {
        return NextResponse.redirect(new URL("/admin/sign-in", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }
  } else if (pathname.startsWith("/api/adminAuth/")) {
    try {
      if (!token) {
        return NextResponse.json(
          { success: false, message: "Unauthorized Request" },
          { status: 401 }
        );
      }

      const decodeToken = jwt.verify(token, "admin@gmail.com201902");
      if (!decodeToken?.email || !decodeToken?.role) {
        return NextResponse.json(
          { success: false, message: "Unauthorized Request" },
          { status: 401 }
        );
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({
        success: false,
        message:
          error instanceof Error
            ? `message: ${error.message} \n ${
                error.cause ? `cause: ${error.cause}` : ""
              }`
            : "Something went wrong",
      });
    }
  }
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/dashboard/:path*",
    "/api/adminAuth/:path*",
  ],
};
