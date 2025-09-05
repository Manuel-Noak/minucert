import logo from "@/app/assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";
import facebook_icon from "@/app/assets/img/Footer/facebook_icon.png";
import instagram_icon from "@/app/assets/img/Footer/instagram_icon.png";
import linkedin_icon from "@/app/assets/img/Footer/linkedin_icon.png";
import tiktok_icon from "@/app/assets/img/Footer/tiktok_icon.png";
import twitter_icon from "@/app/assets/img/Footer/twitter_icon.png";
import send_icon from "@/app/assets/img/Footer/send_icon.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Section 1: Logo and Social Icons */}
      <div className={styles.topSection}>
        <Link href={"/"} className={styles.logoContainer}>
          <Image src={logo} alt="MinuCert logo" className={styles.logo} />
        </Link>

        <div className={styles.socialIcons}>
          <div className={styles.socialIcon}>
            <Image src={facebook_icon} alt="Facebook" />
          </div>
          <div className={styles.socialIcon}>
            <Image src={instagram_icon} alt="Instagram" />
          </div>
          <div className={styles.socialIcon}>
            <Image src={linkedin_icon} alt="LinkedIn" />
          </div>
          <div className={styles.socialIcon}>
            <Image src={tiktok_icon} alt="TikTok" />
          </div>
          <div className={styles.socialIcon}>
            <Image src={twitter_icon} alt="Twitter" />
          </div>
        </div>
      </div>

      {/* Section 2: Footer Links and Subscribe */}
      <div className={styles.middleSection}>
        <div className={styles.footerLinks}>
          <div className={styles.usefulLinks}>
            <h3>Useful Links</h3>
            <Link href="/">Home</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.certificationPolicies}>
            <h3>Certification Policies</h3>
            <p>Certification Appeals Form</p>
            <p>Complaints Form</p>
            <p>Certification Application Form</p>
            <p>Compliance and Policies Center</p>
          </div>
        </div>

        <div className={styles.subscribeSection}>
          <h3>Subscribe Now</h3>
          <p className={styles.subscribeText}>
            Stay up to date with future
            <br />
            updates and new programs
            <br />
            release
          </p>
          <div className={styles.subscribeContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.subscribeInput}
            />
            <button className={styles.sendButton}>
              <Image src={send_icon} alt="Send" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Copyright */}
      <div className={styles.bottomSection}>
        <div className={styles.divider}></div>
        <p className={styles.copyright}>
          All rights reserved - 2025 MinuCert Incorporated
        </p>
      </div>
    </footer>
  );
}
