"use client";
import styles from "./aiCert.module.css";
import Courses from "@/app/(sections)/courses/courses";
import Navbar from "@/app/(components)/(navbar)/navbar";
import { useState } from "react";
import AiProgramDetailsSection from "./AiCertProgramDetailsSection";

export default function AiCertProgramDetails() {

  return (
    <>
    {/* Navbar */}
      <Navbar/>

      {/* Program Details Section */}
      <AiProgramDetailsSection/>
    </>
  );
}
