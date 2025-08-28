"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./manageCoursesSection.module.css";
import Image from "next/image";
import Add_icon from "../../../assets/img/Admin/Add_icon.png";
import AddCourseModal from "@/app/(components)/(common)/popupModal/addCourseModal";

interface CourseFormData {
    courseName: string;
    courseCode: string;
    coursePrice: string;
    previewUrl: string;
    provider: string;
    currency: string;
    category: string;
}

export default function ManageCoursesSection() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Sample courses data
    const [courses, setCourses] = useState([
        {
            id: 1,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
        {
            id: 2,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
        {
            id: 3,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
        {
            id: 4,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
        {
            id: 5,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
        {
            id: 6,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
        {
            id: 7,
            courseName: "AI Executive",
            courseCode: "1069",
            coursePrice: "150,000",
            provider: "AI Certification",
            currency: "NGN",
        },
    ]);

    const totalPages = 10;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    const toggleDropdown = (courseId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === courseId ? null : courseId);
    };

    const handleViewDetails = (courseId: number) => {
        console.log("View details for course:", courseId);
        setActiveDropdown(null);
    };

    const handleEditCourse = (courseId: number) => {
        console.log("Edit course:", courseId);
        setActiveDropdown(null);
    };

    const handleNewCourseClick = () => {
        console.log("New course button clicked");
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleCourseSubmit = (formData: CourseFormData) => {
        console.log("New course data:", formData);
        
        // Create new course object
        const newCourse = {
            id: courses.length + 1,
            courseName: formData.courseName,
            courseCode: formData.courseCode,
            coursePrice: formData.coursePrice,
            provider: formData.provider,
            currency: formData.currency,
        };

        // Add to courses list
        setCourses(prevCourses => [...prevCourses, newCourse]);
        
        // Close modal
        setIsModalOpen(false);
        
        // You can add success notification here
        console.log("Course added successfully!");
    };

    const renderPaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
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
        <section className={styles.manage_courses_section}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <div className={styles.header_text}>
                        <h1 className={styles.title}>Manage Courses</h1>
                        <p className={styles.subtitle}>
                            See current courses or add more courses
                        </p>
                    </div>
                    <button className={styles.new_course_btn} onClick={handleNewCourseClick}>
                        <Image src={Add_icon} alt="Add icon" width={16} height={16} />
                        <span>New course</span>
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className={styles.table_container} ref={dropdownRef}>
                {/* Table Content */}
                <div className={styles.table_content}>
                    {/* Table Header */}
                    <div className={styles.table_header}>
                        <div className={styles.header_cell}>Course Name</div>
                        <div className={styles.header_cell}>Course Code</div>
                        <div className={styles.header_cell}>Course Price</div>
                        <div className={styles.header_cell}>Provider</div>
                        <div className={styles.header_cell}>Currency</div>
                        <div className={styles.header_cell}>Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className={styles.table_body}>
                        {courses.map((course) => (
                            <div key={course.id} className={styles.table_row}>
                                <div className={styles.table_cell}>
                                    <span className={styles.table_cell_text} title={course.courseName}>
                                        {course.courseName}
                                    </span>
                                </div>
                                <div className={styles.table_cell}>
                                    <span className={styles.table_cell_text} title={course.courseCode}>
                                        {course.courseCode}
                                    </span>
                                </div>
                                <div className={styles.table_cell}>
                                    <span className={styles.table_cell_text}>
                                        {course.coursePrice}
                                    </span>
                                </div>
                                <div className={styles.table_cell}>
                                    <span className={styles.table_cell_text} title={course.provider}>
                                        {course.provider}
                                    </span>
                                </div>
                                <div className={styles.table_cell}>
                                    <span className={styles.table_cell_text}>
                                        {course.currency}
                                    </span>
                                </div>
                                <div className={`${styles.table_cell} ${styles.actions_cell}`}>
                                    <div className={styles.actions_container}>
                                        <button 
                                            className={styles.actions_btn}
                                            onClick={(e) => toggleDropdown(course.id, e)}
                                        >
                                            ⋮
                                        </button>
                                        {activeDropdown === course.id && (
                                            <div 
                                                className={styles.action_dropdown}
                                            >
                                                <button
                                                    className={styles.view_details_btn}
                                                    onClick={() => handleViewDetails(course.id)}
                                                >
                                                    View details
                                                </button>
                                                <button
                                                    className={styles.edit_course_btn}
                                                    onClick={() => handleEditCourse(course.id)}
                                                >
                                                    Edit Course
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

            {/* Add Course Modal */}
            <AddCourseModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleCourseSubmit}
            />
        </section>
    );
}