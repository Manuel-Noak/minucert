"use client";

import React from "react";
import Image from "next/image";
import hero_bg_img from "@/app/assets/img/Home/hero_bg_img.jpg";

export default function Hero() {
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
      <div className="hero-content relative z-10 flex flex-col items-center text-white px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="flex flex-col w-full max-w-[607px]">
          <h1 className="hero-title-main text-white mb-2">
            Equip Your Team with
            <br />
            <span className="hero-title-italic">Future-Ready</span> AI Skills
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="hero-subtitle text-white mt-4 mb-8 w-full max-w-[607px]">
          The Choice of Africa&apos;s Leading Organizations
        </h2>

        {/* CTA Button */}
        <button
          className="hero-button bg-white text-black hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
          aria-label="Pick a Program"
        >
          <span className="button-text">Pick a Program</span>
        </button>
      </div>

      {/* Exact responsive styles preserved */}
      <style jsx>{`
        .hero-content {
          margin-top: -120px;
          max-width: 90%;
          text-align: left;
        }

        .hero-title-main {
          font-weight: 700;
          font-size: 50px;
          line-height: 110%;
          letter-spacing: 0%;
          text-align: left;
          max-width: 607px;
          margin-bottom: 20px;
        }

        .hero-title-italic {
          /* Keep your cursive pick with safe fallbacks */
          font-family: "Monotype Corsiva", "URW Chancery L", "Apple Chancery",
            cursive;
          font-weight: 400;
          font-style: italic;
          font-size: 55px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: left;
        }

        .hero-subtitle {
          font-weight: 900;
          font-size: 20px;
          line-height: 120%;
          letter-spacing: 0%;
          text-align: left;
          max-width: 607px;
          margin-bottom: 30px;
        }

        .hero-button {
          width: 263px;
          height: 52px;
          border-radius: 50px;
        }

        .button-text {
          font-weight: 600;
          font-size: 15px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
        }

        /* Desktop Large */
        @media (min-width: 1400px) {
          .hero-content {
            max-width: 1200px;
            margin-top: -80px;
          }
        }

        /* Tablet and Large Mobile */
        @media (max-width: 1024px) {
          .hero-content {
            margin-top: -80px;
            max-width: 95%;
            padding: 0 20px;
          }

          .hero-title-main {
            font-size: 40px;
            line-height: 115%;
            margin-bottom: 16px;
          }

          .hero-title-italic {
            font-size: 44px;
          }

          .hero-subtitle {
            font-size: 18px;
            line-height: 125%;
            margin-bottom: 25px;
          }

          .hero-button {
            width: 240px;
            height: 48px;
          }

          .button-text {
            font-size: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-content {
            margin-top: -60px;
            padding: 0 16px;
            text-align: center;
            align-items: center;
          }

          .hero-title-main {
            font-size: 32px;
            line-height: 120%;
            margin-bottom: 14px;
            max-width: 100%;
            text-align: center;
          }

          .hero-title-italic {
            font-size: 44px;
            text-align: center;
          }

          .hero-subtitle {
            font-size: 16px;
            line-height: 130%;
            margin-bottom: 20px;
            max-width: 100%;
            text-align: center;
          }

          .hero-button {
            width: 220px;
            height: 46px;
          }

          .button-text {
            font-size: 14px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .hero-content {
            margin-top: -40px;
            padding: 0 12px;
          }

          .hero-title-main {
            font-size: 28px;
            line-height: 125%;
            margin-bottom: 12px;
            text-align: center;
          }

          .hero-title-italic {
            font-size: 38px;
            text-align: center;
          }

          .hero-subtitle {
            font-size: 15px;
            line-height: 135%;
            margin-bottom: 18px;
            text-align: center;
          }

          .hero-button {
            width: 200px;
            height: 44px;
          }

          .button-text {
            font-size: 13px;
          }
        }

        /* Very Small Mobile */
        @media (max-width: 360px) {
          .hero-content {
            margin-top: -20px;
            padding: 0 10px;
          }

          .hero-title-main {
            font-size: 24px;
            line-height: 130%;
            margin-bottom: 10px;
            text-align: center;
          }

          .hero-title-italic {
            font-size: 34px;
            text-align: center;
          }

          .hero-subtitle {
            font-size: 14px;
            line-height: 140%;
            margin-bottom: 16px;
            text-align: center;
          }

          .hero-button {
            width: 180px;
            height: 42px;
          }

          .button-text {
            font-size: 12px;
          }
        }

        /* Landscape orientation for mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .hero-content {
            margin-top: -20px;
          }

          .hero-title-main {
            font-size: 28px;
            margin-bottom: 8px;
            text-align: center;
          }

          .hero-title-italic {
            font-size: 38px;
            text-align: center;
          }

          .hero-subtitle {
            font-size: 14px;
            margin-bottom: 15px;
            text-align: center;
          }

          .hero-button {
            width: 200px;
            height: 40px;
          }

          .button-text {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
