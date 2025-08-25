"use client";
import styles from "./aiCert.module.css";
import Courses from "@/app/(sections)/courses/courses";
import Navbar from "@/app/(components)/(navbar)/navbar";
import { CoursesInfo } from "@/app/(components)/(common)/data";
import { useState } from "react";
import ProgramsSection from "./ProgramsSection";

export default function AiCertification() {
  // const numberOfContentPerPage = 7;
  // const [currentPage, setCurrentPage] = useState(1);

  // const lastIndex = numberOfContentPerPage * currentPage;
  // const firstIndex = lastIndex / numberOfContentPerPage;

  // const dataView = CoursesInfo.slice(firstIndex, lastIndex);

  // const totalPage = Math.ceil(CoursesInfo.length / numberOfContentPerPage);

  return (
    <>
    {/* Navbar */}
      <Navbar 
      backgroundColor="#FAFFEF"
      />

      {/* Program Section */}
      <ProgramsSection/>
      {/* <div className={styles.courses}>
        {dataView.map((image) => (
          <Courses
            id={image.id}
            src={image.src}
            title={image.title}
            key={image.title}
          />
        ))}
      </div> */}
    </>
  );
}
