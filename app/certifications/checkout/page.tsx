"use client";
import Navbar from "@/app/(components)/(navbar)/navbar";
import CheckoutSection from "./CheckoutSection";

export default function Checkout() {
  return (
    <>
    {/* Navbar */}
      <Navbar 
      backgroundColor="#FAFFEF"
      />

      {/* Checkout Section */}
      <CheckoutSection/>
    </>
  );
}
