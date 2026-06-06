import type { ReactNode } from "react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";
import { CountUp } from "@/components/ui/count-up";

type Stat = { num: ReactNode; unit?: string; label: string };

const stats: Stat[] = [
  { num: <>~<CountUp to={2} /></>, unit: "dk", label: "Kurulum süresi" },
  { num: <>3–15</>, label: "İdeal ekip boyutu" },
  { num: <CountUp to={1} />, unit: "uygulama", label: "0 ek modül" },
  {
    num: (
      <>
        <span className="text-ochre-deep">%</span>
        <CountUp to={100} duration={1100} />
      </>
    ),
    label: "Verin kendi sunucunda",
  },
];

export function ValueStrip() {
  return (
    <>
      <SectionDivider />
      <section className="mx-auto max-w-12xl px-8 py-16 md:py-20">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-hairline-soft bg-gradient-to-b from-paper-soft to-paper shadow-soft overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-5 py-8 text-center ${
                  i % 2 === 1 ? "border-l border-hairline-soft" : ""
                } ${i >= 2 ? "border-t border-hairline-soft md:border-t-0" : ""} ${
                  i >= 1 ? "md:border-l md:border-hairline-soft" : ""
                }`}
              >
                <div className="flex items-baseline justify-center gap-1 mb-2.5 leading-none">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-ink">
                    {s.num}
                  </span>
                  {s.unit && (
                    <span className="text-base md:text-lg font-semibold text-ochre-deep">
                      {s.unit}
                    </span>
                  )}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-mute font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
