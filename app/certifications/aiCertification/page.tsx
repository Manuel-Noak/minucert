import React from "react";
import aiExecutive from "@/app/assets/img/aiExecutive.jpg";
import aiCloud from "@/app/assets/img/aiCloud.jpg";
import aiDevelopment from "@/app/assets/img/aiDevelopment.jpg";
import aiMarketing from "@/app/assets/img/aiMarketing.jpg";
import aiSales from "@/app/assets/img/aiSales.jpg";
import aiSecurity from "@/app/assets/img/aiSecurity.jpg";
import styles from "./aiCert.module.css";
import Courses from "@/app/(sections)/courses/courses";
import Navbar from "@/app/(components)/(navbar)/navbar";

const images = [
  {
    src: aiExecutive,
    title: "AI+ Executive ",
  },
  {
    src: aiSales,
    title: "AI+ Sales ",
  },
  {
    src: aiSecurity,
    title: "AI+ Security ",
  },
  {
    src: aiCloud,
    title: "AI+ Cloud ",
  },
  {
    src: aiDevelopment,
    title: "AI+ Development ",
  },
  {
    src: aiMarketing,
    title: "AI+ Marketing",
  },
  {
    src: aiSales,
    title: "AI+ Project Manger",
  },
  {
    src: aiExecutive,
    title: "AI+ Ethical Hacking",
  },
  {
    src: aiCloud,
    title: "AI+ Prompt Engineering",
  },
];
export default function AiCertification() {
  return (
    <>
      <Navbar />
      <div className={styles.courses}>
        {images.map((image) => (
          <Courses src={image.src} title={image.title} key={image.title} />
        ))}
      </div>
    </>
  );
}
