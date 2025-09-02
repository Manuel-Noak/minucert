"use client";

import styles from "@/app/certifications/provider/[name]/aiCert.module.css";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/(state)/state";

export default function Courses() {
  const router = useRouter();
  const { firstIndex, lastIndex, CoursesInfo } = useAppContext();

  const handleViewDetails = (programId: number) => {
    const targetedData = CoursesInfo.find((course) => course.id === programId);
    if (!targetedData) {
      return;
    }

    router.push(`/certifications/program-details?id=${programId}`);
  };

  // If no courses available, show message
  if (!CoursesInfo || CoursesInfo.length === 0) {
    return (
      <div className={styles.programs_grid}>
        <div className={styles.no_programs_message}>
          <p>No courses available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.programs_grid}>
      {CoursesInfo.slice(firstIndex, lastIndex).map(
        ({ thumbnailLink, price, currencyCode, title, id }, index) => (
          <div key={index} className={styles.program_card}>
            <div className={styles.program_image_container}>
              <img
                src={thumbnailLink}
                alt={title}
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
                  {title}
                  {/* <span className={styles.trademark}>™</span> */}
                </h3>
              </div>

              {/* Program Price */}
              <div className={styles.program_price}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currencyCode,
                }).format(price / 100)}
              </div>

              {/* View Details Button */}
              <button
                className={styles.view_details_button}
                onClick={() => handleViewDetails(id)}
              >
                <span className={styles.view_details_text}>View Details</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}