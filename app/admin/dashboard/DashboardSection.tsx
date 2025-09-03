"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./dashboardSection.module.css";
import Image from "next/image";
import ai_cert_icon from "../../assets/img/Admin/ai_cert_icon.png";
import arrow_icon from "../../assets/img/Admin/arrow_icon.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/(state)/state";
import SkeletonLoader from "../../(components)/(loading)/shimmer/SkeletonLoader";

interface CustomerType {
  id: number;
  fullname: string;
  email: string;
  program: string;
  status: string;
  date: string;
}
interface CustomersOrder {
  providerName: string;
  courseOrders: Array<CustomerType>;
}
interface CertificationType {
  name: string;
}

export default function DashboardSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCertificationsExpanded, setIsCertificationsExpanded] =
    useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [customers, setCustomers] = useState<CustomersOrder[]>([]);
  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 10;
  const activeCustomers =
    customers.find((order) => order.providerName === activeTab)?.courseOrders ||
    [];
  const totalPages = Math.ceil(activeCustomers.length / pageSize);

  const fetchCustomersDetails = async () => {
    try {
      const res = await fetch("/api/adminAuth/customersDetails");
      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }

      setCertifications(
        data.customers.map((order: CustomersOrder) => ({
          name: order.providerName,
        }))
      );

      setActiveTab(
        data.customers.length > 0 ? data.customers[0].providerName : ""
      );
      setCustomers(data.customers);
      setCurrentPage(1);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCustomersDetails();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleCertifications = () => {
    setIsCertificationsExpanded(!isCertificationsExpanded);
  };

  const toggleCertificationsName = (cert: CertificationType) => {
    setActiveTab(cert.name);
    setCurrentPage(1);
  };

  const handleSeeCoursesClick = () => {
    router.push("/admin/dashboard/manage-courses");
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

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <section className={styles.dashboard_section}>
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
          <button
            className={styles.download_trans_btn}
            onClick={() => {
              window.location.href = "/api/adminAuth/downloadTransactions";
            }}
          >
            Download Customer&apos;s Transactions
          </button>
        </div>
      </div>

      <div className={styles.table_container} ref={dropdownRef}>
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

        <div className={styles.table_content}>
          <div className={styles.table_header}>
            <div className={styles.header_cell}>Full Name</div>
            <div className={styles.header_cell}>Email</div>
            <div className={styles.header_cell}>Program</div>
            <div className={styles.header_cell}>Status</div>
            <div className={styles.header_cell}>Date</div>
          </div>

          <div className={styles.table_body}>
            {activeCustomers
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
                        customer.status === "COMPLETED"
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