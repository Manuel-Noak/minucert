<<<<<<< HEAD
import Image from "next/image";
=======
"use client";
import { useState } from "react";
>>>>>>> origin/main
import styles from "./signin.module.css";
export default function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const logAdminIn = async () => {
    if (password.trim().length < 1 || email.trim().length < 1) {
      return;
    }

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <div className={styles.signinBody}>
      <div className={styles.logo}>
        <h2>Welcome Back!</h2>
      </div>
      <div className={styles.mainContent}>
        <h2>Sign In</h2>
        <p>Please enter your email and password</p>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          type="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <button onClick={logAdminIn}>Login</button>
      </div>
    </div>
  );
}
