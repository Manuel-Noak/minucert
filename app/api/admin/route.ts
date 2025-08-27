import { NextResponse } from "next/server";
import { db } from "@/db";
import { internalUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const res = await db
    .select()
    .from(internalUser)
    .where(eq(internalUser.email, email));
  if (!res[0]) {
    return NextResponse.json(
      { success: true, message: "Incorrect email or password" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(password, res[0].password);

  console.log("isValid", isValid);
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { email: res[0].email, role: res[0].roles },
    "admin@gmail.com201902",
    { expiresIn: "1d" }
  );
  console.log("token", token);

  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
