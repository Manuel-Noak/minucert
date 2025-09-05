import { db } from "@/db";
import { internalUser } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, role, username, password } =
      await request.json();

    if (
      email.length <= 0 ||
      firstName.length <= 0 ||
      role.length <= 0 ||
      username.length <= 0 ||
      password.length <= 0
    ) {
      return NextResponse.json(
        { success: false, message: "Incomplete Inputs" },
        { status: 400 }
      );
    }
    const [adminExist] = await db
      .select({ email: internalUser.email })
      .from(internalUser)
      .where(
        and(eq(internalUser.email, email), eq(internalUser.username, username))
      );
    if (adminExist) {
      return NextResponse.json(
        { success: false, message: "Email or Username already exists" },
        { status: 400 }
      );
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await db.insert(internalUser).values({
      email,
      firstName,
      lastName,
      roles: role,
      username,
      password: hashPassword,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully created the admin`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong, refresh page",
      },
      { status: 500 }
    );
  }
}
