"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "../../(model)/data";

// Styles
import styles from "./checkoutSection.module.css";
import { toast } from "react-toastify";
import Loader from "@/app/(components)/(loading)/loader";

export default function CheckoutSection() {
  const router = useRouter();
  const [courseInfo, setCourseInfo] = useState({
    amount: 0,
    title: "",
    category: "",
    id: 0,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompleteCheckout = async () => {
    const { email, phone, firstName, lastName, address } = formData;
    const { id } = courseInfo;

    if (courseInfo.amount <= 0 || courseInfo.title.length === 0 || id <= 0) {
      return router.replace("/");
    }

    if (
      email.length === 0 ||
      phone.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0
    ) {
      return toast.error("Please complete all necessary fields");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/addOrder", {
        method: "POST",
        body: JSON.stringify({
          email,
          phone,
          address,
          firstName,
          lastName,
          id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        return toast.error(data.message);
      }

      if (ResponseCodes.VERIFIED_TRANSACTION === data.code) {
        //It verified existing transaction with completed
        return toast.info("Order is already completed");
      }

      router.push(data.authorizedUrl);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetch("/api/getCourse")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourseInfo(data.info);

          return;
        } else router.replace("/");
      })
      .catch(() => router.replace("/"));
  }, [router]);

  if (loading) {
    return <Loader />;
  }

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
                className={`${styles.textField} `}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className={`${styles.textField} `}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className={`${styles.textField} `}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Phone</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className={`${styles.textField} `}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.orderNotesField}>
            <label className={styles.fieldLabel}>Address(optional)</label>
            <textarea
              className={`${styles.orderNotesTextarea}`}
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
