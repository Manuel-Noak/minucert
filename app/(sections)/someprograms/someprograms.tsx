// import { CoursesInfo } from "@/app/(components)/(common)/data";
// import CourseInfo from "../courses/courses";
"use client";
import styles from "./someprograms.module.css";

import type { StaticImageData } from "next/image";
// import Image from "next/image";
import { useEffect } from "react";
import fetchCourses from "../courses/fetchCourse";
import { useAppContext } from "@/app/(state)/state";
import { useRouter } from "next/navigation";

type CoursesProps = {
  src: string | StaticImageData;
  title: string;
  price: number;
  id: number;
};

const Courses = ({ src, title, id, price }: CoursesProps) => {
  const router = useRouter();
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImage}>
        <img
          src={src}
          alt={title}
          width={433}
          height={297}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles.courseContent}>
        <h3 className={styles.courseTitle}>{title}</h3>
        <p className={styles.courseTitle}>₦{price}</p>
        <button
          onClick={() =>
            router.push(
              `/certifications/aiCertification/program-details?id=${id}`
            )
          }
          className={styles.seeProgramBtn}
        >
          <span className={styles.seeProgramText}>See Program</span>
        </button>
      </div>
    </div>
  );
};

// Main Some Programs Component
export default function SomePrograms() {
  const { setCoursesInfo, CoursesInfo } = useAppContext();
  const runFetch = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/courses/${encodeURIComponent(
      "AI Certification"
    )}?perPage=6&offset=0`;

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
    <section className={styles.programsBody}>
      <div className={styles.programsHeader}>
        <h2 className={styles.programsTitle}>
          <span className={styles.someText}>Some</span>
          <span className={styles.programsText}> Programs</span>
        </h2>
        <p className={styles.programsSubtitle}>
          Empowering growth through AI innovation and {""} <br />
          <span> global industry transformation.</span>
        </p>
      </div>

      <div className={styles.coursesGrid}>
        {CoursesInfo.map((course, index) => (
          <Courses
            key={index}
            src={course.thumbnailLink}
            title={course.title}
            price={course.price}
            id={course.id}
          />
        ))}
      </div>
    </section>
  );
}
