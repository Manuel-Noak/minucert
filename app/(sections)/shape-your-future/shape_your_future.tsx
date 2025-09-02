"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./shape_your_future.module.css";
import nature_bg_img from "../../assets/img/Home/nature_bg_img.png";
import growth_img from "../../assets/img/Home/growth_img.png";
import expansion_img from "../../assets/img/Home/expansion_img.png";
import learn_arrow from "../../assets/img/Home/learn_arrow.png";

export default function ShapeYourFuture() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={styles.backgroundWrapper}>
        <Image
          src={nature_bg_img}
          alt="Nature background"
          className={styles.backgroundImage}
          priority
        />
        <div className={styles.overlay}></div>
        
        <div className={styles.contentWrapper}>
          {/* First glassmorphic container - Learn */}
          <div className={`${styles.glassContainerLarge} ${styles.animateSlideUp}`}>
            <div className={styles.textContent}>
              <h2 className={`${styles.title} ${styles.animateTitle}`}>SHAPE YOUR FUTURE</h2>
              <p className={`${styles.description} ${styles.animateDescription}`}>
                Expert-led courses to help you gain skills, unlock opportunities, and grow at any stage of your journey.
              </p>
              <button className={`${styles.learnButton} ${styles.animateButton}`}>
                Learn
                <Image
                  src={learn_arrow}
                  alt="Learn arrow"
                  width={16}
                  height={16}
                  className={styles.learnArrow}
                />
              </button>
            </div>
          </div>

          {/* Second glassmorphic container - Growth */}
          <div className={`${styles.glassContainerSmall} ${styles.animateSlideUpDelay1}`}>
            <div className={`${styles.iconWrapper} ${styles.animateIcon}`}>
              <Image
                src={growth_img}
                alt="Growth icon"
                width={60}
                height={60}
                className={styles.icon}
              />
            </div>
            <h3 className={`${styles.cardTitle} ${styles.animateCardTitle}`}>Growth</h3>
          </div>

          {/* Third glassmorphic container - Expansion */}
          <div className={`${styles.glassContainerSmall} ${styles.animateSlideUpDelay2}`}>
            <div className={`${styles.iconWrapper} ${styles.animateIcon}`}>
              <Image
                src={expansion_img}
                alt="Expansion icon"
                width={60}
                height={60}
                className={styles.icon}
              />
            </div>
            <h3 className={`${styles.cardTitle} ${styles.animateCardTitle}`}>Expansion</h3>
          </div>
        </div>
      </div>
    </section>
  );
}