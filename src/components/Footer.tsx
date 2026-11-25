import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { Facebook, Instagram, Linkedin } from "lucide-brands";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <motion.footer
      id="footer"
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="Site footer and contact information"
    >
      <div className={styles.container}>
        {/* Center Content: Brand, Mission, Quick Links, Socials */}
        <div className={styles.centerContent}>
          <div className={styles.brandEyebrow}>
            <span>GET IN TOUCH · WUSL CHAPTER</span>
          </div>

          <h2 className={styles.brandTitle}>
            Let&apos;s Build the Future Together.
          </h2>

          <p className={styles.brandSub}>
            IEEE Computer Society Student Branch Chapter · Wayamba University of
            Sri Lanka. Faculty of Applied Sciences, Kuliyapitiya.
          </p>

          {/* Quick Navigation Links */}
          <nav className={styles.links} aria-label="Footer quick links">
            <motion.a href="/" whileHover={{ y: -2 }}>
              Home
            </motion.a>
            <motion.a href="/about" whileHover={{ y: -2 }}>
              About
            </motion.a>
            <motion.a href="/events" whileHover={{ y: -2 }}>
              Events
            </motion.a>
            <motion.a href="/team" whileHover={{ y: -2 }}>
              Team
            </motion.a>
            <motion.a href="/projects" whileHover={{ y: -2 }}>
              Projects
            </motion.a>
            <motion.a href="/news" whileHover={{ y: -2 }}>
              News
            </motion.a>
          </nav>

          {/* Social Channels & Contact */}
          <div className={styles.socials}>
            <motion.a
              href="mailto:ieeecs@wyb.ac.lk"
              aria-label="Email IEEE CS WUSL"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <Mail />
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Facebook"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <Facebook />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Instagram"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <Instagram />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <Linkedin />
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar: Copyright Notice */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2025 IEEE Computer Society Wayamba University of Sri Lanka.
            All rights reserved.
          </p>
          <p className={styles.copyrightSub}>
            Advancing technology for humanity with passion and excellence.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
