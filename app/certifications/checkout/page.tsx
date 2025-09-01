"use client";
import Navbar from "@/app/(components)/(navbar)/navbar";
import CheckoutSection from "./CheckoutSection";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (reference) {
      verifyPayment(reference);
    }
  });

  const verifyPayment = async (reference: string) => {
    try {
      const res = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const { success } = await res.json();
      if (success) {
        console.log("A sucessful transaction");
        router.replace("/");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar backgroundColor="#FAFFEF" />

      {/* Checkout Section */}
      <CheckoutSection />
    </>
  );
}
