// ContactSection
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Add this import
import mail_icon from '../assets/img/Contact/mail_icon.png';
import location_icon from '../assets/img/Contact/location_icon.png';
import call_icon from '../assets/img/Contact/call_icon.png';

// Styles
import styles from "./contactSection.module.css";
import { toast } from "react-toastify";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSendMessage = () => {
        const { fullName, email, phone, subject, message } = formData;
        
        if (!fullName || !email || !phone || !subject) {
            return toast.error("Please complete all required fields");
        }
        
        // Handle form submission logic here
        toast.success("Message sent successfully!");
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
                            <label className={styles.fieldLabel}>
                                Full Name
                            </label>
                            <input
                                type='text'
                                placeholder='Enter Full Name'
                                className={styles.textField}
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label className={styles.fieldLabel}>
                                Email
                            </label>
                            <input
                                type='email'
                                placeholder='Enter email'
                                className={styles.textField}
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.fieldLabel}>Phone</label>
                            <input
                                type='tel'
                                placeholder='Enter phone number'
                                className={styles.textField}
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.fieldLabel}>Subject</label>
                            <input
                                type='text'
                                placeholder='E.g. Inquiring about offer'
                                className={styles.textField}
                                value={formData.subject}
                                onChange={(e) => handleInputChange("subject", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.messageField}>
                        <label className={styles.fieldLabel}>
                            Your message
                        </label>
                        <textarea
                            className={styles.messageTextarea}
                            placeholder='Notes about your message, e.g. questions or recommendations'
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                        />
                    </div>

                    <button
                        className={styles.sendMessageButton}
                        onClick={handleSendMessage}
                    >
                        <span className={styles.buttonText}>
                            Send message
                        </span>
                    </button>
                </div>

                {/* Let us know how we can help*/}
                <div className={styles.letUsHelpSection}>
                    <div className={styles.letUsHelpContent}>
                        <h2 className={styles.letUsHelpTitle}>Let us know how we can help</h2>
                        
                        <div className={styles.contactInfoGrid}>
                            {/* Feedbacks Card */}
                            <div className={styles.contactInfoCard}>
                                <div className={styles.contactIcon}>
                                    <Image src={mail_icon} alt="Mail icon" width={24} height={24} />
                                </div>
                                <h3 className={styles.contactInfoTitle}>Feedbacks</h3>
                                <p className={styles.contactInfoSubtitle}>Speak to our Customercare team.</p>
                                <p className={styles.contactInfoText}>Support@minucert.com</p>
                            </div>

                            {/* Give Us a Call Today Card */}
                            <div className={styles.contactInfoCard}>
                                <div className={styles.contactIcon}>
                                    <Image src={call_icon} alt="Phone icon" width={24} height={24} />
                                </div>
                                <h3 className={styles.contactInfoTitle}>Give Us a Call Today</h3>
                                <p className={styles.contactInfoSubtitle}>Mon-Fri 9am to 5pm</p>
                                <p className={styles.contactInfoText}>+234 09160773406</p>
                            </div>

                            {/* Our Address Card */}
                            <div className={styles.contactInfoCard}>
                                <div className={styles.contactIcon}>
                                    <Image src={location_icon} alt="Location icon" width={24} height={24} />
                                </div>
                                <h3 className={styles.contactInfoTitle}>Our Address</h3>
                                <p className={styles.contactInfoSubtitle}>Visit our office HQ.</p>
                                <p className={styles.contactInfoText}>4 close Maitama, Abuja</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}