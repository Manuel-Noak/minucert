import Image, { StaticImageData } from "next/image";
import styles from "./courses.module.css";

type Props = {
  src: string | StaticImageData;
  title: string;
};
export default function Courses({ src, title }: Props) {
  return (
    <section className={styles.programs} key={title}>
      <Image src={src} alt={title} />
      <p>{title}</p>
      <button>See Program</button>
    </section>
  );
}
