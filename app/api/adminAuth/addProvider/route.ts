import { db } from "@/db";
import { certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
export async function POST(request: Request) {
  try {
    const { apiBaseUrl, website, name } = await request.json();

    if (
      !apiBaseUrl ||
      apiBaseUrl.length < 1 ||
      !website ||
      website.length < 1 ||
      !name ||
      name.length < 1
    ) {
      return NextResponse.json(
        { success: false, message: "All fields but be inserted" },
        { status: 400 }
      );
    }

    if (!isValidUrl(apiBaseUrl)) {
      return NextResponse.json(
        {
          success: false,
          message: "Api is invalid",
        },
        { status: 400 }
      );
    }

    const [providerExist] = await db
      .select()
      .from(certificationProvider)
      .where(eq(certificationProvider.name, name));
    if (providerExist) {
      return NextResponse.json(
        { success: false, message: "Provider Already Exist" },
        { status: 400 }
      );
    }
    await db
      .insert(certificationProvider)
      .values({ apiBaseUrl, website, name });

    return NextResponse.json({
      success: true,
      message: `The ${name} provider has been successfully added`,
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
