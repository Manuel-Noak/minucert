import Image from "next/image";
import styles from "./brands.module.css";
import aiCert from "@/app/assets/img/aiCert.png";
import udemy from "@/app/assets/img/udemy.png";
import coursera from "@/app/assets/img/coursera.png";
import aws from "@/app/assets/img/aws.png";
import google from "@/app/assets/img/google.png";
export default function Brands() {
  return (
    <section className={styles.trustees}>
      <p className={styles.trusteesIntro}>
        Recognized by 50+ Leading <span> Brands Worldwide </span>
      </p>
      <div>
        <Image src={aiCert} alt="aiCert" />
        <Image src={coursera} alt="coursera" />

        <Image src={udemy} alt="udemy" />
        <Image src={google} alt="google" />
        <Image src={aws} alt="aws" />
      </div>
    </section>
  );
}
