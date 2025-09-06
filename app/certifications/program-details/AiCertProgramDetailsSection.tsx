"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import black_back_arrow from "@/public/assets/black_back_arrow.png";
import styles from "./aiCertProgramDetails.module.css";

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

interface CourseInfo {
  id: number;
  category: string;
  courseId: number;
  price: number;
  thumbnailLink: string;
  title: string;
  providerId: number;
  api: string;
}

// Skeleton Loader
const LoadingSkeleton = () => (
  <section className={styles.container}>
    <div className={styles.headerSection}>
      <div className={styles.backButton}>
        <div className={styles.skeletonBackArrow}></div>
        <div className={styles.skeletonBackText}></div>
      </div>
      <div className={styles.headerContent}>
        <div className={styles.programImageContainer}>
          <div className={styles.skeletonImage}></div>
        </div>
        <div className={styles.programInfo}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonTitleSecond}></div>
          <div className={styles.durationContainer}>
            <div className={styles.skeletonDurationLabel}></div>
            <div className={styles.skeletonDurationValue}></div>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.skeletonDescription}></div>
            <div className={styles.skeletonDescriptionSecond}></div>
            <div className={styles.skeletonDescriptionThird}></div>
          </div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
    </div>

    {[1, 2, 3].map((i) => (
      <div key={i} className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.skeletonSectionTitle}></div>
          <div className={styles.skeletonSectionContent}>
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className={styles.skeletonListItem}></div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </section>
);

// Strip HTML helper
const stripHtmlTags = (html: string): string =>
  html?.replace(/<[^>]*>/g, "")?.trim() || "";

// Safe array check and mapping utility
const safeMap = <T,>(
  array: T[] | undefined | null,
  callback: (item: T, index: number) => React.ReactNode
) => {
  if (!Array.isArray(array)) return null;
  return array.map(callback);
};

function ProgramSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState<CourseDetail | null>(null);
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);

  // Extract page param safely
  const page = searchParams?.get("id");

  useEffect(() => {
    if (!page) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/course/${page}`);
        const data = await res.json();

        if (!data.success) {
          router.back();
          return;
        }

        const { courseId, api } = data.info as CourseInfo;
        if (!courseId || !api) {
          router.back();
          return;
        }

        setCourseInfo(data.info);

        const wpRes = await fetch(`${api}${courseId}`);
        if (!wpRes.ok) {
          throw new Error("Failed to fetch course details");
        }
        const wpData: CourseDetail = await wpRes.json();

        setDetailData(wpData);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Something went wrong, please check your connection");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, router]);

  // Loading state
  if (isLoading) return <LoadingSkeleton />;

  // Fallback when data not found
  if (!detailData || !courseInfo) {
    return (
      <section className={styles.container}>
        <p className={styles.error}>Course details not found.</p>
      </section>
    );
  }

  const handleBackClick = () => router.back();
  const toggleDescription = () => setIsDescriptionExpanded((prev) => !prev);

  const programTitle = detailData.title?.rendered ?? "No Title";
  const duration = detailData.acf?.certification_duration ?? "Not specified";

  const fullDescription = stripHtmlTags(
    detailData.acf?.about_certification ?? ""
  );
  const truncatedDescription =
    fullDescription.length > 200
      ? `${fullDescription.substring(0, 200)}...`
      : fullDescription;

  // Safe array extraction with fallbacks
  const prerequisitesArray = Array.isArray(detailData.acf?.prerequisites)
    ? detailData.acf.prerequisites
    : typeof detailData.acf?.prerequisites === "string"
    ? detailData.acf.prerequisites
        .split(/<\/li>|<li>/)
        .map(stripHtmlTags)
        .filter((item) => item.trim() !== "")
    : [];

  const modules = Array.isArray(detailData.acf?.certification_modules)
    ? detailData.acf.certification_modules.map((m) => ({
        certification_module_title: stripHtmlTags(m.certification_module_title),
        certification_module_description: stripHtmlTags(
          m.certification_module_description
        ),
      }))
    : [];

  const materials = Array.isArray(
    detailData.acf?.fields_v5?.["self-study-materials_data"]
  )
    ? detailData.acf.fields_v5["self-study-materials_data"]
    : [];

  const learningOutcomes = Array.isArray(
    detailData.acf?.what_will_you_learn?.learn_sections
  )
    ? detailData.acf.what_will_you_learn.learn_sections.map((s) => ({
        title: s.learn_name,
        description: s.learn_text,
      }))
    : [];

  const tools = Array.isArray(detailData.acf?.tools_data)
    ? detailData.acf.tools_data
    : [];

  return (
    <section className={styles.container}>
      {/* Header */}
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
              src={courseInfo.thumbnailLink}
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
                {isDescriptionExpanded ? fullDescription : truncatedDescription}
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

      {/* Prerequisites */}
      {prerequisitesArray.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <h3 className={styles.sectionTitle}>Prerequisites</h3>
            <ul className={styles.bulletList}>
              {safeMap(prerequisitesArray, (item, i) => (
                <li key={i} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Modules */}
      {modules.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <h3 className={styles.sectionTitle}>Modules</h3>
            <ul className={styles.bulletList}>
              {safeMap(modules, (m, i) => (
                <li key={i} className={styles.listItem}>
                  {m.certification_module_title}
                  {m.certification_module_description && (
                    <p className={styles.moduleDescription}>
                      {m.certification_module_description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <h3 className={styles.sectionTitle}>Materials</h3>
            <div className={styles.materialsContainer}>
              {safeMap(materials, (m, i) => (
                <p key={i} className={styles.materialItem}>
                  • {m.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Learning Outcomes */}
      {learningOutcomes.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>What Will You Learn?</h2>
            <div className={styles.learningGrid}>
              {safeMap(learningOutcomes, (outcome, i) => (
                <div key={i} className={styles.learningItem}>
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

      {/* Tools */}
      {tools.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <h3 className={styles.sectionTitle}>Tools You&apos;ll Master</h3>
            <div className={styles.toolsContainer}>
              {safeMap(tools, (tool, i) => (
                <div key={i} className={styles.toolItem}>
                  <div className={styles.toolIconContainer}>
                    <img
                      src={tool.tool_image}
                      alt={tool.name}
                      className={styles.toolIcon}
                      width={50}
                      height={50}
                    />
                  </div>
                  <p className={styles.toolName}>{tool.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function AiProgramDetailsSection() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProgramSection />
    </Suspense>
  );
}
