"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import hero_bg_img from "@/app/assets/img/Home/hero_bg_img.jpg";
import styles from "./hero.module.css";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/(state)/state";

export default function Hero() {
  const router = useRouter();
  const { providerRoute } = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with fade-in animation */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
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
        {/* Main Title with slide-up and fade-in animation */}
        <div className="flex flex-col w-full max-w-[607px]">
          <h1 className={`${styles.heroTitleMain} text-white mb-2 transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}>
            Equip Your Team with
            <br />
            <span className={`${styles.heroTitleItalic} transition-all duration-1200 ease-out delay-200 ${
              isLoaded 
                ? 'transform translate-y-0 opacity-100' 
                : 'transform translate-y-8 opacity-0'
            }`}>
              Future-Ready
            </span> AI Skills
          </h1>
        </div>

        {/* Subtitle with slide-up and fade-in animation (delayed) */}
        <h2
          className={`${styles.heroSubtitle} text-white mt-4 mb-8 w-full max-w-[607px] transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          The Choice of Africa&apos;s Leading Organizations
        </h2>

        {/* CTA Button with scale and fade-in animation (most delayed) */}
        <button
          className={`${styles.heroButton} bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center hover:scale-105 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100 scale-100' 
              : 'transform translate-y-8 opacity-0 scale-95'
          }`}
          style={{
            transitionDelay: isLoaded ? '0.5s' : '0s',
            transitionDuration: '0.8s'
          }}
          aria-label="Pick a Program"
          onClick={() =>
            providerRoute.length > 1 &&
            router.push("/certifications/provider/" + providerRoute)
          }
        >
          <span className={styles.buttonText}>Pick a Program</span>
        </button>
      </div>
    </section>
  );
}