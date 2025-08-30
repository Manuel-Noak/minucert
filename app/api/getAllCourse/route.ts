import { db } from "@/db";
import {
  certification,
  certificationProvider,
  internalUser,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // const cookieStore = cookies();
    // const token = (await cookieStore).get("token")?.value;

    // if (!token) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized Request" },
    //     { status: 401 }
    //   );
    // }

    // const isValid = jwt.verify(token, "admin@gmail.com201902");
    // if (!isValid || !isValid.email) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized Request" },
    //     { status: 401 }
    //   );
    // }

    // const [admins] = await db
    //   .select({ email: internalUser.email })
    //   .from(internalUser)
    //   .where(
    //     and(
    //       eq(internalUser.email, isValid.email),
    //       eq(internalUser.roles, isValid.role)
    //     )
    //   );

    // if (!admins) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized Request" },
    //     { status: 401 }
    //   )
    // }

    const result = await db
      .select({
        id: certification.id,
        courseName: certification.title,
        coursePrice: certification.price,
        courseCode: certification.courseId,
        provider: certificationProvider.name,
        currency: certification.currencyCode,
        category: certification.category,
      })
      .from(certification)
      .innerJoin(
        certificationProvider,
        eq(certificationProvider.id, certification.providerId)
      );

    return NextResponse.json({
      success: true,
      courses: result,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, refresh page ",
      },
      { status: 500 }
    );
  }
}
