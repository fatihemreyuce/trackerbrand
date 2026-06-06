"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Renders children visible by default (no JS = no hidden content).
 * When JS is available AND the element enters viewport for the first time,
 * a fade-up animation plays. Items already in viewport at mount get the
 * animation immediately with the requested delay.
 */
export function FadeUp({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const inViewportNow = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewportNow) {
      setShouldAnimate(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={shouldAnimate && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        shouldAnimate && "animate-[fade-up_0.6s_ease-out_both]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
