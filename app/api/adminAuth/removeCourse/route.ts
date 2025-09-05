import { db } from "@/db";
import { certification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const id = request.headers.get("courseId");

    await db.delete(certification).where(eq(certification.id, Number(id)));

    return NextResponse.json({
      success: true,
      message: "Successfully deleted the course",
    });
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
