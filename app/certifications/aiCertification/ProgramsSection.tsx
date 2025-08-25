"use client";

import React, { useState } from "react";
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
    amount: "₦299,999.99"
  },
  {
    id: "ai-sales",
    src: aiSales,
    title: "AI+ Sales",
    amount: "₦299,999.99"
  },
  {
    id: "ai-security",
    src: aiSecurity,
    title: "AI+ Security",
    amount: "₦299,999.99"
  },
  {
    id: "ai-cloud",
    src: aiCloud,
    title: "AI+ Cloud",
    amount: "₦299,999.99"
  },
  {
    id: "ai-development",
    src: aiDevelopment,
    title: "AI+ Development",
    amount: "₦299,999.99"
  },
  {
    id: "ai-marketing",
    src: aiMarketing,
    title: "AI+ Marketing",
    amount: "₦299,999.99"
  },
  {
    id: "ai-project-manager",
    src: aiSales,
    title: "AI+ Project Manager",
    amount: "₦299,999.99"
  },
  {
    id: "ai-ethical-hacking",
    src: aiExecutive,
    title: "AI+ Ethical Hacking",
    amount: "₦299,999.99"
  },
  {
    id: "ai-prompt-engineering",
    src: aiCloud,
    title: "AI+ Prompt Engineering",
    amount: "₦299,999.99"
  },
];

export default function ProgramsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = 10;
  const programsPerPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (programId: string) => {
    router.push(`/certifications/aiCertification/program-details?id=${programId}`);
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
    <section className={styles.programs_section}>
      {/* Title and Results Count */}
      <div className={styles.header_section}>
        <h1 className={styles.section_title}>AI Certifications</h1>
        <p className={styles.results_text}>Showing 83 results</p>
      </div>

      {/* Programs Grid */}
      <div className={styles.programs_grid}>
        {Programs.map((program, index) => (
          <div key={index} className={styles.program_card}>
            {/* Program Image */}
            <div className={styles.program_image_container}>
              <Image
                src={program.src}
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
              <div className={styles.program_price}>
                {program.amount}
              </div>

              {/* View Details Button */}
              <button 
                className={styles.view_details_button}
                onClick={() => handleViewDetails(program.id)}
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
          onClick={() =>
            currentPage > 1 &&
            handlePageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
        >
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
        </button>
      </div>
    </section>
  );
}