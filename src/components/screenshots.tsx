"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";
import { GradientOrb } from "@/components/ui/gradient-orb";
import {
  DashboardMock,
  KanbanMock,
  SprintMock,
  TaskDetailMock,
} from "@/components/screens-mock";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    Mock: DashboardMock,
    blurb: "Tüm ekibin günlük görevleri, deadline'lar ve durumlar — tek ekranda.",
  },
  {
    id: "kanban",
    label: "Kanban",
    Mock: KanbanMock,
    blurb: "Drag-drop kolon yönetimi, etiket filtreleme ve kapasite görünümü.",
  },
  {
    id: "sprint",
    label: "Sprint board",
    Mock: SprintMock,
    blurb: "Sprint açıl-kapanış, hedef tracking, burndown — tek tıkla.",
  },
  {
    id: "task-detail",
    label: "Görev detay",
    Mock: TaskDetailMock,
    blurb: "Bağlantı, alt görev, yorum ve aktivite — context kaybı yok.",
  },
] as const;

export function Screenshots() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("dashboard");
  const current = tabs.find((t) => t.id === active)!;
  const Mock = current.Mock;

  return (
    <>
      <SectionDivider />
      <section className="relative mx-auto max-w-12xl px-8 py-20 md:py-24 overflow-visible">
        <GradientOrb
          tone="clay"
          size="md"
          className="-left-32 top-1/2 opacity-10 hidden md:block"
        />
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            Gerçek arayüz
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-ink mb-8 max-w-2xl leading-[1.05]">
            İlk bakışta ne göreceksin.
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <div
            role="tablist"
            className="inline-flex gap-1 p-1 rounded-lg bg-ink/5 ring-1 ring-hairline shadow-[inset_0_1px_2px_rgba(26,24,20,0.04)] mb-6"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ease-out",
                  active === t.id
                    ? "bg-ink text-paper shadow-[0_0_24px_-6px_rgba(184,134,11,0.5)]"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="relative">
            {/* outer frame with browser dots */}
            <div className="relative rounded-2xl bg-gradient-to-b from-paper-soft to-paper p-2 shadow-lift border border-hairline">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-clay/60" aria-hidden />
                <span className="w-2.5 h-2.5 rounded-full bg-ochre/70" aria-hidden />
                <span className="w-2.5 h-2.5 rounded-full bg-ink/15" aria-hidden />
                <span className="ml-3 text-[10px] text-ink-mute font-medium tabular-nums">
                  tracker.collbrai.com/{current.id}
                </span>
              </div>
              <div
                key={current.id}
                className="relative aspect-video animate-[tab-fade_0.25s_ease-out]"
              >
                <Mock />
              </div>
            </div>
            <span
              aria-hidden
              className="block mx-auto mt-1 h-px w-2/3 bg-gradient-to-r from-transparent via-ochre/40 to-transparent"
            />
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <p className="mt-5 text-sm text-ink-soft text-center max-w-2xl mx-auto leading-relaxed">
            {current.blurb}
          </p>
        </FadeUp>
      </section>
    </>
  );
}
