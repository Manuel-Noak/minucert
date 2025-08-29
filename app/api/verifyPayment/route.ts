import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse request body
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Transaction reference is required" },
        { status: 400 }
      );
    }

    // Call Paystack API
    const verify = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Use secret key (not public key)
          "Content-Type": "application/json",
        },
      }
    );

    const result = await verify.json();
    console.log("Paystack verification result:", result);

    if (result.status && result.data.status === "success") {
      // ✅ Payment verified
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      // ❌ Payment failed
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
          data: result.data,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
