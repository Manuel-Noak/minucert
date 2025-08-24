"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";
import Logo_img from "../../assets/img/Home/logo_img.png";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar({
  backgroundColor = "white",
  textColor = "#374151",
  activeTextColor = "#FFBB15",
  loginBtnBg = "#f59e0b",
  loginBtnColor = "#000000",
  loginBtnHoverBg = "#d97706",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideSubLink, setHideSubLink] = useState(true);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  
  const changeRoute = () => {
    router.push("/admin/sign-in");
  };

  // Helper function to check if a path is active
  const isActivePage = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Check if any certification page is active
  const isCertificationActive = () => {
    return pathname.startsWith("/certifications");
  };

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dropdown height for smooth animation
  useEffect(() => {
    if (dropdownContentRef.current) {
      if (!hideSubLink) {
        const height = dropdownContentRef.current.scrollHeight;
        setDropdownHeight(height);
      } else {
        setDropdownHeight(0);
      }
    }
  }, [hideSubLink]);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target instanceof Element && event.target.closest(`.${styles.navbar}`))
      ) {
        setIsMenuOpen(false);
      }

      // Close dropdown if clicking outside
      if (
        !hideSubLink &&
        event.target instanceof Element &&
        !event.target.closest(`.${styles.dropdown_container}`)
      ) {
        setHideSubLink(true);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Always listen for dropdown outside clicks
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, hideSubLink]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setHideSubLink(!hideSubLink);
  };

  return (
    <nav 
      className={`${styles.navbar} ${isScrolled ? styles.navbar_scrolled : ''}`} 
      style={{ 
        backgroundColor: isScrolled ? 'transparent' : backgroundColor 
      }}
    >
      <div className={styles.logo}>
        <img
          src={Logo_img.src}
          alt="MinuCert Logo"
          className={styles.logo_img}
        />
      </div>

      {/* Desktop Navigation */}
      <div className={styles.nav_links}>
        <Link
          href={"/"}
          className={styles.nav_link}
          style={{ 
            color: isActivePage("/") ? activeTextColor : textColor 
          }}
        >
          Home
        </Link>
        
        {/* Enhanced Dropdown Container */}
        <div className={styles.dropdown_container}>
          <p
            onClick={toggleDropdown}
            className={`${styles.nav_link_dropdown} ${!hideSubLink ? styles.dropdown_active : ''}`}
            style={{ 
              color: isCertificationActive() ? activeTextColor : textColor 
            }}
          >
            Certifications
            <svg
              className={`${styles.dropdown_icon} ${!hideSubLink ? styles.dropdown_icon_rotated : ''}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          
          {/* Animated Dropdown */}
          <div 
            ref={dropdownRef}
            className={`${styles.dropdown_menu} ${!hideSubLink ? styles.dropdown_menu_open : ''}`}
            style={{ 
              height: `${dropdownHeight}px`,
              opacity: hideSubLink ? 0 : 1,
              visibility: hideSubLink ? 'hidden' : 'visible'
            }}
          >
            <div ref={dropdownContentRef} className={styles.dropdown_content}>
              <Link
                className={`${styles.nav_link} ${styles.subLinks}`}
                style={{ 
                  color: isActivePage("/certifications/aiCertification") ? activeTextColor : textColor 
                }}
                href={"/certifications/aiCertification"}
                onClick={() => setHideSubLink(true)}
              >
                AI Certification
              </Link>
            </div>
          </div>
        </div>

        <Link
          href={"/contact"}
          className={styles.nav_link}
          style={{ 
            color: isActivePage("/contact") ? activeTextColor : textColor 
          }}
        >
          Contact
        </Link>
      </div>

      {/* Desktop Login Button */}
      <button
        className={styles.login_btn}
        style={{
          backgroundColor: loginBtnBg,
          color: loginBtnColor,
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = loginBtnHoverBg)
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = loginBtnBg)
        }
        onClick={changeRoute}
      >
        Login
      </button>

      {/* Mobile Hamburger Button */}
      <button
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.hamburger_line}></span>
        <span className={styles.hamburger_line}></span>
        <span className={styles.hamburger_line}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobile_menu_overlay} ${
          isMenuOpen ? styles.active : ""
        }`}
      >
        <div className={styles.mobile_menu}>
          <div className={styles.mobile_nav_links}>
            <Link
              href={"/"}
              className={styles.mobile_nav_link}
              style={{ 
                color: isActivePage("/") ? activeTextColor : textColor 
              }}
              onClick={closeMenu}
            >
              Home
            </Link>
            
            {/* Mobile Dropdown */}
            <div className={styles.mobile_dropdown_container}>
              <p
                onClick={toggleDropdown}
                className={`${styles.mobile_nav_link_dropdown} ${!hideSubLink ? styles.dropdown_active : ''}`}
                style={{ 
                  color: isCertificationActive() ? activeTextColor : textColor 
                }}
              >
                Certifications
                <svg
                  className={`${styles.dropdown_icon} ${!hideSubLink ? styles.dropdown_icon_rotated : ''}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
              
              {/* Mobile Animated Dropdown */}
              <div className={`${styles.mobile_dropdown_menu} ${!hideSubLink ? styles.mobile_dropdown_menu_open : ''}`}>
                <Link
                  className={`${styles.mobile_nav_link} ${styles.mobile_subLinks}`}
                  style={{ 
                    color: isActivePage("/certifications/aiCertification") ? activeTextColor : textColor 
                  }}
                  href={"/certifications/aiCertification"}
                  onClick={closeMenu}
                >
                  AI Certification
                </Link>
              </div>
            </div>

            <Link
              href={"/contact"}
              className={styles.mobile_nav_link}
              style={{ 
                color: isActivePage("/contact") ? activeTextColor : textColor 
              }}
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
              color: loginBtnColor,
            }}
            onClick={changeRoute}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = loginBtnHoverBg)
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = loginBtnBg)
            }
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}