"use client";

import React from "react";
import Image from "next/image";
import hero_bg_img from "@/app/assets/img/Home/hero_bg_img.jpg";
import styles from "./hero.module.css";
import { useRouter } from "next/navigation";
export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero_bg_img}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay with specified color and opacity */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#0000004D" }}
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div
        className={`${styles.heroContent} relative z-10 flex flex-col items-center text-white px-4 sm:px-6 lg:px-8`}
      >
        {/* Main Title */}
        <div className="flex flex-col w-full max-w-[607px]">
          <h1 className={`${styles.heroTitleMain} text-white mb-2`}>
            Equip Your Team with
            <br />
            <span className={styles.heroTitleItalic}>Future-Ready</span> AI
            Skills
          </h1>
        </div>

        {/* Subtitle */}
        <h2
          className={`${styles.heroSubtitle} text-white mt-4 mb-8 w-full max-w-[607px]`}
        >
          The Choice of Africa&apos;s Leading Organizations
        </h2>

        {/* CTA Button */}
        <button
          className={`${styles.heroButton} bg-white text-black hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center`}
          aria-label="Pick a Program"
          onClick={() => router.push("/")}
        >
          <span className={styles.buttonText}>Pick a Program</span>
        </button>
      </div>
    </section>
  );
}
