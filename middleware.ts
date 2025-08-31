import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin/dashboard/")) {
    try {
      if (!token) {
        return NextResponse.redirect(new URL("/admin/sign-in"));
      }

      const decodeToken = jwt.verify(token, "admin@gmail.com201902");
      if (!decodeToken || !decodeToken.email || !decodeToken.role) {
        return NextResponse.redirect(new URL("/app/admin/sign-in"));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({
        success: false,
        message:
          error instanceof Error
            ? `message: ${error.message} \n ${
                error.cause && `cause: ${error.cause}`
              }`
            : "Something went wrong",
      });
    }
  }
  if (pathname.startsWith("/api/adminAuth/")) {
    try {
      if (!token) {
        return NextResponse.json(
          { success: false, message: "UnAuthorized Request" },
          { status: 401 }
        );
      }

      const decodeToken = jwt.verify(token, "admin@gmail.com201902");
      if (!decodeToken || !decodeToken.email || !decodeToken.role) {
        return NextResponse.json(
          { success: false, message: "UnAuthorized Request" },
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
                error.cause && `cause: ${error.cause}`
              }`
            : "Something went wrong",
      });
    }
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/adminAuth/:path*"],
};
