"use client";

import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/use-scrolled";

export function Nav() {
  const scrolled = useScrolled(8);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 backdrop-blur transition-all duration-200 ease-out",
        scrolled
          ? "bg-paper-soft/95 border-b border-hairline shadow-soft"
          : "bg-paper-soft/70 border-b border-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-12xl px-8 flex items-center justify-between transition-all duration-200 ease-out",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <a href="#top" className="flex items-center gap-2 font-semibold text-sm text-ink group">
          <span
            aria-hidden
            className={cn(
              "w-2.5 h-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))] transition-shadow",
              scrolled && "shadow-[0_0_12px_rgba(184,134,11,0.6)]"
            )}
          />
          Tracker
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-ink-soft">
          <a href="#pillars" className="hover:text-ink transition-colors">
            Özellikler
          </a>
          <a href="#how" className="hover:text-ink transition-colors">
            Nasıl çalışır
          </a>
          <a href="#faq" className="hover:text-ink transition-colors">
            SSS
          </a>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center h-9 px-4 rounded-md bg-ink text-paper text-xs font-medium transition-all hover:bg-ink/90 hover:shadow-[0_0_24px_-6px_rgba(184,134,11,0.5)]"
        >
          Demo iste
        </a>
      </div>
    </nav>
  );
}
