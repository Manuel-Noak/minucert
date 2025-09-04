"use client";
import styles from "./skeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <section className={styles.skeleton_section}>
      {/* Header */}
      <div className={styles.skeleton_header}>
        <div className={styles.skeleton_title}></div>
        <div className={styles.skeleton_subtitle}></div>
        <div className={styles.skeleton_buttons}>
          <div className={styles.skeleton_btn}></div>
          <div className={styles.skeleton_btn}></div>
          <div className={styles.skeleton_btn}></div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.skeleton_table}>
        <div className={styles.skeleton_table_header}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton_cell}></div>
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.skeleton_row}>
            {[...Array(6)].map((_, j) => (
              <div key={j} className={styles.skeleton_cell}></div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.skeleton_pagination}>
        <div className={styles.skeleton_page_btn}></div>
        <div className={styles.skeleton_page_btn}></div>
        <div className={styles.skeleton_page_btn}></div>
        <div className={styles.skeleton_page_btn}></div>
        <div className={styles.skeleton_page_btn}></div>
      </div>
    </section>
  );
}
