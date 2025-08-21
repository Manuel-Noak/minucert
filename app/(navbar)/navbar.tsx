import Link from "next/link";
import styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>
        <span>Minu</span>Cert<small>Accept</small>
      </h2>

      <div className={styles.nav_links}>
        <Link href={"/"}>Home</Link>
        <Link href={"/certification"}>Certifications</Link>
        <Link href={"/contact"}>Contact</Link>
      </div>

      <button>Login</button>
    </nav>
  );
}
