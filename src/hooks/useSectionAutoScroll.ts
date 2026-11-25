import { useEffect, useRef } from "react";

interface AutoScrollOptions {
  navHeight?: number;
  lockDuration?: number;
  wheelThreshold?: number;
  touchThreshold?: number;
}

export const useSectionAutoScroll = (
  sectionIds: string[],
  options: AutoScrollOptions = {}
) => {
  const {
    navHeight = 70,
    lockDuration = 800,
    wheelThreshold = 20,
    touchThreshold = 45,
  } = options;

  const isLockedRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);

  useEffect(() => {
    // Calculate top offset for each target section
    const getPositions = (): number[] => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScrollY = Math.max(0, docHeight - winHeight);

      const activeNavHeight = window.innerWidth <= 600 ? 60 : navHeight;

      return sectionIds.map((id, index) => {
        if (index === 0) return 0;
        const el = document.getElementById(id);
        if (!el) return 0;

        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY - activeNavHeight;
        return Math.min(Math.max(0, top), maxScrollY);
      });
    };

    // Determine current section index based on scroll position
    const getCurrentIndex = (positions: number[]): number => {
      const scrollY = window.scrollY;
      let closestIdx = 0;
      let minDiff = Infinity;

      for (let i = 0; i < positions.length; i++) {
        const diff = Math.abs(scrollY - positions[i]);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }
      return closestIdx;
    };

    const scrollToSectionIndex = (targetIndex: number) => {
      const positions = getPositions();
      const clampedIndex = Math.max(0, Math.min(positions.length - 1, targetIndex));
      const targetY = positions[clampedIndex];

      isLockedRef.current = true;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });

      const releaseLock = () => {
        isLockedRef.current = false;
        window.removeEventListener("scrollend", releaseLock);
      };

      window.addEventListener("scrollend", releaseLock, { once: true });
      setTimeout(releaseLock, lockDuration);
    };

    // Wheel event handler: detects scroll direction and smoothly scrolls to next/previous section
    const handleWheel = (e: WheelEvent) => {
      // If currently animating or locked, absorb events to prevent jumpy queues
      if (isLockedRef.current) {
        e.preventDefault();
        return;
      }

      // If user is scrolling horizontally (e.g. inside EventGallery cards track), don't hijack
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      // Check if event occurred inside an active scrollable container that is handling vertical scroll
      const target = e.target as HTMLElement | null;
      if (target) {
        const scrollable = target.closest("[data-scrollable='true']");
        if (scrollable) return;
      }

      // Ignore micro-gestures
      if (Math.abs(e.deltaY) < wheelThreshold) {
        return;
      }

      e.preventDefault();

      const positions = getPositions();
      const currentIndex = getCurrentIndex(positions);
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIndex = currentIndex + direction;

      if (
        targetIndex >= 0 &&
        targetIndex < positions.length &&
        targetIndex !== currentIndex
      ) {
        scrollToSectionIndex(targetIndex);
      }
    };

    // Touch event handlers for mobile gesture navigation
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLockedRef.current || e.changedTouches.length !== 1) return;

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;

      // If primarily horizontal swipe (e.g. browsing gallery cards), let native/component handling proceed
      if (Math.abs(deltaX) > Math.abs(deltaY) || Math.abs(deltaY) < touchThreshold) {
        return;
      }

      const positions = getPositions();
      const currentIndex = getCurrentIndex(positions);
      const direction = deltaY > 0 ? 1 : -1;
      const targetIndex = currentIndex + direction;

      if (
        targetIndex >= 0 &&
        targetIndex < positions.length &&
        targetIndex !== currentIndex
      ) {
        scrollToSectionIndex(targetIndex);
      }
    };

    // Keyboard navigation handlers (ArrowDown, ArrowUp, PageDown, PageUp)
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          (active as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        const positions = getPositions();
        const currentIndex = getCurrentIndex(positions);
        if (currentIndex < positions.length - 1) {
          scrollToSectionIndex(currentIndex + 1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        const positions = getPositions();
        const currentIndex = getCurrentIndex(positions);
        if (currentIndex > 0) {
          scrollToSectionIndex(currentIndex - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sectionIds, navHeight, lockDuration, wheelThreshold, touchThreshold]);
};

export default useSectionAutoScroll;
