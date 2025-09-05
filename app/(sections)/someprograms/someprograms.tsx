"use client";
import styles from "./someprograms.module.css";

// import defaultImage from "@/app/assets/img/aiSales.jpg";
import { useEffect, useState } from "react";
import fetchCourses from "../courses/fetchCourse";
import { useAppContext } from "@/app/(state)/state";
import { useRouter } from "next/navigation";

type CoursesProps = {
  src: string;
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
        <img src={src} alt={title} />
      </div>
      <div className={styles.courseContent}>
        <p className={styles.courseTitle}>{title}</p>
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

// Loading Skeleton Component for Course Cards
const CourseCardSkeleton = () => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImage}>
        <div className={styles.skeletonImage}></div>
      </div>
      <div className={styles.courseContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonPrice}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
};

// Loading Skeleton for the entire section
const SomeProgramsSkeleton = () => {
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
        {/* Show 6 skeleton cards while loading */}
        {Array.from({ length: 6 }, (_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

// Main Some Programs Component
export default function SomePrograms() {
  const { setCoursesInfo, CoursesInfo } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runFetch = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCourses("/api/fetchFewCourse");

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
  }, [setCoursesInfo]);

  // Show skeleton while loading
  if (isLoading) {
    return <SomeProgramsSkeleton />;
  }

  // Show message if no courses found
  if (!CoursesInfo || CoursesInfo.length === 0) {
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
          <p className={styles.noCoursesMessage}>
            No courses available at the moment.
          </p>
        </div>
      </section>
    );
  }

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
