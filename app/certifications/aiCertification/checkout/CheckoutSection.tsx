"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Styles
import styles from "./checkoutSection.module.css";

export default function CheckoutSection() {
  const router = useRouter();
  const [courseInfo, setCourseInfo] = useState({
    amount: 0,
    title: "",
    category: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompleteCheckout = () => {
    if (
      courseInfo.amount <= 0 ||
      courseInfo.title.length === 0 ||
      courseInfo.category.length === 0
    ) {
      return router.replace("/");
    }
    payWithPayStack();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    const data = sessionStorage.getItem("courseDetail");
    if (!data) {
      return router.replace("/");
    }
    let courseDetail = JSON.parse(data);
    courseDetail = Object.create({
      amount: courseDetail.amount,
      title: courseDetail.name,
      category: courseDetail.category,
    });
    setCourseInfo(courseDetail);
  }, [router]);

  const payWithPayStack = () => {
    // @ts-ignore
    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // public key
      email: formData.email,
      amount: courseInfo.amount * 100, // in kobo
      callback: async (response: any) => {
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference }),
        });
        const { success } = await res.json();
        if (success) {
          router.replace("/");
        }
      },
    });
    handler.openIframe();
  };

  return (
    <section className={styles.checkoutSection}>
      {/* Header Section('Checkout' text) */}
      <div className={styles.headerSection}>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
      </div>

      <div className={styles.checkoutContent}>
        {/* Billing Address Section('Billing Address' text, the 2 by 2 grid text fields, order note text field) */}
        <div className={styles.billingSection}>
          <h2 className={styles.billingTitle}>Billing Address</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                className={`${styles.textField} ${
                  focusedField === "fullName" ? styles.fieldActive : ""
                }`}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className={`${styles.textField} ${
                  focusedField === "fullName" ? styles.fieldActive : ""
                }`}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className={`${styles.textField} ${
                  focusedField === "email" ? styles.fieldActive : ""
                }`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Phone</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className={`${styles.textField} ${
                  focusedField === "phone" ? styles.fieldActive : ""
                }`}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.orderNotesField}>
            <label className={styles.fieldLabel}>Address(optional)</label>
            <textarea
              className={`${styles.orderNotesTextarea} ${
                focusedField === "orderNotes" ? styles.fieldActive : ""
              }`}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </div>

        {/* Order Summary Section('Order Summary' title text, subtotal text and it price value, total text and it price value, horizontal divider line, "Card Details" title text,  the card number text field, the Expiration date text field, Security code text field), disclaimer text,  and the "Complete Checkout" button*/}
        <div className={styles.orderSummarySection}>
          <div className={styles.orderSummaryContent}>
            <h2 className={styles.orderSummaryTitle}>Order Summary</h2>

            <div className={styles.priceRow}>
              <span className={styles.subtotalText}>Course Name</span>
              <span className={styles.subtotalPrice}>{courseInfo.title} </span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.totalText}>Total</span>
              <span className={styles.totalPrice}>₦{courseInfo.amount}</span>
            </div>

            <button
              className={styles.completeCheckoutButton}
              onClick={handleCompleteCheckout}
            >
              <span className={styles.buttonText}>Complete Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
