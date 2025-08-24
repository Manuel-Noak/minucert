import Image from "next/image";
import styles from "./shape_your_future.module.css";
import nature_bg_img from "../../assets/img/Home/nature_bg_img.png";
import growth_img from "../../assets/img/Home/growth_img.png";
import expansion_img from "../../assets/img/Home/expansion_img.png";
import learn_arrow from "../../assets/img/Home/learn_arrow.png";

export default function ShapeYourFuture() {
  return (
    <section className={styles.container}>
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
          <div className={styles.glassContainerLarge}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>SHAPE YOUR FUTURE</h2>
              <p className={styles.description}>
                Expert-led courses to help you gain skills, unlock opportunities, and grow at any stage of your journey.
              </p>
              <button className={styles.learnButton}>
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
          <div className={styles.glassContainerSmall}>
            <div className={styles.iconWrapper}>
              <Image
                src={growth_img}
                alt="Growth icon"
                width={60}
                height={60}
                className={styles.icon}
              />
            </div>
            <h3 className={styles.cardTitle}>Growth</h3>
          </div>

          {/* Third glassmorphic container - Expansion */}
          <div className={styles.glassContainerSmall}>
            <div className={styles.iconWrapper}>
              <Image
                src={expansion_img}
                alt="Expansion icon"
                width={60}
                height={60}
                className={styles.icon}
              />
            </div>
            <h3 className={styles.cardTitle}>Expansion</h3>
          </div>
        </div>
      </div>
    </section>
  );
}