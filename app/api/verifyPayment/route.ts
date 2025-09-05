import { verifyTransaction } from "@/lib/verifyTransaction";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { reference } = await request.json();
    return await verifyTransaction(reference);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
