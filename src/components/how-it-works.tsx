import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";

const steps = [
  { n: 1, title: "Kur", body: "Sunucuna Docker'la veya systemd ile. Run-book hazır." },
  { n: 2, title: "Ekibini davet et", body: "Admin login + in-app davet veya CSV bulk import." },
  { n: 3, title: "İlk sprint'i aç", body: "Görevler, kanban, mail bildirimleri ilk günden çalışıyor." },
];

export function HowItWorks() {
  return (
    <>
      <SectionDivider />
      <section id="how" className="mx-auto max-w-12xl px-8 py-20 md:py-24">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            3 adım
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-ink mb-12 max-w-2xl leading-[1.05]">
            Bir öğleden sonrada hazır.
          </h2>
        </FadeUp>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* dashed connector — desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute top-5 left-[16%] right-[16%] h-px border-t border-dashed border-ochre/30 -z-0"
          />
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 120}>
              <div className="group relative rounded-xl border border-hairline-soft bg-paper-soft/70 backdrop-blur-sm p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift hover:border-ochre/30">
                <div className="relative mb-4 inline-flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-ochre/40 bg-paper text-ochre-deep font-bold text-sm transition-all duration-200 group-hover:bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))] group-hover:text-paper group-hover:ring-ochre group-hover:shadow-[0_0_24px_-4px_rgba(184,134,11,0.6)]">
                  {s.n}
                </div>
                <h3 className="text-sm font-semibold text-ink mb-1.5 tracking-tight">{s.title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{s.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
