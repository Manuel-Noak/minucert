import { db } from "@/db";
import { certification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const idHeader = request.headers.get("courseId");
    const id = idHeader ? Number(idHeader) : null;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing courseId" },
        { status: 400 }
      );
    }

    await db.delete(certification).where(eq(certification.id, id));

    return NextResponse.json({
      success: true,
      message: "Successfully deleted the course, along with its orders",
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
