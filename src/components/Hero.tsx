import { motion, useReducedMotion, type Variants } from "motion/react";
import { ExternalLink, ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.scss";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Motion variants with full support for prefers-reduced-motion
  const textGroupVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className={styles.heroSection}
      aria-label="Welcome screen"
    >
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Hierarchy: 1. Headline -> 2. Supporting Copy -> 3. Actions */}
          <motion.div
            className={styles.textContent}
            variants={textGroupVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Main Heading */}
            <motion.h1 variants={textItemVariants} className={styles.headline}>
              IEEE Computer Society
              <span className={styles.societySub}>
                Student Branch Chapter · Wayamba University of Sri Lanka
              </span>
            </motion.h1>

            {/* 2. Supporting Sentence */}
            <motion.p
              variants={textItemVariants}
              className={styles.supportingCopy}
            >
              Advancing Innovation Through Technology &amp; Engineering Excellence
            </motion.p>

            {/* 3. Actions (Primary: Join IEEE + Secondary: Explore Chapter) */}
            <motion.div variants={textItemVariants} className={styles.actions}>
              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
                aria-label="Join IEEE at ieee.org (opens in a new tab)"
              >
                <span>Join IEEE</span>
                <ExternalLink size={18} aria-hidden="true" />
              </a>

              <a
                href="#about"
                className={styles.secondaryBtn}
                aria-label="Explore chapter information"
              >
                <span>Explore Chapter</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>          
        </div>
      </div>

      {/* Auto-scroll trigger: Scroll Down */}
      <motion.button
        type="button"
        onClick={() => {
          const el = document.getElementById("events");
          if (el) {
            const navHeight = 70;
            const targetY =
              el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        }}
        className={styles.scrollDownBtn}
        aria-label="Scroll down to Activities section"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className={styles.scrollDownText}>SCROLL DOWN</span>
        <ChevronDown size={18} aria-hidden="true" />
      </motion.button>
    </section>
  );
};

export default Hero;
