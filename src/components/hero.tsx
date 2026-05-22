import { Check } from "lucide-react";
import { HeroMock } from "@/components/hero-mock";
import { GradientOrb } from "@/components/ui/gradient-orb";

const trustItems = ["Self-hosted", "2 dakikada kuruluyor", "Kredi kartı yok"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient gradient orb */}
      <GradientOrb
        tone="warm"
        size="xl"
        className="-right-40 -top-40 opacity-20 md:opacity-25"
      />
      <GradientOrb
        tone="clay"
        size="md"
        drift={false}
        className="-left-32 top-40 opacity-15 hidden md:block"
      />

      <div className="relative mx-auto max-w-12xl px-8 pt-16 pb-24 md:pt-20 md:pb-28 grid gap-12 md:grid-cols-12 items-center">
        {/* text column */}
        <div className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-5 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            3–15 kişilik ekipler için
          </p>
          <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-bold leading-[0.96] tracking-[-0.04em] text-ink">
            Bugün ne yapacağını
            <br />
            <span className="relative inline-block">
              <span className="bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))] bg-clip-text text-transparent">
                tek bakışta
              </span>
              <svg
                aria-hidden
                className="absolute -bottom-2 left-0 w-full h-2.5"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q 50 1, 100 5 T 198 5"
                  fill="none"
                  stroke="url(#g1)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--color-ochre)" />
                    <stop offset="100%" stopColor="var(--color-clay)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            gör.
          </h1>
          <p className="mt-7 text-base md:text-lg text-ink-soft max-w-xl leading-relaxed">
            Jira&apos;nın karmaşası, Notion&apos;un dağınıklığı olmadan. Günlük fix + haftalık
            sprint tek arayüzde.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-ink text-paper text-sm font-semibold transition-all hover:shadow-[0_0_40px_-6px_rgba(184,134,11,0.6)] hover:-translate-y-0.5"
            >
              Demo iste
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#pillars"
              className="group inline-flex items-center gap-1 h-12 px-2 text-sm font-medium text-ink border-b border-ink/40 hover:border-ochre hover:text-ochre-deep transition-colors"
            >
              Özellikleri gör
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-mute">
            {trustItems.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-ochre" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* mock column */}
        <div className="md:col-span-5 relative">
          <HeroMock />
        </div>
      </div>
    </section>
  );
}
