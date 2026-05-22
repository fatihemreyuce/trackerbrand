"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dashboard", label: "Dashboard", src: "/screenshots/dashboard.png" },
  { id: "kanban", label: "Kanban", src: "/screenshots/kanban.png" },
  { id: "sprint", label: "Sprint board", src: "/screenshots/sprint.png" },
  { id: "task-detail", label: "Görev detay", src: "/screenshots/task-detail.png" },
] as const;

export function Screenshots() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("dashboard");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">Gerçek arayüz</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-8 max-w-2xl">
        İlk bakışta ne göreceksin.
      </h2>

      <div role="tablist" className="inline-flex gap-1 p-1 rounded-lg bg-paper-soft border border-hairline mb-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs transition-colors",
              active === t.id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-paper-soft border border-hairline">
        <Image
          key={current.id}
          src={current.src}
          alt={`Tracker ${current.label} ekranı`}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          priority={current.id === "dashboard"}
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
