import React, { useRef, useState, useEffect, useCallback } from "react";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EVENT_DATA, type EventItem } from "./eventData";
import EventCard from "./EventCard";
import styles from "./EventGallery.module.scss";

export const EventGallery: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [isDraggingState, setIsDraggingState] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  // Check scroll boundary to update previous / next button disabled states
  const updateScrollBounds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    // Allow small 4px margin of error for fractional pixel precision
    setCanScrollPrev(scrollLeft > 6);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollBounds();
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      updateScrollBounds();
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollBounds);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollBounds);
    };
  }, [updateScrollBounds]);

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - track.offsetLeft;
    scrollLeftRef.current = track.scrollLeft;
    setIsDraggingState(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const x = e.pageX - track.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;

    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }

    track.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDraggingState(false);
  };

  // Button Click Scroll Handlers
  const handleScrollClick = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    // Scroll by roughly 1-2 card widths depending on viewport
    const scrollOffset = track.clientWidth > 800 ? 410 * 2 : 360;
    const targetScroll =
      direction === "next"
        ? track.scrollLeft + scrollOffset
        : track.scrollLeft - scrollOffset;

    track.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handleCardClick = (event: EventItem) => {
    // If the user was dragging the gallery, suppress the navigation click
    if (hasDraggedRef.current) return;
    if (event.link) {
      window.location.href = event.link;
    }
  };

  // Motion Variants
  const headerVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const trackVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardItemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section
      id="events"
      className={styles.gallerySection}
      aria-label="Ideas in Action - Event Gallery"
    >
      <div className={styles.container}>
        {/* 3. Editorial Section Header */}
        <motion.div
          className={styles.headerRow}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className={styles.headingWrapper}>
            <h2 className={styles.title}>
              <span className={styles.titleLine}>Ideas in</span>
              <span className={styles.titleLine}>
                action<span className={styles.accentDot}>.</span>
              </span>
            </h2>
          </div>

          <a
            href="/events"
            className={styles.archiveLink}
            aria-label="Explore all event archives"
          >
            <span>Explore archive</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </motion.div>          

        <div className={styles.cardsTrackContainer}>
          <motion.div
            ref={trackRef}
            className={`${styles.cardsTrack} ${
              isDraggingState ? styles.isDragging : ""
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            variants={trackVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            tabIndex={0}
            role="region"
            aria-label="Scrollable horizontal event showcase"
          >
            {EVENT_DATA.map((event) => (
              <motion.div
                key={event.id}
                className={styles.cardItemWrapper}
                variants={cardItemVariants}
              >
                <EventCard event={event} onClick={handleCardClick} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 4. Gallery Controls */}

        <div className={styles.controlsRow}>
          <div className={styles.buttonGroup}>
            <IconButton
              size="small"
              onClick={() => handleScrollClick("prev")}
              disabled={!canScrollPrev}
              aria-label="Scroll to previous events"
              className={styles.navArrowBtn}
            >
              <ChevronLeft size={20} />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => handleScrollClick("next")}
              disabled={!canScrollNext}
              aria-label="Scroll to next events"
              className={styles.navArrowBtn}
            >
              <ChevronRight size={20} />
            </IconButton>
          </div>
        </div>

        {/* 5 & 6. Horizontal Editorial Cards Track */}
      </div>
    </section>
  );
};

export default EventGallery;
