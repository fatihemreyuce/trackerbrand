import { Mail } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionDivider } from "@/components/ui/section-divider";

const faqs = [
  {
    q: "Self-hosted nasıl çalışıyor? Ne lazım?",
    a: "Node.js 20+ ve Postgres (Supabase'in self-host'u veya bağımsız). Docker compose ile veya doğrudan systemd'le çalışır. Run-book repo'da hazır.",
  },
  {
    q: "Verim güvende mi? Şifreleme, yedekleme?",
    a: "Veri kendi sunucunda. Postgres encryption-at-rest sunucu tarafında. Yedekleme stratejisi sana ait — pg_dump cron örneği dokümantasyonda var.",
  },
  {
    q: "Maksimum kaç kişi kullanabilir?",
    a: "Tasarım hedefi 3-15 kişilik ekipler. Teknik olarak 50 kişiye kadar test edildi. 100+ için ayrı bir konuşma yapmamız gerek.",
  },
  {
    q: "Mail bildirimleri nasıl yapılıyor?",
    a: "Gmail SMTP veya kendi SMTP sağlayıcın (SendGrid, Mailgun, vb.). Görev atama, sprint açılış/kapanış, standup ve stale digest için otomatik mail çıkar.",
  },
  {
    q: "Mevcut Trello/Jira'dan veri taşınabilir mi?",
    a: "CSV bulk import komutu mevcut. Trello/Jira'dan CSV export → Tracker import. Etiketler, atamalar, durumlar korunur.",
  },
];

export function Faq() {
  return (
    <>
      <SectionDivider />
      <section id="faq" className="mx-auto max-w-3xl px-8 py-20 md:py-24">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre" />
            Sık sorulanlar
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-ink mb-10 leading-[1.05]">
            Hemen aklına gelenler.
          </h2>
        </FadeUp>
        <FadeUp delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
        <FadeUp delay={150}>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft">
            Başka sorun mu var?
            <a
              href="mailto:info@collbrai.com"
              className="inline-flex items-center gap-1.5 font-medium text-ochre-deep hover:text-clay transition-colors underline decoration-ochre/40 hover:decoration-clay underline-offset-4"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden />
              info@collbrai.com
            </a>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
