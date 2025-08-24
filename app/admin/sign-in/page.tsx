"use client";
import Image from "next/image";
import heroImage from "../assets/img/heroImage.jpg";
import back_arrow from "../../assets/img/Admin/back_arrow.png";
import styles from "./signin.module.css";

export default function Signin() {
    const handleSignin = () => {
        // Navigate to admin dashboard using window.location
        window.location.href = "/admin/dashboard";
    };

    return (
        <div className={styles.signinBody}>
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}>
                    <h2 className={styles.welcomeText}>Welcome Back!</h2>
                </div>
            </div>
            <div className={styles.formSection}>
                <div className={styles.backButton}>
                    <Image
                        src={back_arrow}
                        alt='Back'
                        className={styles.backArrow}
                    />
                    <span className={styles.backText}>Back</span>
                </div>
                <div className={styles.formContent}>
                    <h1 className={styles.signInTitle}>Sign In</h1>
                    <p className={styles.subtitle}>
                        Enter your email address and password to securely log
                        <br/> in to <span className={styles.minuCert}>Minu Cert</span>{" "}
                        admin portal
                    </p>

                    <div className={styles.inputGroup}>
                        <label htmlFor='email' className={styles.label}>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            className={styles.textField}
                            placeholder='Enter email'
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor='password' className={styles.label}>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className={styles.textField}
                            placeholder='••••••••'
                            required
                        />
                    </div>

                    <button
                        onClick={handleSignin}
                        className={styles.loginButton}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
