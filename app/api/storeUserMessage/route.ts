import { db } from "@/db";
import { customerComplaints } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { form } = await request.json();

    if (!form) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 400 }
      );
    }

    const hasEmptyValue = Object.entries(form).some(([_, value]) => {
      if (!value || value.toString().trim().length === 0) {
        return true;
      }
      return false;
    });

    if (hasEmptyValue) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields  are required",
        },
        { status: 400 }
      );
    }

    const { email, firstName, lastName, message } = form;

    await db.insert(customerComplaints).values({
      email,
      firstName,
      lastName,
      complaint: message,
    });

    return NextResponse.json({
      success: true,
      message: "Message successfully received",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Please check your connection",
      },
      { status: 500 }
    );
  }
}
