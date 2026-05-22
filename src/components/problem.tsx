import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";

const problems = [
  "\"Bugün ne yapmam gerekiyordu?\" mailde, Slack'te, Trello'da kayıp.",
  "Sprint hedefi açık ama günlük fix'ler nereye düştüğünü kimse bilmiyor.",
  "Müdür: \"Ekibimde kim ne yapıyor, kimin yükü fazla?\" — cevap yok.",
];

export function Problem() {
  return (
    <>
      <SectionDivider />
      <section className="mx-auto max-w-12xl px-8 py-20 md:py-24">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            Tanıdık geldi mi?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-ink mb-12 max-w-2xl leading-[1.05]">
            Küçük ekiplerde günlük kaos hep aynı.
          </h2>
        </FadeUp>
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="group relative overflow-hidden bg-paper-soft border border-hairline-soft border-l-[3px] border-l-clay rounded-r-lg px-5 py-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-soft hover:border-l-[4px]">
                {/* clay glow corner */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[radial-gradient(circle,var(--color-clay)_0%,transparent_70%)] opacity-10 group-hover:opacity-20 transition-opacity"
                />
                <p className="relative text-sm text-ink leading-relaxed">{p}</p>
                <ArrowUpRight
                  aria-hidden
                  className="absolute bottom-3 right-3 w-3.5 h-3.5 text-ink-mute opacity-30 group-hover:opacity-70 group-hover:text-clay transition-all"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
