"use client";
import Navbar from "@/app/(components)/(navbar)/navbar";
import ContactSection from "./ContactSection";

export default function Contact() {
  return (
    <>
    {/* Navbar */}
      <Navbar 
      backgroundColor="#FAFFEF"
      />

      {/* Contact Section */}
      <ContactSection/>
    </>
  );
}
