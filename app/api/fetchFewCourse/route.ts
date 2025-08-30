import { db } from "@/db";
import { certification } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Destructure fields for better readability
    const { title, price, id, thumbnailLink, currencyCode } = certification;

    // Get certifications and total count in parallel
    const certifications = await db
      .select({ title, price, id, thumbnailLink, currencyCode })
      .from(certification)
      .limit(6);

    // Handle no results found
    if (certifications.length === 0) {
      return NextResponse.json(
        {
          success: true,
          info: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      info: certifications,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
