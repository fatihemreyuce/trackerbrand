const problems = [
  "\"Bugün ne yapmam gerekiyordu?\" mailde, Slack'te, Trello'da kayıp.",
  "Sprint hedefi açık ama günlük fix'ler nereye düştüğünü kimse bilmiyor.",
  "Müdür: \"Ekibimde kim ne yapıyor, kimin yükü fazla?\" — cevap yok.",
];

export function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">
        Tanıdık geldi mi?
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-10 max-w-2xl">
        Küçük ekiplerde günlük kaos hep aynı.
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {problems.map((p, i) => (
          <div key={i} className="bg-paper-soft border-l-[3px] border-clay px-5 py-4 rounded-r-md">
            <p className="text-sm text-ink leading-relaxed">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
