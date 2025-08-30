"use client";

import { CoursesInfo } from "@/app/(components)/(common)/data";
import Image, { StaticImageData } from "next/image";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import black_back_arrow from "@/public/assets/black_back_arrow.png";
import program_img from "@/app/assets/img/aiCloud.jpg";

// Styles
import styles from "./aiCertProgramDetails.module.css";
import { toast } from "react-toastify";

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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const params = useSearchParams();
  const page = params.get("id")?.toString();
  const [detailData, setDetailData] = useState<CourseDetail | null>();
  const [courseInfo, setCourseInfo] = useState();

  useEffect(() => {
    if (!page) return;

    const fetchData = async () => {
      try {
        // Get course info from your API
        const res = await fetch(`/api/course/${page}`);
        const data = await res.json();

        if (!data.success) {
          return toast.error(data.message);
        }

        setCourseInfo(data.info);

        // Now safely fetch detailData using courseId
        const courseId = data.info.courseId;
        if (!courseId) return;

        const wpRes = await fetch(
          `https://www.aicerts.ai/wp-json/wp/v2/courses/${courseId}`
        );
        const wpData = await wpRes.json();

        setDetailData(wpData);
      } catch (err) {
        toast.error("Something went wrong, please check your connection");
      }
    };

    fetchData();
  }, [page, router]);

  // Helper function to strip HTML tags
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Helper function to extract list items from HTML
  const extractListItems = (html: string): string[] => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    const listItems = tmp.querySelectorAll("li");
    return Array.from(listItems).map((li) => stripHtml(li.innerHTML));
  };

  // Get data or fallbacks
  const programTitle = detailData?.title?.rendered || "Loading...";
  const duration = detailData?.acf?.certification_duration || "Loading...";
  const fullDescription = detailData?.acf?.about_certification
    ? stripHtml(detailData.acf.about_certification)
    : "Loading course description...";

  const truncatedDescription =
    fullDescription.length > 200
      ? fullDescription.substring(0, 200) + "..."
      : fullDescription;

  const prerequisites = detailData?.acf?.prerequisites
    ? extractListItems(detailData.acf.prerequisites)
    : [];

  const modules =
    detailData?.acf?.certification_modules == undefined ||
    !detailData?.acf?.certification_modules
      ? []
      : detailData?.acf?.certification_modules.map(
          (module) => module.certification_module_title
        );

  const materials =
    detailData?.acf?.fields_v5?.["self-study-materials_data"]?.map(
      (material) => material.name
    ) || [];

  const learningOutcomes =
    detailData?.acf?.what_will_you_learn?.learn_sections == undefined ||
    !detailData?.acf?.what_will_you_learn?.learn_sections
      ? []
      : detailData?.acf?.what_will_you_learn?.learn_sections?.map(
          (section) => ({
            title: section.learn_name,
            description: section.learn_text,
          })
        );

  const tools = detailData?.acf?.tools_data || [];

  if (!detailData) {
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
          <div className={styles.headerContent}>
            <div>Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    courseInfo && (
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
                src={courseInfo?.thumbnailLink || program_img}
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
                <p className={styles.description}>
                  {isDescriptionExpanded
                    ? fullDescription
                    : truncatedDescription}
                </p>
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

        {/* Prerequisites Section */}
        {prerequisites.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Prerequisites</h2>
              <ul className={styles.bulletList}>
                {prerequisites.map((item, index) => (
                  <li key={index} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modules Section */}
        {modules.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Modules</h2>
              <ul className={styles.bulletList}>
                {modules.map((item, index) => (
                  <li key={index} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Materials Section */}
        {materials.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Materials</h2>
              <div className={styles.materialsContainer}>
                {materials.map((item, index) => (
                  <span key={index} className={styles.materialItem}>
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* What will you learn? Section */}
        {learningOutcomes.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>What Will You Learn?</h2>
              <div className={styles.learningGrid}>
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className={styles.learningItem}>
                    <h3 className={styles.learningTitle}>{outcome.title}</h3>
                    <p className={styles.learningDescription}>
                      {outcome.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tools you'll master Section */}
        {tools.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Tools You&apos;ll Master</h2>
              <div className={styles.toolsContainer}>
                {tools.map((tool, index) => (
                  <div key={index} className={styles.toolItem}>
                    <div className={styles.toolIconContainer}>
                      <img
                        src={tool.tool_image}
                        alt={tool.name}
                        className={styles.toolIcon}
                        width={50}
                        height={50}
                      />
                    </div>
                    <span className={styles.toolName}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    )
  );
}
