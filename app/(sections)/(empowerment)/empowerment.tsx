import Image from "next/image";
import styles from "./empowerment.module.css";
import femaleFigure from "@/app/assets/img/femaleFigure.jpg";
export default function Empowerment() {
  return (
    <section className={styles.empowerment}>
      <div>
        <Image src={femaleFigure} alt="femaleFigure" />

        <div className={styles.empowermentTitle}>
          <div>
            <h3>EMPOWERING INDIVIDUALS</h3>
            <h2>
              Driving Global Impact with AI and Blockchain Certifications for 1
              Billion Individuals
            </h2>
          </div>
          <button>Pick a Program</button>
        </div>
      </div>
    </section>
  );
}
