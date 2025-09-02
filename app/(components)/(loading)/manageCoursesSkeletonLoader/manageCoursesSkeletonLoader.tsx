"use client";
import styles from "./manageCoursesSkeletonLoader.module.css";

export default function ManageCoursesSkeletonLoader() {
  return (
    <section className={styles.manage_courses_section}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.header_text}>
            <div className={`${styles.skeleton} ${styles.title_skeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.subtitle_skeleton}`}></div>
          </div>
          <div className={`${styles.skeleton} ${styles.button_skeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.button_skeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.button_skeleton}`}></div>
        </div>
      </div>

      {/* Table Container Skeleton */}
      <div className={styles.table_container}>
        <div className={styles.table_content}>
          {/* Table Header Skeleton */}
          <div className={styles.table_header}>
            <div className={styles.header_cell}>
              <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
            </div>
            <div className={styles.header_cell}>
              <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
            </div>
            <div className={styles.header_cell}>
              <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
            </div>
            <div className={styles.header_cell}>
              <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
            </div>
            <div className={styles.header_cell}>
              <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
            </div>
            <div className={styles.header_cell}>
              <div className={`${styles.skeleton} ${styles.header_cell_skeleton}`}></div>
            </div>
          </div>

          {/* Table Body Skeleton */}
          <div className={styles.table_body}>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className={styles.table_row}>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton_small}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton_small}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton}`}></div>
                </div>
                <div className={styles.table_cell}>
                  <div className={`${styles.skeleton} ${styles.cell_skeleton_small}`}></div>
                </div>
                <div className={`${styles.table_cell} ${styles.actions_cell}`}>
                  <div className={styles.actions_container}>
                    <div className={`${styles.skeleton} ${styles.actions_btn_skeleton}`}></div>
                  </div>
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