"use client";

import { CoursesInfo } from "@/app/(components)/(common)/data";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import defaultStyleImage from "@/app/assets/img/aiCloud.jpg";
import styles from "./detail.module.css";
import Navbar from "@/app/(components)/(navbar)/navbar";

interface CourseDetail {
  title: { rendered: string };
  acf: {
    certification_duration: string;
    about_certification: string;
    prerequisites: string;
    certification_modules: {
      certification_module_title: string;
      certification_module_description: string;
    }[];
    fields_v5: {
      "self-study-materials_data": { name: string }[];
    };
    what_will_you_learn: {
      learn_sections: { learn_name: string }[];
    };
    tools_data: {
      tool_image: string;
      name: string;
    }[];
  };
}

export default function AiCourseDetails() {
  const { id } = useParams();
  const page = id?.toString();
  const [detailData, setDetailData] = useState<CourseDetail | null>();
  const [courseImage, setCourseImage] = useState<StaticImageData | null>();

  useEffect(() => {
    fetch(`https://www.aicerts.ai/wp-json/wp/v2/courses/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setDetailData(data);
      })

      .catch((err) => console.log(err.message));
    setCourseImage(
      CoursesInfo.find((course) => course.id === Number.parseInt(page!))?.src
    );
  }, [page]);
  return !detailData?.acf ? (
    <></>
  ) : (
    <div className={styles.page}>
      <Navbar />
      <section className={styles.heading}>
        <Image
          src={courseImage || defaultStyleImage}
          alt={detailData?.title.rendered}
        />

        <div>
          <h2>{detailData?.title.rendered}</h2>
          <p>
            <span className={styles.headSpan}>Certification Duration: </span>
            {detailData?.acf.certification_duration}
          </p>

          <div
            dangerouslySetInnerHTML={{
              __html: detailData?.acf.about_certification,
            }}
          />
          <button>Buy Now</button>
        </div>
      </section>

      <section className={styles.mainInfos}>
        <section>
          <h2>Prerequisites:</h2>
          <div
            className={styles.prerequisites}
            dangerouslySetInnerHTML={{ __html: detailData?.acf.prerequisites }}
          />
        </section>

        <section>
          <h2>Modules:</h2>
          <div className={styles.moduleContent}>
            {detailData?.acf.certification_modules.map((modules) => (
              <div
                key={modules?.certification_module_title}
                dangerouslySetInnerHTML={{
                  __html: modules?.certification_module_description,
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2>Material:</h2>
          <div className={styles.materialContent}>
            {detailData?.acf.fields_v5["self-study-materials_data"].map(
              (material, index: number) => (
                <span key={index}>{material?.name}</span>
              )
            )}
          </div>
        </section>

        <section>
          <h2>What Will You Learn?</h2>
          <div className={styles.learn}>
            {detailData?.acf.what_will_you_learn.learn_sections.map(
              (material, index: number) => (
                <p key={index}>{material?.learn_name}</p>
              )
            )}
          </div>
        </section>

        <section>
          <h2>Tools You Will Master</h2>
          <div className={styles.tools}>
            {detailData?.acf.tools_data.map(
              (material, index: number) =>
                material?.tool_image && (
                  <div key={index}>
                    <img
                      src={material?.tool_image || defaultStyleImage}
                      alt={material?.name || "name"}
                      width={50}
                      height={50}
                    />
                    <p>{material?.name}</p>
                  </div>
                )
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
