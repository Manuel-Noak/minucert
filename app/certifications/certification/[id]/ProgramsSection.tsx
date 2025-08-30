"use client";
import aiExecutive from "@/app/assets/img/aiExecutive.jpg";
import aiCloud from "@/app/assets/img/aiCloud.jpg";
import aiDevelopment from "@/app/assets/img/aiDevelopment.jpg";
import aiMarketing from "@/app/assets/img/aiMarketing.jpg";
import aiSales from "@/app/assets/img/aiSales.jpg";
import aiSecurity from "@/app/assets/img/aiSecurity.jpg";
import styles from "./aiCert.module.css";
import Courses from "@/app/(sections)/courses/courses";
import Pagination from "../pagination";
import fetchCourses from "@/app/(sections)/courses/fetchCourse";
import { useEffect } from "react";
import { useAppContext } from "@/app/(state)/state";
import { useParams } from "next/navigation";

export default function ProgramsSection() {
  const { setCoursesInfo } = useAppContext();
  const { id } = useParams();
  const runFetch = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/courses/${id}?perPage=9&offset=0`;

    const result = await fetchCourses(url);

    if (!result.success || result.info.length === 0) {
      return null;
    }

    setCoursesInfo(result.info);
    console.log(result.info);
  };
  useEffect(() => {
    runFetch();
  }, []);

  return (
    <section className={styles.programs_section}>
      {/* Title and Results Count */}
      <div className={styles.header_section}>
        <h1 className={styles.section_title}>{id}</h1>
      </div>

      {/* Programs Grid */}
      <Courses />

      {/* Pagination */}
      <Pagination />
    </section>
  );
}
