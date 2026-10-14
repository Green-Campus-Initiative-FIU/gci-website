"use client";

import { useEffect } from "react";

// Calls onProgress(rect) on every animation frame while the page scrolls.
// Skipped entirely for visitors who prefer reduced motion.
export function useScrollFrame(ref, onFrame) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (ref.current) onFrame(ref.current.getBoundingClientRect());
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
    // onFrame is defined inline by callers and only touches refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export const clamp = (v) => Math.max(0, Math.min(1, v));
