"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import aiExecutive from "@/app/assets/img/aiExecutive.jpg";
import aiCloud from "@/app/assets/img/aiCloud.jpg";
import aiDevelopment from "@/app/assets/img/aiDevelopment.jpg";
import aiMarketing from "@/app/assets/img/aiMarketing.jpg";
import aiSales from "@/app/assets/img/aiSales.jpg";
import aiSecurity from "@/app/assets/img/aiSecurity.jpg";
import styles from "./aiCert.module.css";

const Programs = [
  {
    id: "ai-executive",
    src: aiExecutive,
    title: "AI+ Executive",
    amount: "₦299,999.99",
  },
  {
    id: "ai-sales",
    src: aiSales,
    title: "AI+ Sales",
    amount: "₦299,999.99",
  },
  {
    id: "ai-security",
    src: aiSecurity,
    title: "AI+ Security",
    amount: "₦299,999.99",
  },
  {
    id: "ai-cloud",
    src: aiCloud,
    title: "AI+ Cloud",
    amount: "₦299,999.99",
  },
  {
    id: "ai-development",
    src: aiDevelopment,
    title: "AI+ Development",
    amount: "₦299,999.99",
  },
  {
    id: "ai-marketing",
    src: aiMarketing,
    title: "AI+ Marketing",
    amount: "₦299,999.99",
  },
  {
    id: "ai-project-manager",
    src: aiSales,
    title: "AI+ Project Manager",
    amount: "₦299,999.99",
  },
  {
    id: "ai-ethical-hacking",
    src: aiExecutive,
    title: "AI+ Ethical Hacking",
    amount: "₦299,999.99",
  },
  {
    id: "ai-prompt-engineering",
    src: aiCloud,
    title: "AI+ Prompt Engineering",
    amount: "₦299,999.99",
  },
];

interface CourseSyntax {
  title: string;
  thumbnail: string;
  price: number;
  courseId: number;
  currencyCode: string;
}

export default function ProgramsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [CoursesInfo, setCoursesInfo] = useState<CourseSyntax[]>([]);
  const programsPerPage = 8;
  const totalPages =
    CoursesInfo.length > 0
      ? Math.ceil(CoursesInfo.length / programsPerPage)
      : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (programId: number) => {
    router.push(
      `/certifications/aiCertification/program-details?id=${programId}`
    );
  };

  useEffect(() => {
    fetch(`/api/courses/${encodeURIComponent("AI Certification")}?`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return alert("No data " + data.message);
        }

        setCoursesInfo(data.info);
      })
      .catch((error) => alert(error.message));
  }, []);

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
    CoursesInfo.length > 0 && (
      <section className={styles.programs_section}>
        {/* Title and Results Count */}
        <div className={styles.header_section}>
          <h1 className={styles.section_title}>AI Certifications</h1>
        </div>

        {/* Programs Grid */}
        <div className={styles.programs_grid}>
          {CoursesInfo.map((program, index) => (
            <div key={index} className={styles.program_card}>
              {/* Program Image */}
              <div className={styles.program_image_container}>
                <img
                  src={program.thumbnailLink}
                  alt={program.title}
                  className={styles.program_image}
                  width={433}
                  height={297}
                />
              </div>

              {/* Program Content */}
              <div className={styles.program_content}>
                {/* Program Title */}
                <div className={styles.program_title_section}>
                  <h3 className={styles.program_title}>
                    {program.title}
                    <span className={styles.trademark}>™</span>
                  </h3>
                </div>

                {/* Program Price */}
                <div className={styles.program_price}>{program.price}</div>

                {/* View Details Button */}
                <button
                  className={styles.view_details_button}
                  onClick={() => handleViewDetails(program.courseId)}
                >
                  <span className={styles.view_details_text}>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={styles.pagination_arrow}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          ></button>
          {renderPaginationNumbers()}
          <button
            className={styles.pagination_arrow}
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          ></button>
        </div>
      </section>
    )
  );
}
