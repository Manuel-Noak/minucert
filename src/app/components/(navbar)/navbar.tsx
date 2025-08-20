"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Logo_img from "../../assets/img/Home/logo_img.png";

export default function Navbar({ 
  backgroundColor = "white", 
  textColor = "#374151", 
  activeTextColor = "#f59e0b",
  loginBtnBg = "#f59e0b",
  loginBtnColor = "#000000",
  loginBtnHoverBg = "#d97706"
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as HTMLElement).closest(`.${styles.navbar}`)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={styles.navbar}
      style={{ backgroundColor }}
    >
      <div className={styles.logo}>
        <img src={Logo_img.src} alt="MinuCert Logo" className={styles.logo_img} />
      </div>

      {/* Desktop Navigation */}
      <div className={styles.nav_links}>
        <Link 
          href={"/"} 
          className={styles.nav_link}
          style={{ color: activeTextColor }}
        >
          Home
        </Link>
        <Link 
          href={"/certification"} 
          className={styles.nav_link_dropdown}
          style={{ color: textColor }}
        >
          Certifications
          <svg className={styles.dropdown_icon} width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link 
          href={"/contact"} 
          className={styles.nav_link}
          style={{ color: textColor }}
        >
          Contact
        </Link>
      </div>

      {/* Desktop Login Button */}
      <button 
        className={styles.login_btn}
        style={{ 
          backgroundColor: loginBtnBg, 
          color: loginBtnColor
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = loginBtnHoverBg}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = loginBtnBg}
      >
        Login
      </button>

      {/* Mobile Hamburger Button */}
      <button 
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.hamburger_line}></span>
        <span className={styles.hamburger_line}></span>
        <span className={styles.hamburger_line}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobile_menu_overlay} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobile_menu}>
          <div className={styles.mobile_nav_links}>
            <Link 
              href={"/"} 
              className={styles.mobile_nav_link}
              style={{ color: activeTextColor }}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href={"/certification"} 
              className={styles.mobile_nav_link_dropdown}
              style={{ color: textColor }}
              onClick={closeMenu}
            >
              Certifications
              <svg className={styles.dropdown_icon} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link 
              href={"/contact"} 
              className={styles.mobile_nav_link}
              style={{ color: textColor }}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile Login Button */}
          <button 
            className={styles.mobile_login_btn}
            style={{ 
              backgroundColor: loginBtnBg, 
              color: loginBtnColor
            }}
            onClick={closeMenu}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = loginBtnHoverBg}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = loginBtnBg}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}