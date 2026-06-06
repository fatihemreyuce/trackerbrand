"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `to` with an ease-out curve, starting when the element
 * first enters the viewport (or immediately if already visible at mount).
 * Honors prefers-reduced-motion by jumping straight to the final value.
 */
export function CountUp({
  to,
  duration = 750,
  delay = 250,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : duration;
    const startDelay = reduce ? 0 : delay;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        const t = dur === 0 ? 1 : Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      timer = setTimeout(() => {
        raf = requestAnimationFrame(tick);
      }, startDelay);
    };

    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run();
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
      };
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}
