import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const social = [
  { href: "#", label: "GitHub", Icon: Github },
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "X", Icon: Twitter },
  { href: "mailto:info@collbrai.com", label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative bg-paper-deeper border-t border-hairline">
      <div className="mx-auto max-w-12xl px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] mb-10">
          <div>
            <div className="flex items-center gap-2 font-semibold text-ink mb-3">
              <span
                aria-hidden
                className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))] shadow-[0_0_10px_rgba(184,134,11,0.5)]"
              />
              Tracker
            </div>
            <p className="text-xs text-ink-soft leading-relaxed max-w-xs mb-5">
              3-15 kişilik ekipler için günlük fix + haftalık sprint takibi. Self-hosted, Türkçe.
            </p>
            <div className="flex gap-2">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group w-9 h-9 grid place-items-center rounded-lg bg-paper-soft/60 backdrop-blur-sm border border-hairline text-ink-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-ochre-deep hover:border-ochre/40 hover:shadow-[0_0_20px_-6px_rgba(184,134,11,0.5)]"
                >
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[11px] uppercase tracking-[0.14em] text-ink font-semibold mb-3">
              Ürün
            </h5>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li>
                <a href="#pillars" className="hover:text-ochre-deep transition-colors">
                  Özellikler
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-ochre-deep transition-colors">
                  Nasıl çalışır
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ochre-deep transition-colors">
                  Self-hosted kurulum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ochre-deep transition-colors">
                  Sürüm notları
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] uppercase tracking-[0.14em] text-ink font-semibold mb-3">
              İletişim
            </h5>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li>
                <a href="#contact" className="hover:text-ochre-deep transition-colors">
                  Demo iste
                </a>
              </li>
              <li>
                <a href="mailto:info@collbrai.com" className="hover:text-ochre-deep transition-colors">
                  info@collbrai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* gradient hairline */}
        <div
          aria-hidden
          className="mx-auto h-px w-3/5 bg-gradient-to-r from-transparent via-ochre/40 to-transparent mb-5"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-mute">
          <span className="inline-flex items-center gap-2">
            © 2026 Tracker
            <span aria-hidden className="w-1 h-1 rounded-full bg-ochre/60" />
            Türkiye&apos;de yapıldı
          </span>
          <span className="tabular-nums">v0.1</span>
        </div>
      </div>
    </footer>
  );
}
