export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-4">
        3–15 kişilik ekipler için
      </p>
      <h1 className="text-5xl md:text-7xl font-bold leading-[0.98] tracking-[-0.035em] text-ink max-w-3xl">
        Bugün ne yapacağını
        <br />
        <span className="text-ochre">tek bakışta</span> gör.
      </h1>
      <p className="mt-6 text-base md:text-lg text-ink-soft max-w-xl leading-relaxed">
        Jira&apos;nın karmaşası, Notion&apos;un dağınıklığı olmadan. Günlük fix + haftalık sprint tek arayüzde.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center h-11 px-5 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink/90"
        >
          Demo iste →
        </a>
        <a href="#pillars" className="inline-flex items-center h-11 px-2 text-sm text-ink border-b border-ink">
          Özellikleri gör
        </a>
      </div>
      <p className="mt-6 text-xs text-ink-mute">Self-hosted · 2 dakikada kuruluyor</p>
    </section>
  );
}
