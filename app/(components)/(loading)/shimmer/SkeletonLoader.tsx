"use client";
import styles from "./skeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <section className={styles.dashboard_section}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.header_text}>
            <div className={`${styles.skeleton} ${styles.title_skeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.subtitle_skeleton}`}></div>
          </div>
          <div className={`${styles.skeleton} ${styles.button_skeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.button_skeleton}`}></div>
        </div>
      </div>

      {/* Table Container Skeleton */}
      <div className={styles.table_container}>
        {/* Sidebar Skeleton */}
        <div className={styles.sidebar}>
          <div className={styles.certifications_header}>
            <div className={`${styles.skeleton} ${styles.sidebar_header_skeleton}`}></div>
          </div>
          <div className={styles.certifications_list}>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={styles.certification_tab}>
                <div className={`${styles.skeleton} ${styles.cert_icon_skeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.cert_name_skeleton}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Content Skeleton */}
        <div className={styles.table_content}>
          {/* Table Header Skeleton */}
          <div className={styles.table_header}>
            {[...Array(5)].map((_, index) => (
              <div key={index} className={styles.header_cell}>
                <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
              </div>
            ))}
          </div>

          {/* Table Body Skeleton */}
          <div className={styles.table_body}>
            {[...Array(8)].map((_, rowIndex) => (
              <div key={rowIndex} className={styles.table_row}>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton_small}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.status_skeleton}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton_small}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className={styles.pagination}>
            <div className={`${styles.skeleton} ${styles.pagination_button_skeleton}`}></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={`${styles.skeleton} ${styles.pagination_number_skeleton}`}></div>
            ))}
            <div className={`${styles.skeleton} ${styles.pagination_button_skeleton}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}