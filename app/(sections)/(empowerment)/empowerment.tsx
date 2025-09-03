// Empowerment.jsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './empowerment.module.css';
import femaleFigure from '../../../public/assets/femaleFigure.jpg';

export default function Empowerment() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: '-50px 0px', // Start animation slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.empowerment} ${isVisible ? styles.animate : ''}`}
    >
      <div className={styles.empowermentContainer}>
        {/* Left side - Female figure image */}
        <div className={`${styles.empowermentImage} ${styles.slideInLeft}`}>
          <Image 
            src={femaleFigure} 
            alt="Female Figure" 
            className={styles.imageElement}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right side - Content */}
        <div className={`${styles.empowermentContent} ${styles.slideInRight}`}>
          <div className={styles.textContent}>
            {/* Empowering Individuals Label */}
            <p className={`${styles.empowermentLabel} ${styles.fadeInUp}`}>
              EMPOWERING INDIVIDUALS
            </p>

            {/* Main Title */}
            <h4 className={`${styles.empowermentTitle} ${styles.fadeInUp} ${styles.delayShort}`}>
              Driving Global Impact with AI and Blockchain Certifications for 1 {" "} <br/>
              <span>Billion Individuals</span>
            </h4>
          </div>

          {/* Pick a Program Button */}
          <button className={`${styles.programButton} ${styles.fadeInUp} ${styles.delayLong}`}>
            Pick a Program
          </button>
        </div>
      </div>
    </section>
  );
}