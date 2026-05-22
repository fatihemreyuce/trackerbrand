const steps = [
  { n: 1, title: "Kur", body: "Sunucuna Docker'la veya systemd ile. Run-book hazır." },
  { n: 2, title: "Ekibini davet et", body: "Admin login + in-app davet veya CSV bulk import." },
  { n: 3, title: "İlk sprint'i aç", body: "Görevler, kanban, mail bildirimleri ilk günden çalışıyor." },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">3 adım</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-10 max-w-2xl">
        Bir öğleden sonrada hazır.
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="bg-paper-soft rounded-lg p-5 border border-hairline">
            <div className="w-7 h-7 rounded-full bg-ochre text-paper grid place-items-center text-xs font-bold mb-3">
              {s.n}
            </div>
            <h3 className="text-sm font-semibold text-ink mb-1">{s.title}</h3>
            <p className="text-xs text-ink-soft leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
