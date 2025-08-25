"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Styles
import styles from "./checkoutSection.module.css";

export default function CheckoutSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    orderNotes: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: ''
  });

  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleCompleteCheckout = () => {
    // Handle checkout logic here
    console.log('Checkout completed', formData);
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
              <label className={styles.fieldLabel}>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className={`${styles.textField} ${focusedField === 'fullName' ? styles.fieldActive : ''}`}
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onFocus={() => handleFocus('fullName')}
                onBlur={handleBlur}
              />
            </div>
            
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className={`${styles.textField} ${focusedField === 'email' ? styles.fieldActive : ''}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
              />
            </div>
            
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Phone</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className={`${styles.textField} ${focusedField === 'phone' ? styles.fieldActive : ''}`}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
              />
            </div>
            
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Country</label>
              <input
                type="text"
                placeholder="E.g: Nigeria"
                className={`${styles.textField} ${focusedField === 'country' ? styles.fieldActive : ''}`}
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                onFocus={() => handleFocus('country')}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className={styles.orderNotesField}>
            <label className={styles.fieldLabel}>Order notes(optional)</label>
            <textarea
              placeholder="Notes about your order, e.g. questions or recommendations"
              className={`${styles.orderNotesTextarea} ${focusedField === 'orderNotes' ? styles.fieldActive : ''}`}
              value={formData.orderNotes}
              onChange={(e) => handleInputChange('orderNotes', e.target.value)}
              onFocus={() => handleFocus('orderNotes')}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Order Summary Section('Order Summary' title text, subtotal text and it price value, total text and it price value, horizontal divider line, "Card Details" title text,  the card number text field, the Expiration date text field, Security code text field), disclaimer text,  and the "Complete Checkout" button*/}
        <div className={styles.orderSummarySection}>
          <div className={styles.orderSummaryContent}>
            <h2 className={styles.orderSummaryTitle}>Order Summary</h2>
            
            <div className={styles.priceRow}>
              <span className={styles.subtotalText}>Subtotal</span>
              <span className={styles.subtotalPrice}>₦299,999.00</span>
            </div>
            
            <div className={styles.priceRow}>
              <span className={styles.totalText}>Total</span>
              <span className={styles.totalPrice}>₦299,999.00</span>
            </div>
            
            <div className={styles.dividerLine}></div>
            
            <h2 className={styles.cardDetailsTitle}>Card Details</h2>
            
            <div className={styles.cardField}>
              <label className={styles.fieldLabel}>Card number</label>
              <input
                type="text"
                placeholder="Enter card number"
                className={`${styles.cardNumberField} ${focusedField === 'cardNumber' ? styles.fieldActive : ''}`}
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                onFocus={() => handleFocus('cardNumber')}
                onBlur={handleBlur}
              />
            </div>
            
            <div className={styles.cardRowFields}>
              <div className={styles.cardHalfField}>
                <label className={styles.fieldLabel}>Expiration date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={`${styles.cardHalfInput} ${focusedField === 'expirationDate' ? styles.fieldActive : ''}`}
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  onFocus={() => handleFocus('expirationDate')}
                  onBlur={handleBlur}
                />
              </div>
              
              <div className={styles.cardHalfField}>
                <label className={styles.fieldLabel}>Security code</label>
                <input
                  type="text"
                  placeholder="CVC"
                  className={`${styles.cardHalfInput} ${focusedField === 'securityCode' ? styles.fieldActive : ''}`}
                  value={formData.securityCode}
                  onChange={(e) => handleInputChange('securityCode', e.target.value)}
                  onFocus={() => handleFocus('securityCode')}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            
            <p className={styles.disclaimerText}>
              Your personal data will be used to process your order, and support your experience throughout this website.
            </p>
            
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