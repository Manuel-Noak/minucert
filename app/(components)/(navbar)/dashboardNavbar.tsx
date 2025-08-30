"use client";
import styles from "./navbar.module.css";
import Logo_img from "../../assets/img/Home/logo_img.png";
import signout_icon from "../../assets/img/Admin/signout_icon.png";

interface DashboardNavbarProps {
  backgroundColor?: string;
  onSignOut?: () => void;
}

export default function DashboardNavbar({
  backgroundColor = "white",
  onSignOut,
}: DashboardNavbarProps) {
  const handleSignOut = () => {
    // Add your sign out logic here
    if (onSignOut) {
      onSignOut();
    } else {
      // Default sign out behavior
      console.log("Sign out clicked");
      // Example: redirect to login page
      // window.location.href = "/login";
    }
  };

  return (
    <nav className={styles.dashboard_navbar} style={{ backgroundColor }}>
      <div className={styles.logo}>
        <img
          src={Logo_img.src}
          alt="MinuCert Logo"
          className={styles.logo_img}
        />
      </div>

      {/* Sign Out Button */}
      <button
        className={styles.signout_btn}
        onClick={handleSignOut}
        aria-label="Sign out"
      >
        <img
          src={signout_icon.src}
          alt="Sign out"
          className={styles.signout_icon}
        />
        <span className={styles.signout_text}>Sign out</span>
      </button>
    </nav>
  );
}
