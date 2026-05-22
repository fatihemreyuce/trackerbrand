import { Focus, Columns3, Server, Users } from "lucide-react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";

const pillars = [
  {
    icon: Focus,
    title: "Günlük odak",
    body: "Sabah aç, bugünkü görevini gör. Standup, bildirim, fix listesi tek yerde.",
  },
  {
    icon: Columns3,
    title: "Sprint takip",
    body: "Kanban + dense tablo + kapasite. Sprint açıl-kapanışı tek tık.",
  },
  {
    icon: Server,
    title: "Self-hosted",
    body: "Verin senin sunucunda. Subscription yok, bulut kilidi yok.",
  },
  {
    icon: Users,
    title: "3 rol, tek workspace",
    body: "Yönetici/Müdür/Üye. Bir uygulama, ek modül kurma yok.",
  },
];

export function Pillars() {
  return (
    <>
      <SectionDivider />
      <section id="pillars" className="mx-auto max-w-12xl px-8 py-20 md:py-24">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            Tracker farkı
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-ink mb-12 max-w-2xl leading-[1.05]">
            4 net değer. Daha fazlası değil.
          </h2>
        </FadeUp>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <FadeUp key={title} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-hairline-soft bg-gradient-to-b from-paper-soft to-paper p-5 shadow-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift hover:border-ochre/40">
                <div className="relative mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-ochre-soft ring-1 ring-ochre/20 text-ochre-deep shadow-[inset_0_-2px_4px_rgba(184,134,11,0.08)] transition-transform duration-200 ease-out group-hover:-rotate-3 group-hover:scale-105">
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold text-ink mb-1.5 tracking-tight">{title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed mb-4">{body}</p>
                {/* identity micro-line */}
                <span
                  aria-hidden
                  className="absolute bottom-4 left-5 h-px w-8 bg-gradient-to-r from-ochre to-transparent transition-all duration-200 group-hover:w-14"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
