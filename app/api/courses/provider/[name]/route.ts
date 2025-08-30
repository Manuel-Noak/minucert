import { db } from "@/db";
import { certificationProvider, certification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {
    // Get and validate category
    const providerParam = (await context.params).name;
    if (!providerParam) {
      return NextResponse.json(
        { success: false, error: "Provider is required" },
        { status: 400 }
      );
    }

    const provider = decodeURIComponent(providerParam);
    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Invalid provider" },
        { status: 400 }
      );
    }

    // Destructure fields for better readability
    const { title, price, id, thumbnailLink, currencyCode } = certification;

    // Get certifications and total count in parallel
    const certifications = await db
      .select({ title, price, id, thumbnailLink, currencyCode })
      .from(certification)
      .innerJoin(
        certificationProvider,
        eq(certificationProvider.id, certification.providerId)
      )
      .where(eq(certificationProvider.name, provider));

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
