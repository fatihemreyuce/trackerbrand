"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/use-scrolled";

const links = [
  { href: "#pillars", label: "Özellikler" },
  { href: "#how", label: "Nasıl çalışır" },
  { href: "#faq", label: "SSS" },
];

export function Nav() {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 backdrop-blur transition-all duration-200 ease-out",
        scrolled || open
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
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn-sheen inline-flex items-center h-9 px-4 rounded-md bg-ink text-paper text-xs font-medium transition-all hover:bg-ink/90 hover:shadow-[0_0_24px_-6px_rgba(184,134,11,0.5)]"
          >
            Demo iste
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 -mr-1.5 rounded-md text-ink hover:bg-ink/5 transition-colors"
          >
            {open ? <X className="w-5 h-5" aria-hidden /> : <Menu className="w-5 h-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* mobile dropdown panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-hairline transition-[max-height,opacity] duration-200 ease-out",
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <div className="mx-auto max-w-12xl px-8 py-3 flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-ink-soft hover:text-ink transition-colors border-b border-hairline-soft last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
