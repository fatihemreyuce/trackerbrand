import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">Sık sorulanlar</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-8">
        Hemen aklına gelenler.
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
