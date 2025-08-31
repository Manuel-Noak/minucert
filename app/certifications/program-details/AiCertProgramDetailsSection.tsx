"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import black_back_arrow from "@/public/assets/black_back_arrow.png";
import program_img from "@/app/assets/img/aiCloud.jpg";
import styles from "./aiCertProgramDetails.module.css";
import Loader from "@/app/(components)/(loading)/loader";

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
      "self-study-materials_data": {
        name: string;
        description: string;
      }[];
    };
    what_will_you_learn: {
      learn_sections: {
        learn_name: string;
        learn_text: string;
      }[];
    };
    tools_data: {
      tool_image: string;
      name: string;
    }[];
  };
}

export default function AiProgramDetailsSection() {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("id")?.toString();

  const [detailData, setDetailData] = useState<CourseDetail | null>(null);
  const [courseInfo, setCourseInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    if (!page) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/course/${page}`);
        const data = await res.json();

        if (!data.success) {
          toast.error(data.message);
          setLoading(false);
          return;
        }

        setCourseInfo(data.info);

        const courseId = data.info.courseId;
        if (!courseId) return;

        const wpRes = await fetch(
          `https://www.aicerts.ai/wp-json/wp/v2/courses/${courseId}`
        );
        const wpData = await wpRes.json();

        setDetailData(wpData);
      } catch (err) {
        toast.error("Something went wrong, please check your connection");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleBackClick = () => router.back();
  const toggleDescription = () =>
    setIsDescriptionExpanded(!isDescriptionExpanded);

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.backButton} onClick={handleBackClick}>
            <Image
              src={black_back_arrow}
              alt="Back"
              className={styles.backArrow}
            />
            <span className={styles.backText}>Back</span>
          </div>

          <Loader />
        </div>
      </section>
    );
  }

  if (!detailData || !courseInfo) {
    return (
      <section className={styles.container}>
        <p className={styles.error}>Course details not found.</p>
      </section>
    );
  }

  const programTitle = detailData.title?.rendered ?? "No Title";
  const duration = detailData.acf?.certification_duration ?? "Not specified";
  const fullDescription = detailData.acf?.about_certification ?? "";
  const truncatedDescription =
    fullDescription.length > 200
      ? fullDescription.substring(0, 200) + "..."
      : fullDescription;

  const prerequisites = detailData.acf?.prerequisites;
  const modules = detailData.acf?.certification_modules ?? [];
  const materials =
    detailData.acf?.fields_v5?.["self-study-materials_data"] ?? [];
  const learningOutcomes =
    detailData.acf?.what_will_you_learn?.learn_sections ?? [];
  const tools = detailData.acf?.tools_data ?? [];

  return (
    <section className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.backButton} onClick={handleBackClick}>
          <Image
            src={black_back_arrow}
            alt="Back"
            className={styles.backArrow}
          />
          <span className={styles.backText}>Back</span>
        </div>

        <div className={styles.headerContent}>
          <div className={styles.programImageContainer}>
            <img
              src={courseInfo?.thumbnailLink || program_img.src}
              alt={programTitle}
              className={styles.programImage}
            />
          </div>

          <div className={styles.programInfo}>
            <h1 className={styles.programTitle}>{programTitle}</h1>

            <div className={styles.durationContainer}>
              <span className={styles.durationLabel}>
                Certification Duration:
              </span>
              <span className={styles.durationValue}>{duration}</span>
            </div>

            <div className={styles.descriptionContainer}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: isDescriptionExpanded
                    ? fullDescription
                    : truncatedDescription,
                }}
              />
              {fullDescription.length > 200 && (
                <div
                  className={styles.readMoreContainer}
                  onClick={toggleDescription}
                >
                  <span className={styles.readMoreText}>
                    {isDescriptionExpanded ? "Read Less" : "Read More"}
                  </span>
                  <span
                    className={`${styles.readMoreArrow} ${
                      isDescriptionExpanded ? styles.rotated : ""
                    }`}
                  >
                    ›
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push("/certifications/checkout")}
              className={styles.buyNowButton}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      {prerequisites && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Prerequisites</h2>
          <div
            className={styles.sectionContent}
            dangerouslySetInnerHTML={{ __html: prerequisites }}
          />
        </div>
      )}

      {/* Modules */}
      {modules.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Modules</h2>
          <ul className={styles.bulletList}>
            {modules.map((m, idx) => (
              <li key={idx} className={styles.listItem}>
                {m.certification_module_title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Materials</h2>
          <div className={styles.materialsContainer}>
            {materials.map((m, idx) => (
              <span key={idx} className={styles.materialItem}>
                • {m.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Learning Outcomes */}
      {learningOutcomes.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What Will You Learn?</h2>
          <div className={styles.learningGrid}>
            {learningOutcomes.map((o, idx) => (
              <div key={idx} className={styles.learningItem}>
                <h3 className={styles.learningTitle}>{o.learn_name}</h3>
                <div
                  className={styles.learningDescription}
                  dangerouslySetInnerHTML={{ __html: o.learn_text }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Tools You&apos;ll Master</h2>
          <div className={styles.toolsContainer}>
            {tools.map((tool, idx) => (
              <div key={idx} className={styles.toolItem}>
                <img
                  src={tool.tool_image}
                  alt={tool.name}
                  className={styles.toolIcon}
                  width={50}
                  height={50}
                />
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
