"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";
import Logo_img from "../../assets/img/Home/logo_img.png";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/app/(state)/state";

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
  const [providers, setProviders] = useState<{ name: string; id: number }[]>(
    []
  );

  const router = useRouter();
  const pathname = usePathname();
  const { setProviderRoute } = useAppContext();

  const changeRoute = () => {
    router.push("/admin/sign-in");
  };

  const isActivePage = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isCertificationActive = () => pathname.startsWith("/certifications");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    fetch("/api/getProviders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProviderRoute(data.providers[0]?.name);
          setProviders(data.providers);
        }
      })
      .catch(() => {});

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(
          event.target instanceof Element &&
          event.target.closest(`.${styles.navbar}`)
        )
      ) {
        setIsMenuOpen(false);
      }
      if (
        !hideSubLink &&
        event.target instanceof Element &&
        !event.target.closest(`.${styles.dropdown_container}`)
      ) {
        setHideSubLink(true);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [hideSubLink, isMenuOpen, setProviderRoute]);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(hideSubLink ? 0 : dropdownRef.current.scrollHeight);
    }
  }, [hideSubLink, providers]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleDropdown = () => setHideSubLink(!hideSubLink);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.navbar_scrolled : ""}`}
      style={{
        backgroundColor: isScrolled ? "transparent" : backgroundColor,
      }}
    >
      <Link href={"/"} className={styles.logo}>
        <img
          src={Logo_img.src}
          alt="MinuCert Logo"
          className={styles.logo_img}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className={styles.nav_links}>
        <Link
          href={"/"}
          className={styles.nav_link}
          style={{
            color: isActivePage("/") ? activeTextColor : textColor,
          }}
        >
          Home
        </Link>

        <div className={styles.dropdown_container}>
          <p
            onClick={toggleDropdown}
            className={`${styles.nav_link_dropdown} ${
              !hideSubLink ? styles.dropdown_active : ""
            }`}
            style={{
              color: isCertificationActive() ? activeTextColor : textColor,
            }}
          >
            Certifications
            <svg
              className={`${styles.dropdown_icon} ${
                !hideSubLink ? styles.dropdown_icon_rotated : ""
              }`}
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

          <div
            ref={dropdownRef}
            className={`${styles.dropdown_menu} ${
              !hideSubLink ? styles.dropdown_menu_open : ""
            }`}
            style={{
              height: `${dropdownHeight}px`,
              opacity: hideSubLink ? 0 : 1,
              visibility: hideSubLink ? "hidden" : "visible",
            }}
          >
            {providers.map((provider, index) => (
              <div key={index} className={styles.dropdown_content}>
                <Link
                  className={`${styles.nav_link} ${styles.subLinks}`}
                  style={{
                    color: isActivePage(
                      `/certifications/provider/${encodeURIComponent(
                        provider.name
                      )}`
                    )
                      ? activeTextColor
                      : textColor,
                  }}
                  href={`/certifications/provider/${encodeURIComponent(
                    provider.name
                  )}`}
                  onClick={() => setHideSubLink(true)}
                >
                  {provider.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={"/contact"}
          className={styles.nav_link}
          style={{
            color: isActivePage("/contact") ? activeTextColor : textColor,
          }}
        >
          Contact
        </Link>
      </div>

      {/* Desktop Login */}
      <button
        className={styles.login_btn}
        style={{
          backgroundColor: loginBtnBg,
          color: loginBtnColor,
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor =
            loginBtnHoverBg)
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = loginBtnBg)
        }
        onClick={changeRoute}
      >
        Login
      </button>

      {/* Mobile Menu */}
      <button
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span className={styles.hamburger_line}></span>
        <span className={styles.hamburger_line}></span>
        <span className={styles.hamburger_line}></span>
      </button>

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
                color: isActivePage("/") ? activeTextColor : textColor,
              }}
              onClick={closeMenu}
            >
              Home
            </Link>

            {/* Mobile Dropdown */}
            <div className={styles.mobile_dropdown_container}>
              <p
                onClick={toggleDropdown}
                className={`${styles.mobile_nav_link_dropdown} ${
                  !hideSubLink ? styles.dropdown_active : ""
                }`}
                style={{
                  color: isCertificationActive() ? activeTextColor : textColor,
                }}
              >
                Certifications
                <svg
                  className={`${styles.dropdown_icon} ${
                    !hideSubLink ? styles.dropdown_icon_rotated : ""
                  }`}
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

              <div
                className={`${styles.mobile_dropdown_menu} ${
                  !hideSubLink ? styles.mobile_dropdown_menu_open : ""
                }`}
              >
                {providers.map((provider, index) => (
                  <Link
                    key={index}
                    className={`${styles.mobile_nav_link} ${styles.mobile_subLinks}`}
                    style={{
                      color: isActivePage(
                        `/certifications/provider/${encodeURIComponent(
                          provider.name
                        )}`
                      )
                        ? activeTextColor
                        : textColor,
                    }}
                    href={`/certifications/provider/${encodeURIComponent(
                      provider.name
                    )}`}
                    onClick={closeMenu}
                  >
                    {provider.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={"/contact"}
              className={styles.mobile_nav_link}
              style={{
                color: isActivePage("/contact") ? activeTextColor : textColor,
              }}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>

          <button
            className={styles.mobile_login_btn}
            style={{
              backgroundColor: loginBtnBg,
              color: loginBtnColor,
            }}
            onClick={changeRoute}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
