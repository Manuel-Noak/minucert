<<<<<<< HEAD
=======
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { reference } = await request.json();

  console.log(reference);
  const verify = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.P_KEY}`,
      },
    }
  );

  const result = await verify.json();
  console.log(result);

  return NextResponse.json({ success: true });
}
>>>>>>> e06e757 (payment_integration_v2)
