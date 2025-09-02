"use client";
// import aiCloud from "@/app/assets/img/aiCloud.jpg";
import styles from "./aiCert.module.css";
import Courses from "@/app/(sections)/courses/courses";
import Pagination from "../pagination";
import fetchCourses from "@/app/(sections)/courses/fetchCourse";
import { useEffect } from "react";
import { useAppContext } from "@/app/(state)/state";
import { useParams } from "next/navigation";

export default function                                      ProgramsSection() {
  const { setCoursesInfo } = useAppContext();
  const { name }: { name: string } = useParams();
  useEffect(() => {
    const runFetch = async () => {
      const result = await fetchCourses(`/api/courses/provider/${name}`);

      if (!result.success || result.info.length === 0) {
        return null;
      }

      setCoursesInfo(result.info);
    };
    runFetch();
  }, [setCoursesInfo, name]);

  return (
    <section className={styles.programs_section}>
      {/* Title and Results Count */}
      <div className={styles.header_section}>
        <h1 className={styles.section_title}>{decodeURIComponent(name)}</h1>
      </div>

      {/* Programs Grid */}
      <Courses />

      {/* Pagination */}
      <Pagination />
    </section>
  );
}
