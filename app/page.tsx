import React from "react";
import Navbar from "./(navbar)/navbar";
import styles from "./page.module.css";
import Image from "next/image";
import udemyLogo from "./assets/udemyLogo.png";
import aiCert from "./assets/aiCert.png";
import aiExecutive from "./assets/aiExecutive.jpg";
import aiCloud from "./assets/aiCloud.jpg";
import aiDevelopment from "./assets/aiDevelopment.jpg";
import aiMarketing from "./assets/aiMarketing.jpg";
import aiSales from "./assets/aiSales.jpg";
import aiSecurity from "./assets/aiSecurity.jpg";
import femaleFigure from "./assets/femaleFigure.jpg";

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
];
function App() {
  return (
    <div className={styles.body}>
      <Navbar />
      <section className={styles.hero}>
        <h1>Equip Your Team with</h1>
        <h3>
          Future-Ready <strong>AI Skills </strong>
        </h3>
        <small>The Choice Of Africa&apos;s leading organization</small>
        <button>Pick a Program</button>
      </section>

      <section className={styles.trustees}>
        <p className={styles.trusteesIntro}>
          Recognized by 50+ Leading <span> Brands Worldwide </span>
        </p>
        <div>
          <p className={styles.aiCert}>
            <Image src={aiCert} width={32} height={34} alt="aicerts" /> CERT{" "}
            <small>S</small>
          </p>
          <p>Coursera</p>
          <p className={styles.udemy}>
            <Image src={udemyLogo} height={32} width={28} alt="udemyLogo" />
            <span> demy </span>
          </p>
          <p>Google</p>
          <p>AWS</p>
        </div>
      </section>
      <section className={styles.programsBody}>
        <h2>
          <span>Some</span> Programs
        </h2>
        <p>
          Empowering growth through AI innovation and global industry
          transformation
        </p>

        <div className={styles.courses}>
          {images.map((image) => (
            <section className={styles.programs} key={image.title}>
              <Image src={image.src} alt={image.title} />
              <p>{image.title}</p>
              <button>See Program</button>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.empowerment}>
        <div>
          <Image src={femaleFigure} alt="femaleFigure" />

          <div className={styles.empowermentTitle}>
            <header>
              <h3>EMPOWERING INDIVIDUALS</h3>
              <h2>
                Driving Global Impact with AI and Blockchain Certifications for
                1 Billion Individuals
              </h2>
            </header>
            <button>Pick a Program</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
