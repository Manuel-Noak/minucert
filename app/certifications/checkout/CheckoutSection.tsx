"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Styles
import styles from "./checkoutSection.module.css";
import { toast } from "react-toastify";

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompleteCheckout = async () => {
    const { email, phone, firstName, lastName, address } = formData;
    const { id } = courseInfo;

    if (
      courseInfo.amount <= 0 ||
      courseInfo.title.length === 0 ||
      courseInfo.category.length === 0 ||
      id <= 0
    ) {
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

      if (!data.success) {
        return toast.error(data.message);
      }

      handlePayment(data.ref);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!document.querySelector("#paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }

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

  const handlePayment = (ref: string) => {
    // @ts-ignore
    const PaystackPop = window.PaystackPop;

    if (!PaystackPop) {
      toast.error("Paystack script not loaded yet!");
      return;
    }

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_KEY, // use your real public key
      email: formData.email,
      ref,
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: formData.firstName + " " + formData.lastName,
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: formData.phone,
          },
        ],
      },
      amount: courseInfo.amount * 100, // in kobo
      callback: function (response) {
        // This is a valid function
        verifyPayment(response.reference);
      },
    });

    handler.openIframe();
  };

  const verifyPayment = async (reference: string) => {
    try {
      const res = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const { success } = await res.json();
      if (success) {
        router.replace("/");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
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
