import logo from "@/app/assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={logo} alt="logo" />

      <div className={styles.footerLinks}>
        <div className={styles.footerLinksInfo}>
          <h3>Useful Links</h3>
          <Link href={"/"}>Home</Link>
          <Link href={"/certifications/aiCertification"}>Certification</Link>
        </div>
        <div>
          <h3>Certification Policies</h3>
          <p>Certification Appeals Form</p>
          <p>Complaints Form</p>
          <p>Certification Application Form</p>
          <p>Compliance and Policies Center</p>
        </div>
      </div>

      <p className={styles.footerAlright}>
        All rights reserved-2025 Minu Cert Incorporated
      </p>
    </footer>
  );
}
