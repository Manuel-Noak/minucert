"use client";
import { useAppContext } from "@/app/(state)/state";
import styles from "./[name]/aiCert.module.css";

export default function Pagination() {
  const {
    CoursesInfo,
    currentPage,
    setCurrentPage,
    setFirstIndex,
    setLastIndex,
  } = useAppContext();

  const programsPerPage = 9;
  const totalPages =
    CoursesInfo.length > 0
      ? Math.ceil(CoursesInfo.length / programsPerPage)
      : 1;
  setLastIndex(programsPerPage);

  const handlePageChange = (page: number) => {
    const newFirstIndex = (page - 1) * programsPerPage;
    const newLastIndex = newFirstIndex + programsPerPage;

    setCurrentPage(page);
    setFirstIndex(newFirstIndex);
    setLastIndex(newLastIndex);
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
    <div className={styles.pagination}>
      <button
        className={styles.pagination_arrow}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
  );
}
