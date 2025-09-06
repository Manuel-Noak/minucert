"use client";
import styles from "./aiCert.module.css";
import Courses from "@/app/(sections)/courses/courses";
import Pagination from "../pagination";
import fetchCourses from "@/app/(sections)/courses/fetchCourse";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/(state)/state";
import { useParams } from "next/navigation";

// Loading Skeleton Component for Course Cards
const CourseCardSkeleton = () => {
  return (
    <div className={styles.program_card}>
      <div className={styles.program_image_container}>
        <div className={styles.skeleton_image}></div>
      </div>

      <div className={styles.program_content}>
        <div className={styles.program_title_section}>
          <div className={styles.skeleton_title}></div>
        </div>

        <div className={styles.skeleton_price}></div>

        <div className={styles.skeleton_button}></div>
      </div>
    </div>
  );
};

// Loading Skeleton for the entire programs section
const ProgramsSectionSkeleton = ({
  providerName,
}: {
  providerName: string;
}) => {
  return (
    <section className={styles.programs_section}>
      {/* Title Section */}
      <div className={styles.header_section}>
        <h1 className={styles.section_title}>
          {decodeURIComponent(providerName)}
        </h1>
        {/* Skeleton for results text */}
        <div
          className={styles.skeleton_title}
          style={{ width: "200px", height: "22px", margin: "0 auto" }}
        ></div>
      </div>

      {/* Skeleton Programs Grid */}
      <div className={styles.programs_grid}>
        {/* Show 8 skeleton cards while loading */}
        {Array.from({ length: 8 }, (_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>

      {/* Skeleton Pagination */}
      <div className={styles.skeleton_pagination}>
        <div className={styles.skeleton_pagination_item}></div>
        <div className={styles.skeleton_pagination_item}></div>
        <div className={styles.skeleton_pagination_item}></div>
        <div className={styles.skeleton_pagination_item}></div>
        <div className={styles.skeleton_pagination_item}></div>
      </div>
    </section>
  );
};

export default function ProgramsSection() {
  const { setCoursesInfo, CoursesInfo } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const { name }: { name: string } = useParams();

  useEffect(() => {
    const runFetch = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCourses(`/api/courses/provider/${name}`);

        if (!result.success || result.info.length === 0) {
          setIsLoading(false);
          return;
        }

        setCoursesInfo(result.info);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    runFetch();
  }, [setCoursesInfo, name]);

  // Show skeleton while loading
  if (isLoading) {
    return <ProgramsSectionSkeleton providerName={name} />;
  }

  // Show message if no courses found
  if (!CoursesInfo || CoursesInfo.length === 0) {
    return (
      <section className={styles.programs_section}>
        <div className={styles.header_section}>
          <h1 className={styles.section_title}>{decodeURIComponent(name)}</h1>
          <p className={styles.results_text}>Showing 0 results</p>
        </div>
        <div className={styles.programs_grid}>
          <div className={styles.no_programs_message}>
            <p>No programs available for this provider at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.programs_section}>
      {/* Title and Results Count */}
      <div className={styles.header_section}>
        <h1 className={styles.section_title}>{decodeURIComponent(name)}</h1>
        <p className={styles.results_text}>
          Showing {CoursesInfo.length} results
        </p>
      </div>

      {/* Programs Grid */}
      <Courses />

      {/* Pagination */}
      <Pagination />
    </section>
  );
}
