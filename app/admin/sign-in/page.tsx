import Image from "next/image";
import heroImage from "../assets/heroImage.jpg";
import styles from "./signin.module.css";
export default function Signin() {
  return (
    <div className={styles.signinBody}>
      <div className={styles.logo}>
        {/* <Image src={heroImage} alt="Logo" /> */}
        <h2>Welcome Back!</h2>
      </div>
      <div className={styles.mainContent}>
        <h2>Sign In</h2>
        <p>Please enter your email and password</p>
        <label htmlFor="email">Email</label>
        <input type="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" required />
        <button>Login</button>
      </div>
    </div>
  );
}
