import { db } from "@/db";
import { certificationProvider } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // const cookies = new coo
    const { apiBaseUrl, website, name } = await request.json();
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

    return NextResponse.json({ success: true });
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
