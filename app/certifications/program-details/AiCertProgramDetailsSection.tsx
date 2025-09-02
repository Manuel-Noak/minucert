"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import black_back_arrow from "@/public/assets/black_back_arrow.png";
import program_img from "@/app/assets/img/aiCloud.jpg";
import styles from "./aiCertProgramDetails.module.css";
import { useAppContext } from "@/app/(state)/state";
import Loader from "@/app/(components)/(loading)/loader";

interface CourseDetail {
    title: { rendered: string };
    acf: {
        certification_duration: string;
        about_certification: string;
        prerequisites: string; // This is a string, not an array
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

// Loading Skeleton Component
const LoadingSkeleton = () => {
    return (
        <section className={styles.container}>
            {/* Header Loading Skeleton */}
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
                            <div
                                className={styles.skeletonDescriptionSecond}
                            ></div>
                            <div
                                className={styles.skeletonDescriptionThird}
                            ></div>
                        </div>

                        <div className={styles.skeletonButton}></div>
                    </div>
                </div>
            </div>

            {/* Section Loading Skeletons */}
            {[1, 2, 3].map((index) => (
                <div key={index} className={styles.section}>
                    <div className={styles.sectionContent}>
                        <div className={styles.skeletonSectionTitle}></div>
                        <div className={styles.skeletonSectionContent}>
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className={styles.skeletonListItem}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

// Helper function to strip HTML tags - moved outside component
const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, "").trim();
};

// // Loading Skeleton Component
// const LoadingSkeleton = () => {
//   return (
//     <section className={styles.container}>
//       {/* Header Loading Skeleton */}
//       <div className={styles.headerSection}>
//         <div className={styles.backButton}>
//           <div className={styles.skeletonBackArrow}></div>
//           <div className={styles.skeletonBackText}></div>
//         </div>

//         <div className={styles.headerContent}>
//           <div className={styles.programImageContainer}>
//             <div className={styles.skeletonImage}></div>
//           </div>

//           <div className={styles.programInfo}>
//             <div className={styles.skeletonTitle}></div>
//             <div className={styles.skeletonTitleSecond}></div>

//             <div className={styles.durationContainer}>
//               <div className={styles.skeletonDurationLabel}></div>
//               <div className={styles.skeletonDurationValue}></div>
//             </div>

//             <div className={styles.descriptionContainer}>
//               <div className={styles.skeletonDescription}></div>
//               <div className={styles.skeletonDescriptionSecond}></div>
//               <div className={styles.skeletonDescriptionThird}></div>
//             </div>

//             <div className={styles.skeletonButton}></div>
//           </div>
//         </div>
//       </div>

//       {/* Section Loading Skeletons */}
//       {[1, 2, 3].map((index) => (
//         <div key={index} className={styles.section}>
//           <div className={styles.sectionContent}>
//             <div className={styles.skeletonSectionTitle}></div>
//             <div className={styles.skeletonSectionContent}>
//               {[1, 2, 3, 4].map((item) => (
//                 <div key={item} className={styles.skeletonListItem}></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

export default function AiProgramDetailsSection() {
    const router = useRouter();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const params = useSearchParams();
    const page = params.get("id")?.toString();

    const [detailData, setDetailData] = useState<CourseDetail | null>(null);
    const [courseInfo, setCourseInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!page) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/course/${page}`);
                const data = await res.json();

                if (!data.success) {
                    toast.error(data.message);
                    setIsLoading(false);
                    return;
                }

                setCourseInfo(data.info);

                const { courseId, api } = data.info;
                if (!courseId || !api) {
                    setIsLoading(false);
                    return;
                }

                const wpRes = await fetch(api + courseId);
                const wpData = await wpRes.json();

                setDetailData(wpData);
            } catch (_) {
                toast.error(
                    "Something went wrong, please check your connection"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    const handleBackClick = () => router.back();
    const toggleDescription = () =>
        setIsDescriptionExpanded(!isDescriptionExpanded);

    if (!detailData || !courseInfo) {
        return (
            <section className={styles.container}>
                <p className={styles.error}>Course details not found.</p>
            </section>
        );
    }

    const programTitle = detailData.title?.rendered ?? "No Title";
    const duration = detailData.acf?.certification_duration ?? "Not specified";
    const rawDescription = detailData.acf?.about_certification ?? "";
    const fullDescription = stripHtmlTags(rawDescription); // Clean HTML from description
    const truncatedDescription =
        fullDescription.length > 200
            ? fullDescription.substring(0, 200) + "..."
            : fullDescription;

    // Process prerequisites - convert HTML string to clean text array
    const prerequisites = detailData.acf?.prerequisites;
    const prerequisitesArray = prerequisites
        ? prerequisites
              .split(/<\/li>|<li>/) // Split by li tags
              .map((item) => stripHtmlTags(item)) // Remove all HTML tags
              .filter((item) => item.trim() !== "") // Remove empty items
        : [];

    // Process modules - clean HTML from module descriptions
    const rawModules = detailData.acf?.certification_modules ?? [];
    const modules = rawModules.map((module) => ({
        ...module,
        certification_module_title: stripHtmlTags(
            module.certification_module_title || ""
        ),
        certification_module_description: stripHtmlTags(
            module.certification_module_description || ""
        ),
    }));
    const materials =
        detailData.acf?.fields_v5?.["self-study-materials_data"] ?? [];
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

    // Show loading skeleton while data is being fetched
    if (isLoading || !detailData || !courseInfo) {
        return <LoadingSkeleton />;
    }

    return (
        <section className={styles.container}>
            {/* Header Section */}
            <div className={styles.headerSection}>
                <div className={styles.backButton} onClick={handleBackClick}>
                    <Image
                        src={black_back_arrow}
                        alt='Back'
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
                            <span className={styles.durationValue}>
                                {duration}
                            </span>
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
                                        {isDescriptionExpanded
                                            ? "Read Less"
                                            : "Read More"}
                                    </span>
                                    <span
                                        className={`${styles.readMoreArrow} ${
                                            isDescriptionExpanded
                                                ? styles.rotated
                                                : ""
                                        }`}
                                    >
                                        ›
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() =>
                                router.push("/certifications/checkout")
                            }
                            className={styles.buyNowButton}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Prerequisites Section - FIXED */}
            {prerequisitesArray.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.sectionContent}>
                        <h3 className={styles.sectionTitle}>Prerequisites</h3>
                        <ul className={styles.bulletList}>
                            {prerequisitesArray.map((item, index) => (
                                <p key={index} className={styles.listItem}>
                                    {item.trim()}
                                </p>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Modules Section - FIXED */}
            {modules.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.sectionContent}>
                        <h3 className={styles.sectionTitle}>Modules</h3>
                        <ul className={styles.bulletList}>
                            {modules.map((item, index) => (
                                <p key={index} className={styles.listItem}>
                                    {item.certification_module_title}

                                    {item.certification_module_description && (
                                        <p className={styles.moduleDescription}>
                                            {
                                                item.certification_module_description
                                            }
                                        </p>
                                    )}
                                </p>
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
                            {materials.map((m, idx) => (
                                <p key={idx} className={styles.materialItem}>
                                    • {m.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* What will you learn? Section */}
            {learningOutcomes.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.sectionTitle}>
                            What Will You Learn?
                        </h2>
                        <div className={styles.learningGrid}>
                            {learningOutcomes.map((outcome, index) => (
                                <div
                                    key={index}
                                    className={styles.learningItem}
                                >
                                    <h3 className={styles.learningTitle}>
                                        {outcome.title}
                                    </h3>
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
                        <h3 className={styles.sectionTitle}>
                            Tools You&apos;ll Master
                        </h3>
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
                                    <p className={styles.toolName}>
                                        {tool.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
