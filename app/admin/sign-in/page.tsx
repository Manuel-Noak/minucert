"use client";
import { useState } from "react";
import Image from "next/image";
import back_arrow from "../../assets/img/Admin/back_arrow.png";
import styles from "./signin.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/app/(components)/(loading)/loader";

export default function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFields = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.trim().length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const logAdminIn = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setLoading(true);
      const res = await fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }
      router.push("/admin/dashboard");
    } catch (error) {
      return toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);

    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  if (loading && !isSubmitting) {
    return <Loader />;
  }

  return (
    <div className={styles.signinBody}>
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h2 className={styles.welcomeText}>Welcome Back!</h2>
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.backButton}>
          <Image src={back_arrow} alt="Back" className={styles.backArrow} />
          <span className={styles.backText}>Back</span>
        </div>
        <div className={styles.formContent}>
          <h1 className={styles.signInTitle}>Sign In</h1>
          <p className={styles.subtitle}>
            Enter your email address and password to securely log
            <br /> in to <span className={styles.minuCert}>Minu Cert</span>{" "}
            admin portal
          </p>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.textField} ${
                errors.email ? styles.errorField : ""
              }`}
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              required
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`${styles.textField} ${
                errors.password ? styles.errorField : ""
              }`}
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            onClick={logAdminIn}
            className={`${styles.loginButton} ${
              isSubmitting ? styles.loadingButton : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className={styles.loadingSpinner}></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
