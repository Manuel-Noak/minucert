"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./dashboardSection.module.css";
import Image from "next/image";
import ai_cert_icon from "../../assets/img/Admin/ai_cert_icon.png";
import arrow_icon from "../../assets/img/Admin/arrow_icon.png";
import { toast } from "react-toastify";

interface CustomerType {
  id: number;
  fullname: string;
  email: string;
  program: string;
  status: string;
  date: string;
}
interface CertificationType {
  name: string;
}

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState("AI Certification");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCertificationsExpanded, setIsCertificationsExpanded] =
    useState(true);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [certifications, setCertifications] = useState<CertificationType[]>([]);

  // ✅ pagination settings
  const pageSize = 10;
  const totalPages = Math.ceil(customers.length / pageSize);

  const fetchCustomersDetails = async () => {
    try {
      let res = await fetch("/api/getProviders");
      let data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }

      setCertifications(data.providers);
      setActiveTab(data.providers[0].name);

      res = await fetch("/api/customersDetails/" + data.providers[0].name);
      data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }
      setCustomers(data.customers);
      setCurrentPage(1); // ✅ reset to first page
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    fetchCustomersDetails();
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleCertifications = () => {
    setIsCertificationsExpanded(!isCertificationsExpanded);
  };

  const toggleDropdown = (customerId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === customerId ? null : customerId);
  };

  const handleStatusChange = (customerId: number) => {
    setActiveDropdown(null);
  };

  const handleViewDetails = (customerId: number) => {
    setActiveDropdown(null);
  };

  const toggleCertificationsName = async (cert: CertificationType) => {
    try {
      const res = await fetch("/api/customersDetails/" + cert.name);
      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }
      setCustomers(data.customers);
      setActiveTab(cert.name);
      setCurrentPage(1); // ✅ reset page on category switch
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSeeCoursesClick = () => {
    window.location.href = "/admin/dashboard/manage-courses";
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pagination_number} ${
            currentPage === i ? styles.active : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <section className={styles.dashboard_section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.header_text}>
            <h1 className={styles.title}>Administration Dashboard</h1>
            <p className={styles.subtitle}>
              Track customers who make payment for courses
            </p>
          </div>
          <button
            className={styles.see_courses_btn}
            onClick={handleSeeCoursesClick}
          >
            See Courses
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className={styles.table_container} ref={dropdownRef}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div
            className={styles.certifications_header}
            onClick={toggleCertifications}
          >
            <span>Certifications</span>
            <span
              className={`${styles.dropdown_arrow} ${
                isCertificationsExpanded ? styles.expanded : ""
              }`}
            >
              <Image src={arrow_icon} alt="Arrow icon" width={16} height={16} />
            </span>
          </div>
          <div
            className={`${styles.certifications_list} ${
              isCertificationsExpanded ? styles.expanded : styles.collapsed
            }`}
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`${styles.certification_tab} ${
                  activeTab === cert.name ? styles.active_tab : ""
                }`}
                onClick={() => toggleCertificationsName(cert)}
              >
                <Image
                  src={ai_cert_icon}
                  alt={cert.name}
                  className={styles.cert_icon}
                  width={24}
                  height={24}
                />
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className={styles.table_content}>
          {/* Table Header */}
          <div className={styles.table_header}>
            <div className={styles.header_cell}>Full Name</div>
            <div className={styles.header_cell}>Email</div>
            <div className={styles.header_cell}>Program</div>
            <div className={styles.header_cell}>Status</div>
            <div className={styles.header_cell}>Date</div>
          </div>

          {/* Table Body */}
          <div className={styles.table_body}>
            {customers
              .slice((currentPage - 1) * pageSize, currentPage * pageSize) // ✅ pagination applied
              .map((customer, index) => (
                <div key={index} className={styles.table_row}>
                  <div className={styles.table_cell}>
                    <span
                      className={styles.table_cell_text}
                      title={customer.fullname}
                    >
                      {customer.fullname}
                    </span>
                  </div>
                  <div className={styles.table_cell}>
                    <span
                      className={styles.table_cell_text}
                      title={customer.email}
                    >
                      {customer.email}
                    </span>
                  </div>
                  <div className={styles.table_cell}>
                    <span className={styles.table_cell_text}>
                      {customer.program}
                    </span>
                  </div>
                  <div className={styles.table_cell}>
                    <span
                      className={`${styles.status_badge} ${
                        customer.status === "Completed"
                          ? styles.fulfilled
                          : styles.unfulfilled
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>
                  <div
                    className={`${styles.table_cell} ${styles.actions_cell}`}
                  >
                    <span
                      className={styles.table_cell_text}
                      title={String(customer.date)}
                    >
                      {new Date(customer.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pagination_arrow}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                ‹
              </button>
              {renderPaginationNumbers()}
              <button
                className={styles.pagination_arrow}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
