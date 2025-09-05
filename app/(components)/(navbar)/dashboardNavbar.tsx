"use client";
import styles from "./navbar.module.css";
import Logo_img from "../../assets/img/Home/logo_img.png";
import signout_icon from "../../assets/img/Admin/signout_icon.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

interface DashboardNavbarProps {
  backgroundColor?: string;
}

export default function DashboardNavbar({
  backgroundColor = "white",
}: DashboardNavbarProps) {
  const router = useRouter();
  const handleSignOut = () => {
    fetch("/api/adminAuth/logout")
      .then((res) => res.json())
      .then(() => router.replace("/"))
      .catch(() => {
        toast.error("Something wrong");
      });
  };

  return (
    <nav className={styles.dashboard_navbar} style={{ backgroundColor }}>
      <Link href="/" className={styles.logo}>
        <img
          src={Logo_img.src}
          alt="MinuCert Logo"
          className={styles.logo_img}
        />
      </Link>

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
