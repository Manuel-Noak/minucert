"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ResponseCodes } from "../../(model)/data";

// Styles
import styles from "./checkoutSection.module.css";

interface CourseInfo {
  id: number;
  title: string;
  category: string;
  amount: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
}

export default function CheckoutSection() {
  const router = useRouter();

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    id: 0,
    title: "",
    category: "",
    amount: 0,
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { email, phone, firstName, lastName } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      toast.error("Please complete all necessary fields");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!/^[0-9+\-() ]{7,15}$/.test(phone)) {
      toast.error("Enter a valid phone number");
      return false;
    }

    if (courseInfo.amount <= 0 || !courseInfo.title || courseInfo.id <= 0) {
      router.replace("/");
      return false;
    }

    return true;
  };

  const handleCompleteCheckout = async () => {
    if (!validateForm()) return;

    const { email, phone, firstName, lastName, address } = formData;
    const { id } = courseInfo;

    try {
      setCheckoutLoading(true);

      const res = await fetch("/api/addOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setCheckoutLoading(false);

      if (!data.success) {
        return toast.error(data.message || "Checkout failed");
      }

      if (data.code === ResponseCodes.VERIFIED_TRANSACTION) {
        return toast.info("Order is already completed");
      }

      router.push(data.authorizedUrl);
    } catch (error) {
      setCheckoutLoading(false);
      toast.error("Couldn't proceed with the payment");
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch("/api/getCourse");
        const data = await res.json();

        if (data.success) {
          setCourseInfo(data.info);
        } else {
          router.replace("/");
        }
      } catch (err) {
        toast.error("Internet Error");
      }
    };

    fetchCourse();
  }, [router]);

  return (
    <section className={styles.checkoutSection}>
      <div className={styles.headerSection}>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
      </div>

      <div className={styles.checkoutContent}>
        {/* Billing Section */}
        <div className={styles.billingSection}>
          <h2 className={styles.billingTitle}>Billing Address</h2>

          <div className={styles.formGrid}>
            {["firstName", "lastName", "email", "phone"].map((field) => (
              <div key={field} className={styles.formField}>
                <label className={styles.fieldLabel}>
                  {field === "firstName"
                    ? "First Name"
                    : field === "lastName"
                    ? "Last Name"
                    : field === "email"
                    ? "Email"
                    : "Phone"}
                </label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                  className={styles.textField}
                  value={formData[field as keyof FormData]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>

          <div className={styles.orderNotesField}>
            <label className={styles.fieldLabel}>Address (optional)</label>
            <textarea
              name="address"
              className={styles.orderNotesTextarea}
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummarySection}>
          <div className={styles.orderSummaryContent}>
            <h2 className={styles.orderSummaryTitle}>Order Summary</h2>

            <div className={styles.priceRow}>
              <span className={styles.subtotalText}>Course Name</span>
              <span className={styles.subtotalPrice}>{courseInfo.title}</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.totalText}>Total</span>
              <span className={styles.totalPrice}>₦{courseInfo.amount}</span>
            </div>

            <button
              className={`${styles.completeCheckoutButton} ${
                checkoutLoading ? styles.loadingButton : ""
              }`}
              onClick={handleCompleteCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? (
                <div className={styles.loadingSpinner}></div>
              ) : (
                <span className={styles.buttonText}>Complete Checkout</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
