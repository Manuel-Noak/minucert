"use client";
import Image, { StaticImageData } from "next/image";
import styles from "./courses.module.css";
import { useRouter } from "next/navigation";

type Props = {
  src: string | StaticImageData;
  title: string;
  id: number;
};
export default function Courses({ src, title, id }: Props) {
  const router = useRouter();

  const navigatePage = () =>
    router.push(`/certifications/aiCertification/${id}`);

  return (
    <section className={styles.programs} key={title}>
      <Image src={src} alt={title} />
      <p>{title}</p>
      <button onClick={navigatePage}>See Program</button>
    </section>
  );
}
