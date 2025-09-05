import { NextResponse } from "next/server";
import { db } from "@/db";
import { internalUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (email.length < 1 || password.length < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    const [res] = await db
      .select()
      .from(internalUser)
      .where(eq(internalUser.email, email));
    if (!res) {
      return NextResponse.json(
        { success: false, message: "Incorrect email or password" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, res.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log(isValid);

    const token = jwt.sign(
      { email: res.email, role: res.roles },
      process.env.PASS_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
