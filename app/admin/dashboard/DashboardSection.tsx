"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./dashboardSection.module.css";
import Image from "next/image";
import ai_cert_icon from "../../assets/img/Admin/ai_cert_icon.png";
import arrow_icon from "../../assets/img/Admin/arrow_icon.png";
import { toast } from "react-toastify";

export default function DashboardSection() {
    const [activeTab, setActiveTab] = useState("AI Certification");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCertificationsExpanded, setIsCertificationsExpanded] =
        useState(true);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Sample customer data
    const [customers, setCustomers] = useState([
        {
            id: 1,
            fullName: "John Samuel Abraham",
            email: "johnsamuelabrahamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@email.com",
            program: "AI+ Executive",
            status: "Unfulfilled",
        },
        {
            id: 2,
            fullName: "Jane Smith",
            email: "jane.smith@email.com",
            program: "AI+ Executive",
            status: "Fulfilled",
        },
        {
            id: 3,
            fullName: "Robert Johnson",
            email: "robert.johnson@email.com",
            program: "AI+ Executive",
            status: "Fulfilled",
        },
        {
            id: 4,
            fullName: "Sarah Williams",
            email: "sarah.williams@email.com",
            program: "AI+ Executive",
            status: "Unfulfilled",
        },
        {
            id: 5,
            fullName: "Michael Brown",
            email: "michael.brown@email.com",
            program: "AI+ Executive",
            status: "Fulfilled",
        },
        {
            id: 6,
            fullName: "Emily Davis",
            email: "emily.davis@email.com",
            program: "AI+ Executive",
            status: "Unfulfilled",
        },
    ]);

    const certifications = [
        {
            name: "AI Certification",
            icon: ai_cert_icon,
        },
        {
            name: "Software Development",
            icon: ai_cert_icon,
        },
    ];

    const totalPages = 10;

<<<<<<< HEAD
    // Close dropdown when clicking outside
    useEffect(() => {
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
=======
      if (!data.success) {
        return toast.error(data.message);
      }

      setCustomers(data.customers);
      setCertifications(data.cert);
    } catch (error) {
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
>>>>>>> e06e757 (payment_integration_v2)

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
        setCustomers(
            customers.map((customer) =>
                customer.id === customerId
                    ? {
                          ...customer,
                          status:
                              customer.status === "Fulfilled"
                                  ? "Unfulfilled"
                                  : "Fulfilled",
                      }
                    : customer
            )
        );
        setActiveDropdown(null);
    };

    const handleViewDetails = (customerId: number) => {
        console.log("View details for customer:", customerId);
        setActiveDropdown(null);
    };

    const handleSeeCoursesClick = () => {
        console.log("See Courses button clicked");
        // Add your navigation logic here
        window.location.href = "/admin/dashboard/manage-courses";
    };

    const renderPaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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
                        <h1 className={styles.title}>
                            Administration Dashboard
                        </h1>
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
                            <Image
                                src={arrow_icon}
                                alt='Arrow icon'
                                width={16}
                                height={16}
                            />
                        </span>
                    </div>
                    <div
                        className={`${styles.certifications_list} ${
                            isCertificationsExpanded
                                ? styles.expanded
                                : styles.collapsed
                        }`}
                    >
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className={`${styles.certification_tab} ${
                                    activeTab === cert.name
                                        ? styles.active_tab
                                        : ""
                                }`}
                                onClick={() => setActiveTab(cert.name)}
                            >
                                <Image
                                    src={cert.icon}
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
                        <div className={styles.header_cell}>Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className={styles.table_body}>
                        {customers.map((customer) => (
                            <div key={customer.id} className={styles.table_row}>
                                <div className={styles.table_cell}>
                                    <span
                                        className={styles.table_cell_text}
                                        title={customer.fullName}
                                    >
                                        {customer.fullName}
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
                                            customer.status === "Fulfilled"
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
                                    <div className={styles.actions_container}>
                                        <button
                                            className={styles.actions_btn}
                                            onClick={(e) =>
                                                toggleDropdown(customer.id, e)
                                            }
                                        >
                                            ⋮
                                        </button>
                                        {activeDropdown === customer.id && (
                                            <div
                                                className={
                                                    styles.action_dropdown
                                                }
                                            >
                                                <button
                                                    className={
                                                        styles.view_details_btn
                                                    }
                                                    onClick={() =>
                                                        handleViewDetails(
                                                            customer.id
                                                        )
                                                    }
                                                >
                                                    View details
                                                </button>
                                                <button
                                                    className={`${
                                                        styles.mark_status_btn
                                                    } ${
                                                        customer.status ===
                                                        "Unfulfilled"
                                                            ? styles.mark_fulfilled
                                                            : styles.mark_unfulfilled
                                                    }`}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            customer.id
                                                        )
                                                    }
                                                >
                                                    {customer.status ===
                                                    "Unfulfilled"
                                                        ? "Mark as fulfilled"
                                                        : "Mark as unfulfilled"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <button
                            className={styles.pagination_arrow}
                            onClick={() =>
                                currentPage > 1 &&
                                handlePageChange(currentPage - 1)
                            }
                            disabled={currentPage === 1}
                        >
                            ‹
                        </button>
                        {renderPaginationNumbers()}
                        <button
                            className={styles.pagination_arrow}
                            onClick={() =>
                                currentPage < totalPages &&
                                handlePageChange(currentPage + 1)
                            }
                            disabled={currentPage === totalPages}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
