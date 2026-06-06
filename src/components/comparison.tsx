import { Check } from "lucide-react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";

type Row = { label: string; tracker: string; jira: string; notion: string };

const rows: Row[] = [
  {
    label: "Kurulum",
    tracker: "2 dakikada, tek uygulama",
    jira: "Karmaşık, çok modül",
    notion: "Sıfırdan kendin kurarsın",
  },
  {
    label: "Günlük + sprint birlikte",
    tracker: "Tek arayüzde",
    jira: "Sprint güçlü, günlük dağınık",
    notion: "Şablon kurman gerekir",
  },
  {
    label: "Veri sahipliği",
    tracker: "Self-hosted, kendi sunucun",
    jira: "Bulut / lisans",
    notion: "Bulut",
  },
  {
    label: "Fiyat modeli",
    tracker: "Abonelik yok",
    jira: "Kişi başı / ay",
    notion: "Kişi başı / ay",
  },
  {
    label: "Kim için",
    tracker: "3–15 kişilik ekipler",
    jira: "Kurumsal ağırlıklı",
    notion: "Genel amaçlı",
  },
];

export function Comparison() {
  return (
    <>
      <SectionDivider />
      <section className="mx-auto max-w-12xl px-8 py-20 md:py-24">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            Nerede duruyor?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-ink mb-3 max-w-2xl leading-[1.05]">
            Jira&apos;nın ağırlığı, Notion&apos;un dağınıklığı yok.
          </h2>
          <p className="text-sm md:text-base text-ink-soft max-w-xl leading-relaxed mb-10">
            Hepsi iyi araçlar — ama küçük ekibin günlük + sprint ritmi için fazla ya da eksik.
            İşte fark:
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          {/* desktop: table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <colgroup>
                <col className="w-[28%]" />
                <col className="w-[24%]" />
                <col className="w-[24%]" />
                <col className="w-[24%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="p-4" />
                  <th className="rounded-t-xl bg-ochre-soft/45 p-4 align-bottom">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ochre-deep">
                      <span
                        aria-hidden
                        className="w-2 h-2 rounded-full bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))]"
                      />
                      Tracker
                    </span>
                  </th>
                  <th className="p-4 align-bottom text-sm font-semibold text-ink-mute">Jira</th>
                  <th className="p-4 align-bottom text-sm font-semibold text-ink-mute">Notion</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const last = i === rows.length - 1;
                  return (
                    <tr key={r.label} className="border-t border-hairline-soft">
                      <td className="p-4 text-sm font-medium text-ink align-top">{r.label}</td>
                      <td
                        className={`bg-ochre-soft/45 p-4 align-top ${last ? "rounded-b-xl" : ""}`}
                      >
                        <span className="flex items-start gap-1.5 text-sm font-medium text-ink">
                          <Check
                            className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ochre-deep"
                            aria-hidden
                          />
                          {r.tracker}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-ink-soft align-top">{r.jira}</td>
                      <td className="p-4 text-sm text-ink-soft align-top">{r.notion}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* mobile: stacked cards per criterion */}
          <div className="md:hidden space-y-3">
            {rows.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-hairline-soft bg-paper-soft p-4 shadow-soft"
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-ink-mute font-semibold mb-3">
                  {r.label}
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 rounded-lg bg-ochre-soft/45 px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 w-[60px] shrink-0 text-xs font-bold text-ochre-deep">
                      <span
                        aria-hidden
                        className="w-1.5 h-1.5 rounded-full bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))]"
                      />
                      Tracker
                    </span>
                    <span className="flex items-start gap-1 text-xs font-medium text-ink">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ochre-deep" aria-hidden />
                      {r.tracker}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 px-3">
                    <span className="w-[60px] shrink-0 text-xs font-semibold text-ink-mute">
                      Jira
                    </span>
                    <span className="text-xs text-ink-soft">{r.jira}</span>
                  </div>
                  <div className="flex items-start gap-2 px-3">
                    <span className="w-[60px] shrink-0 text-xs font-semibold text-ink-mute">
                      Notion
                    </span>
                    <span className="text-xs text-ink-soft">{r.notion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
