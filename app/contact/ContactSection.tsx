// ContactSection
"use client";

import React, { useState } from "react";
import Image from "next/image"; // Add this import
import mail_icon from "../assets/img/Contact/mail_icon.png";
import location_icon from "../assets/img/Contact/location_icon.png";
import call_icon from "../assets/img/Contact/call_icon.png";

// Styles
import styles from "./contactSection.module.css";
import { toast } from "react-toastify";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",

    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendMessage = async () => {
    const { firstName, lastName, email, message } = formData;

    if (
      !firstName ||
      !email ||
      !message ||
      message.length < 1 ||
      !lastName ||
      lastName.length < 1 ||
      firstName.length < 1 ||
      email.length < 1
    ) {
      return toast.error("Please complete all required fields");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/storeUserMessage", {
        method: "POST",
        body: JSON.stringify({ form: formData }),
      });
      const { success, message } = await res.json();
      if (!success) {
        return toast.error(message);
      }

      return toast.success(message);
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      {/* Header Section('Get in Touch' text) */}
      <div className={styles.headerSection}>
        <h1 className={styles.contactTitle}>Get in Touch</h1>
      </div>

      <div className={styles.contactContent}>
        {/* Send a Message */}
        <div className={styles.sendMessageSection}>
          <h2 className={styles.sendMessageTitle}>Send a Message</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                className={styles.textField}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className={styles.textField}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className={styles.textField}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.messageField}>
            <label className={styles.fieldLabel}>Your message</label>
            <textarea
              className={styles.messageTextarea}
              placeholder="Notes about your message, e.g. questions or recommendations"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>

          <button
            className={styles.sendMessageButton}
            disabled={loading}
            onClick={handleSendMessage}
          >
            <span className={styles.buttonText}>Send message</span>
          </button>
        </div>

        {/* Let us know how we can help*/}
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
                  Speak to our Customercare team.
                </p>
                <p className={styles.contactInfoText}>Support@minucert.com</p>
              </div>

              {/* Give Us a Call Today Card */}
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

              {/* Our Address Card */}
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
                <p className={styles.contactInfoText}>4 close Maitama, Abuja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
