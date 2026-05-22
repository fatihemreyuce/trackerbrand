import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-paper-deeper border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr] mb-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-ink mb-2">
              <span className="w-2 h-2 rounded-full bg-ochre" aria-hidden />
              Tracker
            </div>
            <p className="text-xs text-ink-soft leading-relaxed max-w-xs mb-4">
              3-15 kişilik ekipler için günlük fix + haftalık sprint takibi. Self-hosted, Türkçe.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="GitHub" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="X" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:info@collbrai.com" aria-label="Email" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[11px] uppercase tracking-[0.12em] text-ink font-semibold mb-3">Ürün</h5>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li><a href="#pillars" className="hover:text-ink">Özellikler</a></li>
              <li><a href="#how" className="hover:text-ink">Nasıl çalışır</a></li>
              <li><a href="#" className="hover:text-ink">Self-hosted kurulum</a></li>
              <li><a href="#" className="hover:text-ink">Sürüm notları</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] uppercase tracking-[0.12em] text-ink font-semibold mb-3">İletişim</h5>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li><a href="#contact" className="hover:text-ink">Demo iste</a></li>
              <li><a href="mailto:info@collbrai.com" className="hover:text-ink">info@collbrai.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-hairline text-xs text-ink-mute">
          © 2026 Tracker · Türkiye&apos;de yapıldı
        </div>
      </div>
    </footer>
  );
}
