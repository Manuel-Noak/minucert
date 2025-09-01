"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./manageCoursesSection.module.css";
import Image from "next/image";
import Add_icon from "../../../assets/img/Admin/Add_icon.png";
import AddCourseModal, {
  AddAdminModal,
  AddProviderModal,
  AdminData,
  CourseFormData,
  MessageModal,
  ProviderData,
} from "@/app/(components)/(common)/popupModal/addCourseModal";
import { toast } from "react-toastify";
import Loader from "@/app/(components)/(loading)/loader";
import { useAppContext } from "@/app/(state)/state";

interface CourseFormsData {
  courseName: string;
  courseCode: string;
  coursePrice: string;
  provider: string;
  currency: string;
  id: number;
}

export default function ManageCoursesSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProviderOpen, setModalProviderOpen] = useState(false);
  const [isModalAdminOpen, setModalAdminOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(true);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { loading, setLoading } = useAppContext();
  const [courses, setCourses] = useState<CourseFormsData[]>([]);
  const coursesPerPage = 5;

  const fetchCourseDetails = async () => {
    try {
      const res = await fetch(`/api/adminAuth/getAllCourseee`);
      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }
      setCourses(data.courses);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    fetchCourseDetails();

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

  // client-side pagination logic
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = courses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleDropdown = (courseId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === courseId ? null : courseId);
  };

  const handleDeleteDetail = async (courseId: number) => {
    setActiveDropdown(null);
    try {
      const res = await fetch("/api/adminAuth/removeCourse", {
        method: "DELETE",
        headers: {
          courseId: courseId.toString(),
        },
      });
      const { success } = await res.json();
      setStatus(success);
      if (success) {
        setMessage("Successfully deleted the course");
        return setCourses((prev) =>
          [...prev].filter((course) => course.id !== courseId)
        );
      }

      setMessage("Unable able to delete Course");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleNewCourseClick = () => setIsModalOpen(true);
  const handleNewProvider = () => setModalProviderOpen(true);
  const handleNewAdmin = () => setModalAdminOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalProviderClose = () => setModalProviderOpen(false);
  const handleModalAdminClose = () => setModalAdminOpen(false);
  const handleMessageModalClose = () => setMessageModalOpen(false);

  const handleCourseSubmit = async (formData: CourseFormData) => {
    try {
      setLoading(true);

      const res = await fetch("/api/adminAuth/addCourse", {
        method: "POST",
        body: JSON.stringify({
          form: formData,
          courseExists: courses.find(
            (course) =>
              String(course.courseCode) === String(formData.courseCode) &&
              course.provider === formData.provider
          ),
        }),
      });
      const data = await res.json();
      setLoading(false);
      setStatus(data.success);
      setIsModalOpen(true);
      if (data.success) {
        setMessage("Successfully added the course");
        fetchCourseDetails(); // refresh list
        return;
      }
      setMessage(data.message || "Something went wrong");
    } catch (err) {
      setLoading(false);
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong, please check your connection or try again"
      );
    }
    setIsModalOpen(false);
  };

  const handleProviderSubmit = async (formData: ProviderData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/adminAuth/addProvider", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const { success } = await res.json();
      setLoading(false);
      setStatus(success);
      setIsModalOpen(true);
      if (!success) {
        setMessage(success.message || "Something went wrong");
        return;
      }
      setMessage("Successfully added the provider");
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
    setModalProviderOpen(false);
  };
  const handleAdminSubmit = async (formData: AdminData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/adminAuth/addAdmin", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const { success } = await res.json();
      setLoading(false);
      setStatus(success);
      setIsModalOpen(true);
      if (!success) {
        setMessage(success.message || "Something went wrong");
        return;
      }
      setMessage("Successfully added the admin");
    } catch {
      setLoading(false);
      toast.error("Something went wrong");
    }
    setModalAdminOpen(false);
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
    return <Loader />;
  }
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
          <button
            className={styles.new_course_btn}
            onClick={handleNewCourseClick}
          >
            <Image src={Add_icon} alt="Add icon" width={16} height={16} />
            <span>New course</span>
          </button>
          <button className={styles.new_course_btn} onClick={handleNewProvider}>
            <Image src={Add_icon} alt="Add icon" width={16} height={16} />
            <span>New Provider</span>
          </button>
          <button className={styles.new_course_btn} onClick={handleNewAdmin}>
            <Image src={Add_icon} alt="Add icon" width={16} height={16} />
            <span>New Admin</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className={styles.table_container} ref={dropdownRef}>
        <div className={styles.table_content}>
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
            {paginatedCourses.map((course) => (
              <div key={course.id} className={styles.table_row}>
                <div className={styles.table_cell}>
                  <span
                    className={styles.table_cell_text}
                    title={course.courseName}
                  >
                    {course.courseName}
                  </span>
                </div>
                <div className={styles.table_cell}>
                  <span
                    className={styles.table_cell_text}
                    title={course.courseCode}
                  >
                    {course.courseCode}
                  </span>
                </div>
                <div className={styles.table_cell}>
                  <span className={styles.table_cell_text}>
                    {course.coursePrice}
                  </span>
                </div>
                <div className={styles.table_cell}>
                  <span
                    className={styles.table_cell_text}
                    title={course.provider}
                  >
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
                      <div className={styles.action_dropdown}>
                        <button
                          className={styles.view_details_btn}
                          onClick={() => handleDeleteDetail(course.id)}
                        >
                          Delete Course
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
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {renderPaginationNumbers()}
            <button
              className={styles.pagination_arrow}
              onClick={() => handlePageChange(currentPage + 1)}
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
        onCourseSubmit={handleCourseSubmit}
      />
      <AddProviderModal
        isOpen={isModalProviderOpen}
        onClose={handleModalProviderClose}
        onSubmit={handleProviderSubmit}
      />
      <AddAdminModal
        isOpen={isModalAdminOpen}
        onClose={handleModalAdminClose}
        onSubmit={handleAdminSubmit}
      />
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleMessageModalClose}
        status={status}
        message={message}
      />
    </section>
  );
}
