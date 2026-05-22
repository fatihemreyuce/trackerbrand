import { Focus, Columns3, Server, Users } from "lucide-react";

const pillars = [
  { icon: Focus, title: "Günlük odak", body: "Sabah aç, bugünkü görevini gör. Standup, bildirim, fix listesi tek yerde." },
  { icon: Columns3, title: "Sprint takip", body: "Kanban + dense tablo + kapasite. Sprint açıl-kapanışı tek tık." },
  { icon: Server, title: "Self-hosted", body: "Verin senin sunucunda. Subscription yok, bulut kilidi yok." },
  { icon: Users, title: "3 rol, tek workspace", body: "Yönetici/Müdür/Üye. Bir uygulama, ek modül kurma yok." },
];

export function Pillars() {
  return (
    <section id="pillars" className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">
        Tracker farkı
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-10 max-w-2xl">
        4 net değer. Daha fazlası değil.
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-paper-soft border border-hairline rounded-lg p-5">
            <div className="w-8 h-8 rounded-md bg-ochre-soft text-ochre-deep grid place-items-center mb-3">
              <Icon className="w-4 h-4" aria-hidden />
            </div>
            <h3 className="text-sm font-semibold text-ink mb-1">{title}</h3>
            <p className="text-xs text-ink-soft leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
