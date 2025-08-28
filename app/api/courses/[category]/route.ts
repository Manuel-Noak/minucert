import { db } from "@/db";
import { certification } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const perPageParam = searchParams.get("perPage");
    const offsetParam = searchParams.get("offset");

    const perPage = perPageParam
      ? Math.min(Math.max(Number(perPageParam), 1), 100)
      : 10;
    const offset = offsetParam ? Math.max(Number(offsetParam), 0) : 0;

    // Validate numbers
    if (isNaN(perPage) || isNaN(offset)) {
      return NextResponse.json(
        { success: false, error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // Get and validate category
    const categoryParam = (await context.params).category;
    if (!categoryParam) {
      return NextResponse.json(
        { success: false, error: "Category is required" },
        { status: 400 }
      );
    }

    const category = decodeURIComponent(categoryParam).trim();
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Invalid category" },
        { status: 400 }
      );
    }

    // Destructure fields for better readability
    const { title, price, id, thumbnailLink, currencyCode } = certification;

    // Get certifications and total count in parallel
    const [certifications, totalCount] = await Promise.all([
      db
        .select({ title, price, id, thumbnailLink, currencyCode })
        .from(certification)
        .where(eq(certification.category, category))
        .limit(perPage)
        .offset(offset),

      db
        .select({ count: count() })
        .from(certification)
        .where(eq(certification.category, category)),
    ]);

    // Handle no results found
    if (certifications.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          pagination: {
            total: 0,
            perPage,
            offset,
            hasMore: false,
          },
        },
        { status: 200 }
      );
    }

    const total = totalCount[0].count;
    const hasMore = offset + certifications.length < total;

    return NextResponse.json({
      success: true,
      info: certifications,
      pagination: {
        total,
        perPage,
        offset,
        hasMore,
        totalPages: Math.ceil(total / perPage),
        currentPage: Math.floor(offset / perPage) + 1,
      },
    });
  } catch (error) {
    console.error("Error fetching certifications:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
