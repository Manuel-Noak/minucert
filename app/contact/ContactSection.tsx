// ContactSection.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import mail_icon from "../assets/img/Contact/mail_icon.png";
import location_icon from "../assets/img/Contact/location_icon.png";
import call_icon from "../assets/img/Contact/call_icon.png";

import styles from "./contactSection.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, message } = formData;
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      toast.error("Please complete all required fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSendMessage = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/storeUserMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message || "Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Couldn't proceed with the message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.contactTitle}>Get in Touch</h1>
      </div>

      <div className={styles.contactContent}>
        {/* Send a Message */}
        <div className={styles.sendMessageSection}>
          <h2 className={styles.sendMessageTitle}>Send a Message</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel} htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter First Name"
                className={styles.textField}
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel} htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                className={styles.textField}
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className={styles.textField}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.messageField}>
            <label className={styles.fieldLabel} htmlFor="message">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.messageTextarea}
              placeholder="Notes about your message, e.g. questions or recommendations"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <button
            className={styles.sendMessageButton}
            disabled={loading}
            onClick={handleSendMessage}
          >
            {loading ? (
              <span className={styles.buttonText}>Sending...</span>
            ) : (
              <span className={styles.buttonText}>Send message</span>
            )}
          </button>
        </div>

        {/* Let us know how we can help */}
        <div className={styles.letUsHelpSection}>
          <div className={styles.letUsHelpContent}>
            <h2 className={styles.letUsHelpTitle}>
              Let us know how we can help
            </h2>

            <div className={styles.contactInfoGrid}>
              {/* Feedbacks Card */}
              <div className={styles.contactInfoCard}>
                <div className={styles.contactIcon}>
                  <Image
                    src={mail_icon}
                    alt="Mail icon"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className={styles.contactInfoTitle}>Feedbacks</h3>
                <p className={styles.contactInfoSubtitle}>
                  Speak to our Customer care team.
                </p>
                <p className={styles.contactInfoText}>Support@minucert.com</p>
              </div>

              {/* Call Today Card */}
              <div className={styles.contactInfoCard}>
                <div className={styles.contactIcon}>
                  <Image
                    src={call_icon}
                    alt="Phone icon"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className={styles.contactInfoTitle}>
                  Give Us a Call Today
                </h3>
                <p className={styles.contactInfoSubtitle}>Mon-Fri 9am to 5pm</p>
                <p className={styles.contactInfoText}>+234 09160773406</p>
              </div>

              {/* Address Card */}
              <div className={styles.contactInfoCard}>
                <div className={styles.contactIcon}>
                  <Image
                    src={location_icon}
                    alt="Location icon"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className={styles.contactInfoTitle}>Our Address</h3>
                <p className={styles.contactInfoSubtitle}>
                  Visit our office HQ.
                </p>
                <p className={styles.contactInfoText}>4 Close Maitama, Abuja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
