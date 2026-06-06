import type { CSSProperties } from "react";
import { Check, Circle, CircleDot, Sparkles } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

const tasks = [
  {
    icon: CircleDot,
    iconClass: "text-clay",
    title: "Auth flow düzeltmesi",
    meta: "2 saat · @sen",
    badge: "P1",
    badgeClass: "bg-clay-soft text-clay",
  },
  {
    icon: Circle,
    iconClass: "text-ink-mute",
    title: "Sprint planning toplantısı",
    meta: "14:00 · 30 dk",
    badge: "TOPLANTI",
    badgeClass: "bg-paper-deeper text-ink-soft",
  },
  {
    icon: CircleDot,
    iconClass: "text-ochre",
    title: "PR review: dashboard kanban",
    meta: "@ali bekliyor",
    badge: null,
    badgeClass: "",
  },
];

export function HeroMock() {
  return (
    <div className="relative md:rotate-[1.2deg] md:-translate-y-2 origin-top-left">
      {/* tilted container */}
      <div className="relative rounded-2xl border border-hairline bg-paper-soft shadow-lift overflow-hidden">
        {/* faux app nav */}
        <div className="flex items-center justify-between border-b border-hairline-soft px-4 py-3 bg-paper-soft/80">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="w-2 h-2 rounded-full bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))] shadow-[0_0_8px_rgba(184,134,11,.6)]"
            />
            <span className="text-[11px] font-semibold text-ink tracking-tight">Tracker</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-paper-deeper p-0.5">
            <span className="rounded-[5px] bg-ink px-2.5 py-1 text-[10px] font-medium text-paper">
              Bugün
            </span>
            <span className="px-2.5 py-1 text-[10px] text-ink-soft">Sprint</span>
            <span className="px-2.5 py-1 text-[10px] text-ink-soft">Kanban</span>
          </div>
        </div>

        {/* body */}
        <div className="p-5">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-semibold">
                Salı, 14 Mart
              </p>
              <h4 className="text-base font-semibold text-ink tracking-tight">Merhaba Fatih 👋</h4>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ochre-deep bg-ochre-soft px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" aria-hidden />
              <CountUp to={3} /> görev
            </span>
          </div>

          <div className="space-y-1.5">
            {tasks.map((t, i) => (
              <div
                key={t.title}
                style={{ animationDelay: `${200 + i * 110}ms` }}
                className="flex items-center gap-3 rounded-md border border-hairline-soft bg-paper px-3 py-2.5 group animate-[fade-up_0.5s_ease-out_both] motion-reduce:animate-none"
              >
                <t.icon
                  className={`w-4 h-4 shrink-0 ${t.iconClass} ${i === 0 ? "animate-[pulse-soft_2.5s_ease-in-out_infinite]" : ""}`}
                  aria-hidden
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ink truncate">{t.title}</p>
                  <p className="text-[10px] text-ink-mute">{t.meta}</p>
                </div>
                {t.badge && (
                  <span
                    className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded ${t.badgeClass}`}
                  >
                    {t.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* sprint */}
          <div className="mt-5 rounded-md bg-paper-deeper/60 px-3 py-2.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-ink tracking-tight">
                Sprint #12 · 4 gün kaldı
              </p>
              <p className="text-[10px] text-ink-mute tabular-nums">17/25 görev</p>
            </div>
            <div className="h-1.5 rounded-full bg-paper overflow-hidden">
              <div
                className="h-full w-[68%] rounded-full bg-[linear-gradient(90deg,var(--color-ochre),var(--color-clay))] animate-[bar-grow_1.1s_ease-out_350ms_both] motion-reduce:animate-none"
                style={{ "--bar-target": "68%" } as CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>

      {/* corner badge — bottom-right, outside overflow-hidden so it isn't clipped */}
      <div className="absolute -right-2 -bottom-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ink text-paper text-[10px] font-semibold shadow-soft">
        <Check className="w-3 h-3 text-ochre-dark" aria-hidden />
        Bugün hazır
      </div>
    </div>
  );
}
