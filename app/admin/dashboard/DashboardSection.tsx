"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./dashboardSection.module.css";
import Image from "next/image";
import ai_cert_icon from "../../assets/img/Admin/ai_cert_icon.png";
import arrow_icon from "../../assets/img/Admin/arrow_icon.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../../(components)/(loading)/shimmer/SkeletonLoader";
import Button from "../../(components)/button/Button";

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
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const [customers, setCustomers] = useState<CustomersOrder[]>([]);
  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 6;
  const activeCustomers =
    customers.find((order) => order.providerName === activeTab)?.courseOrders ||
    [];

  // Apply filters to active customers
  const filteredCustomers = activeCustomers.filter((customer) => {
    if (dateFilter && customer.date !== dateFilter) return false;
    if (statusFilter && customer.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

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
    } catch (error) {
      toast.error(error instanceof Error && error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCustomersDetails();
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };

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

  const toggleCertificationsName = (cert: CertificationType) => {
    setActiveTab(cert.name);
    setCurrentPage(1);
    // Clear filters when switching tabs
    setDateFilter("");
    setStatusFilter("");
  };

  const handleSeeCoursesClick = () => {
    router.push("/admin/dashboard/manage-courses");
  };

  const handleFilterClick = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterChange = (type: string, value: string) => {
    if (type === "date") {
      setDateFilter(value);
    } else if (type === "status") {
      setStatusFilter(value);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setDateFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const downloadCSV = () => {
    // Use filtered data if filters are applied, otherwise use all active customers
    const dataToDownload =
      filteredCustomers.length > 0 ? filteredCustomers : activeCustomers;

    if (dataToDownload.length === 0) {
      toast.info("No data available to download");
      return;
    }

    // Create CSV content
    const headers = ["Full Name", "Email", "Program", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...dataToDownload.map((customer) =>
        [
          `"${customer.fullname.replace(/"/g, '""')}"`,
          `"${customer.email.replace(/"/g, '""')}"`,
          `"${customer.program.replace(/"/g, '""')}"`,
          `"${customer.status.replace(/"/g, '""')}"`,
          `"${customer.date.replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ].join("\n");

    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Create filename with timestamp and filters info
    const timestamp = new Date().toISOString().slice(0, 10);
    let filename = `customers_${timestamp}`;

    if (activeTab) {
      filename += `_${activeTab.replace(/\s+/g, "_")}`;
    }

    if (dateFilter) {
      filename += `_date_${dateFilter}`;
    }

    if (statusFilter) {
      filename += `_status_${statusFilter}`;
    }

    filename += ".csv";

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Downloaded ${dataToDownload.length} records`);
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
          <div className={styles.button_group}>
            <Button
              // className={styles.see_courses_btn}
              onClick={handleSeeCoursesClick}
            >
              See Courses
            </Button>
            <div className={styles.filter_container} ref={filterDropdownRef}>
              <Button
                className={`${styles.filter_btn} ${
                  dateFilter || statusFilter ? styles.filter_active : ""
                }`}
                onClick={handleFilterClick}
              >
                Filter
                {(dateFilter || statusFilter) && (
                  <span className={styles.filter_indicator}></span>
                )}
              </Button>
              {showFilterDropdown && (
                <div className={styles.filter_dropdown}>
                  <h4 className={styles.filter_title}>Filter Customers</h4>

                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>By Date</label>
                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) =>
                        handleFilterChange("date", e.target.value)
                      }
                      className={styles.filter_input}
                    />
                  </div>

                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>By Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className={styles.filter_select}
                    >
                      <option value="">All Status</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="PENDING">PENDING</option>
                      <option value="FAILED">FAILED</option>
                    </select>
                  </div>

                  {(dateFilter || statusFilter) && (
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  )}
                </div>
              )}
            </div>
            <Button bg="transparent" onClick={downloadCSV}>
              Export
            </Button>
          </div>
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
            {filteredCustomers.length === 0 ? (
              <div className={styles.no_results}>
                <p>No customers match your filters</p>
                {(dateFilter || statusFilter) && (
                  <button
                    onClick={clearFilters}
                    className={styles.clear_filters_btn_small}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              filteredCustomers
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
                        {customer.status?.toLowerCase()}
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
                ))
            )}
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
