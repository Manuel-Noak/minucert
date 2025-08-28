"use client";

import styles from "@/app/certifications/aiCertification/aiCert.module.css";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/(state)/state";

type Props = {
  thumbnailLink: string;
  title: string;
  id: number;
  price: number;
};
export default function Courses() {
  const router = useRouter();
  const { currentPage, firstIndex, lastIndex, CoursesInfo, setCoursesInfo } =
    useAppContext();

  const handleViewDetails = (programId: number) => {
    const targetedData = CoursesInfo.find((course) => course.id === programId);
    if (!targetedData) {
      return;
    }
    // sessionStorage.setItem("courseDetail",JSON.stringify({
    //   amount: targetedData.price,
    //   title: targetedData.title,
    //   thumbnail
    // }))
    router.push(
      `/certifications/aiCertification/program-details?id=${programId}`
    );
  };

  return (
    <div className={styles.programs_grid}>
      {CoursesInfo.map(({ thumbnailLink, price, title, id }, index) => (
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
                <span className={styles.trademark}>™</span>
              </h3>
            </div>

            {/* Program Price */}
            <div className={styles.program_price}>{price}</div>

            {/* View Details Button */}
            <button
              className={styles.view_details_button}
              onClick={() => handleViewDetails(id)}
            >
              <span className={styles.view_details_text}>View Details</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
