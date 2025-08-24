// Empowerment.jsx
import React from 'react';
import Image from 'next/image';
import styles from './empowerment.module.css';
import femaleFigure from '../../../public/assets/femaleFigure.jpg';

export default function Empowerment() {
  return (
    <section className={styles.empowerment}>
      <div className={styles.empowermentContainer}>
        {/* Left side - Female figure image */}
        <div className={styles.empowermentImage}>
          <Image 
            src={femaleFigure} 
            alt="Female Figure" 
            className={styles.imageElement}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right side - Content */}
        <div className={styles.empowermentContent}>
          <div className={styles.textContent}>
            {/* Empowering Individuals Label */}
            <p className={styles.empowermentLabel}>
              EMPOWERING INDIVIDUALS
            </p>

            {/* Main Title */}
            <h4 className={styles.empowermentTitle}>
              Driving Global Impact with AI and Blockchain Certifications for 1 {" "} <br/>
              <span>Billion Individuals</span>
            </h4>
          </div>

          {/* Pick a Program Button */}
          <button className={styles.programButton}>
            Pick a Program
          </button>
        </div>
      </div>
    </section>
  );
}