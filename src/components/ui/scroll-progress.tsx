"use client";

import { useEffect, useState } from "react";

/**
 * Thin ochre→clay bar fixed at the very top that tracks scroll progress.
 * Sits above the sticky nav (z-60) and uses scaleX for cheap, jank-free updates.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-ochre),var(--color-clay))]"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
