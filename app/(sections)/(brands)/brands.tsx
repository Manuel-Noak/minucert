import Image from "next/image";
import styles from "./brands.module.css";
import { brands } from "@/app/(components)/(common)/data";

export default function Brands() {
  return (
    <section className={styles.trustees}>
      <p className={styles.trusteesIntro}>
        Recognized by 50+ Leading <br/>
        <span>Brands Worldwide</span>
      </p>
      <div className={styles.brandsContainer}>
        {brands.map((brand, index) => (
          <div key={index} className={styles.brandLogoWrapper}>
            <Image 
              src={brand.src} 
              alt={brand.alt}
              width={70}  // Smaller width
              height={40} // Smaller height  
              className={styles.brandLogo}
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '40px',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}