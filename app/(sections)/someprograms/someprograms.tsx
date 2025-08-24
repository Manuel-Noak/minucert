import { CoursesInfo } from "@/app/(components)/(common)/data";
import CourseInfo from "../courses/courses";
import styles from "./someprograms.module.css";

import type { StaticImageData } from "next/image";
import Image from "next/image";

type CoursesProps = {
  src: string | StaticImageData;
  title: string;
};

const Courses = ({ src, title }: CoursesProps) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImage}>
        <Image 
          src={typeof src === "string" ? src : src.src} 
          alt={title}
          width={433}
          height={297}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className={styles.courseContent}>
        <h3 className={styles.courseTitle}>{title}</h3>
        <button className={styles.seeProgramBtn}>
          <span className={styles.seeProgramText}>See Program</span>
        </button>
      </div>
    </div>
  );
};

// Main Some Programs Component
export default function SomePrograms() {
  return (
    <section className={styles.programsBody}>
      <div className={styles.programsHeader}>
        <h2 className={styles.programsTitle}>
          <span className={styles.someText}>Some</span>
          <span className={styles.programsText}> Programs</span>
        </h2>
        <p className={styles.programsSubtitle}>
          Empowering growth through AI innovation and {""} <br/>
          <span> global industry transformation.</span>
        </p>
      </div>
      
      <div className={styles.coursesGrid}>
        {CoursesInfo.map((course, index) => (
          <Courses
            key={index}
            src={course.src}
            title={course.title}
          />
        ))}
      </div>
    </section>
  );
}