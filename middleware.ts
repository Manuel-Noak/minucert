import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.PASS_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload?.email || !payload?.role) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api/adminAuth/")) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload?.email || !payload?.role) {
      return NextResponse.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/dashboard/:path*",
    "/api/adminAuth/:path*",
  ],
};
