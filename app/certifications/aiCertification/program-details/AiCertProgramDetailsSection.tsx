"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import black_back_arrow from "../../../../public/assets/black_back_arrow.png";
import program_img from "@/app/assets/img/aiCloud.jpg";

// Images icons
import github_icon from "@/app/assets/img/ProgramDetails/github_icon.png";
import lobe_icon from "@/app/assets/img/ProgramDetails/lobe_icon.png";
import H20ai_icon from "@/app/assets/img/ProgramDetails/H20.ai_icon.png";
import snorkel_icon from "@/app/assets/img/ProgramDetails/snorkel_icon.png";

// Styles
import styles from "./aiCertProgramDetails.module.css";

export default function AiProgramDetailsSection() {
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const prerequisites = [
    "A basic understanding of mathematics, programming, and AI/ML concepts.",
    "Proficiency in data structures and computer science fundamentals.",
    "Familiarity with AI application workflows and project management strategies.",
    "A willingness to engage in practical workshops and implement real-world AI models."
  ];

  const modules = [
    "Introduction to Artificial Intelligence (AI) in Project Management",
    "AI Tools for Project Management",
    "Data-Driven Decision Making",
    "AI for Enhancing Team Collaboration and Productivity",
    "Ethical Considerations and Bias in AI",
    "Implementing AI in Projects",
    "Future of AI in Project Management"
  ];

  const materials = [
    "Videos",
    "Podcasts",
    "Audiobooks",
    "E-Books",
    "Hands-on",
    "Module Wise Quizzes"
  ];

  const learningOutcomes = [
    {
      title: "AI Integration in Project Management",
      description: "Master the integration of AI tools in project planning, scheduling, and delivery to improve operational efficiency."
    },
    {
      title: "Data-Driven Decision Making",
      description: "Develop expertise in AI-powered data analysis to enhance decision-making processes and optimize project outcomes."
    },
    {
      title: "Improved Team Collaboration and Productivity",
      description: "Harness AI-driven tools for team communication, knowledge sharing, and task management to boost productivity."
    },
    {
      title: "Communication and Stakeholder Management",
      description: "Enhance stakeholder collaboration through AI-optimized communication platforms, ensuring project alignment and buy-in."
    }
  ];

  const tools = [
    { name: "GitHub Copilot", icon: github_icon },
    { name: "Lobe", icon: lobe_icon },
    { name: "H2O.ai", icon: H20ai_icon },
    { name: "Snorkel", icon: snorkel_icon }
  ];

  const fullDescription = "The AI+ Project Manager™ Certification equips project managers and IT professionals with advanced expertise in Artificial Intelligence (AI)-powered project management solutions. This comprehensive course delves into the integration of AI systems for real-time problem-solving, exploring advanced AI-driven project planning and resource allocation tools. The curriculum encompasses AI algorithms, machine learning architectures, and intelligent decision-making processes, from foundational to advanced levels. Participants will learn to design, implement, and evaluate AI applications tailored to multi-disciplinary project management scenarios. Graduates of this program are empowered to navigate the evolving AI-driven landscape and drive efficient project execution, team collaboration, and data-driven stakeholder communication.";

  const truncatedDescription = fullDescription.substring(0, 200) + "...";

  return (
    <section className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.backButton} onClick={handleBackClick}>
          <Image src={black_back_arrow} alt="Back" className={styles.backArrow} />
          <span className={styles.backText}>Back</span>
        </div>
        
        <div className={styles.headerContent}>
          <div className={styles.programImageContainer}>
            <Image 
              src={program_img} 
              alt="AI+ Executive Program" 
              className={styles.programImage}
            />
          </div>
          
          <div className={styles.programInfo}>
            <h1 className={styles.programTitle}>AI+ Executive</h1>
            
            <div className={styles.durationContainer}>
              <span className={styles.durationLabel}>Certification Duration:</span>
              <span className={styles.durationValue}>8 Hours</span>
            </div>
            
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                {isDescriptionExpanded ? fullDescription : truncatedDescription}
              </p>
              <div className={styles.readMoreContainer} onClick={toggleDescription}>
                <span className={styles.readMoreText}>
                  {isDescriptionExpanded ? "Read Less" : "Read More"}
                </span>
                <span className={`${styles.readMoreArrow} ${isDescriptionExpanded ? styles.rotated : ''}`}>
                  ›
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/certifications/aiCertification/checkout')}
              className={styles.buyNowButton}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Prerequisites Section */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Prerequisites</h2>
          <ul className={styles.bulletList}>
            {prerequisites.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modules Section */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Modules</h2>
          <ul className={styles.bulletList}>
            {modules.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Materials Section */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Materials</h2>
          <div className={styles.materialsContainer}>
            {materials.map((item, index) => (
              <span key={index} className={styles.materialItem}>• {item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* What will you learn? Section */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>What Will You Learn?</h2>
          <div className={styles.learningGrid}>
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className={styles.learningItem}>
                <h3 className={styles.learningTitle}>{outcome.title}</h3>
                <p className={styles.learningDescription}>{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools you'll master Section */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Tools You'll Master</h2>
          <div className={styles.toolsContainer}>
            {tools.map((tool, index) => (
              <div key={index} className={styles.toolItem}>
                <div className={styles.toolIconContainer}>
                  <Image src={tool.icon} alt={tool.name} className={styles.toolIcon} />
                </div>
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}