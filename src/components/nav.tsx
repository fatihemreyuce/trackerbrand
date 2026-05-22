export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-paper-soft/95 backdrop-blur border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold text-sm text-ink">
          <span className="w-2 h-2 rounded-full bg-ochre" aria-hidden />
          Tracker
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-ink-soft">
          <a href="#pillars" className="hover:text-ink transition-colors">Özellikler</a>
          <a href="#how" className="hover:text-ink transition-colors">Nasıl çalışır</a>
          <a href="#faq" className="hover:text-ink transition-colors">SSS</a>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center h-8 px-3 rounded-md bg-ink text-paper text-xs font-medium hover:bg-ink/90"
        >
          Demo iste
        </a>
      </div>
    </nav>
  );
}
