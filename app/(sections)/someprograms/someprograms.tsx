// import { CoursesInfo } from "@/app/(components)/(common)/data";
// import CourseInfo from "../courses/courses";
"use client";
import styles from "./someprograms.module.css";

import type { StaticImageData } from "next/image";
import defaultImage from "@/app/assets/img/aiSales.jpg";
import { useEffect } from "react";
import fetchCourses from "../courses/fetchCourse";
import { useAppContext } from "@/app/(state)/state";
import { useRouter } from "next/navigation";

type CoursesProps = {
  src: string | StaticImageData;
  title: string;
  price: number;
  id: number;
  currencyCode: string;
};

const Courses = ({ src, title, id, price, currencyCode }: CoursesProps) => {
  const router = useRouter();
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImage}>
        <img
          src={src || defaultImage}
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
        <p className={styles.courseTitle}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
          }).format(price / 100)}
        </p>
        <button
          onClick={() =>
            router.push(`/certifications/program-details?id=${id}`)
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
  useEffect(() => {
    const runFetch = async () => {
      const result = await fetchCourses("/api/fetchFewCourse");

      if (!result.success || result.info.length === 0) {
        return null;
      }

      setCoursesInfo(result.info);
    };
    runFetch();
  }, [setCoursesInfo]);
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
            currencyCode={course.currencyCode}
          />
        ))}
      </div>
    </section>
  );
}
