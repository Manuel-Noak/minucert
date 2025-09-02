"use client";
import Navbar from "@/app/(components)/(navbar)/navbar";
import CheckoutSection from "./CheckoutSection";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MessageModal } from "@/app/(components)/(common)/popupModal/popupModels";
import Loader from "@/app/(components)/(loading)/loader";

export default function Checkout() {
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [messageDetail, setMessageDetail] = useState<string | undefined>();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (reference) {
      verifyPayment(reference);
    }
  }, []);

  const verifyPayment = async (reference: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      setLoading(false);

      const { success } = await res.json();
      if (success) {
        handleModalMessageContent(
          "Payment Successful",
          "Your payment was approved, an email would be sent to you with credentials",
          true
        );
      } else {
        toast.error("Payment verification failed");
        handleModalMessageContent(
          "Payment Failed",
          "Payment verification failed",
          false
        );
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");
      handleModalMessageContent(
        "Payment Failed",
        "Something went wrong",
        false
      );
    }
    setMessageModalOpen(true);
  };

  const handleMessageModalClose = () => {
    setMessageModalOpen(false);
    router.replace("/");
  };

  const handleModalMessageContent = (
    message: string,
    detailedMessage: string,
    successStatus: boolean
  ) => {
    setMessage(message);
    setMessageDetail(detailedMessage);
    setStatus(successStatus);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar backgroundColor="#FAFFEF" />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleMessageModalClose}
        status={status}
        header={message}
        moreDetails={messageDetail}
      />
      {/* Checkout Section */}
      <CheckoutSection />
    </>
  );
}
