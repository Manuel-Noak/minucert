"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./manageCoursesSection.module.css";
import Image from "next/image";
import Add_icon from "../../../assets/img/Admin/Add_icon.png";
import AddCourseModal, {
  AddProviderModal,
  CourseFormData,
  ProviderData,
} from "@/app/(components)/(common)/popupModal/addCourseModal";
import { toast } from "react-toastify";
import Loader from "@/app/(components)/(loading)/loader";

export interface CourseFormsData {
  courseName: string;
  courseCode: string;
  coursePrice: string;
  provider: string;
  currency: string;
  id: number;
  thumbnailLink: string;
  category: string;
}

export default function ManageCoursesSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProviderOpen, setModalProviderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [courses, setCourses] = useState<CourseFormsData[]>([]);
  const [editCourse, setEditCourse] = useState<CourseFormsData>();
  const coursesPerPage = 5;

  const fetchCourseDetails = async () => {
    try {
      const res = await fetch(`/api/getAllCourse`);
      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }
      setCourses(data.courses);
      toast.success("Successfully added the course");
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

  const handleEditDetail = async (courseId: number) => {
    setIsModalOpen(true);
    const targetedCourse = courses.find((course) => course.id === courseId);
    if (!targetedCourse) {
      return toast.error("No course found with the id");
    }
    console.log(targetedCourse);

    setEditCourse(targetedCourse);
  };
  const handleDeleteDetail = async (courseId: number) => {
    setActiveDropdown(null);
    try {
      const res = await fetch("/api/removeCourse", {
        method: "DELETE",
        headers: {
          courseId: courseId.toString(),
        },
      });
      const { success } = await res.json();
      if (success) {
        toast.success("Successfully deleted");
        return setCourses((prev) =>
          [...prev].filter((course) => course.id !== courseId)
        );
      }
      toast.error("Something went wrong");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleNewCourseClick = () => setIsModalOpen(true);
  const handleNewProvider = () => setModalProviderOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalProviderClose = () => setModalProviderOpen(false);

  const handleCourseSubmit = async (formData: CourseFormData) => {
    try {
      // setMessageDetail(undefined);
      // setLoading(true);

      const res = await fetch(
        editCourse ? "/api/adminAuth/editCourse" : "/api/adminAuth/addCourse",
        {
          method: "POST",
          body: JSON.stringify({
            form: formData,
            courseExists: courses.find(
              (course) =>
                String(course.courseCode) === String(formData.courseCode) &&
                course.provider === formData.provider
            ),
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        fetchCourseDetails(); // refresh list
      }
    } catch {}
    setIsModalOpen(false);
  };

  const handleProviderSubmit = async (formData: ProviderData) => {
    try {
      const res = await fetch("/api/addProvider", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const { success } = await res.json();
      if (!success) {
        toast.error("Something went wrong");
        return;
      }
      toast.success("Successfully added the provider");
    } catch {
      toast.error("Something went wrong");
    }
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
                        <button
                          className={styles.edit_course_btn}
                          onClick={() => handleEditDetail(course.id)}
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
        editCourseValues={editCourse}
      />
      <AddProviderModal
        isOpen={isModalProviderOpen}
        onClose={handleModalProviderClose}
        onSubmit={handleProviderSubmit}
      />
    </section>
  );
}
