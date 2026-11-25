import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Code, Users, Globe, ArrowRight } from "lucide-react";
import styles from "./AboutSection.module.scss";

const pillars = [
  {
    icon: Code,
    title: "Technical Excellence",
    text: "Hands-on workshops, hackathons, and algorithmic challenges to build production-grade skills.",
  },
  {
    icon: Users,
    title: "Collaborative Community",
    text: "Inclusive peer learning, industry mentorship, and active student branch initiatives.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    text: "Direct pathways to international IEEE symposiums, coding leagues, and worldwide chapters.",
  },
];

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className={styles.aboutSection}
      aria-label="About IEEE Computer Society WUSL"
    >
      <div className={styles.container}>
        <motion.div
          className={styles.contentWrapper}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>ABOUT US · IEEE CS WUSL</span>
          </div>

          {/* Heading */}
          <h2 className={styles.title}>
            Bridging Passion with Technology.
          </h2>

          {/* Descriptive Copy */}
          <p className={styles.description}>
            The IEEE Computer Society Student Branch Chapter at Wayamba University
            of Sri Lanka is dedicated to advancing technical excellence, innovation,
            and professional leadership in computing and engineering.
          </p>

          {/* 3 Pillars Grid */}
          <div className={styles.pillarsGrid}>
            {pillars.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className={styles.pillarCard}>
                  <div className={styles.pillarHeader}>
                    <div className={styles.pillarIconWrapper}>
                      <IconComp size={18} />
                    </div>
                    <h3 className={styles.pillarTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.pillarText}>{item.text}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Link */}
          <div className={styles.ctaWrapper}>
            <a href="/about" className={styles.ctaBtn}>
              <span>Discover Our Story</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
