"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero's ambient gradient orbs with subtle mouse parallax.
 * Two orbs drift in opposite directions for a sense of depth.
 * Disabled for coarse pointers (touch) and prefers-reduced-motion.
 */
export function HeroOrbs() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setOffset({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[820px] w-[820px] rounded-full blur-3xl opacity-20 md:opacity-25 bg-[radial-gradient(circle_at_center,var(--color-ochre)_0%,var(--color-clay)_55%,transparent_72%)] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${offset.x * 38}px, ${offset.y * 38}px, 0)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 hidden h-[420px] w-[420px] rounded-full blur-3xl opacity-15 md:block bg-[radial-gradient(circle_at_center,var(--color-clay)_0%,transparent_70%)] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${offset.x * -24}px, ${offset.y * -24}px, 0)` }}
      />
    </>
  );
}
