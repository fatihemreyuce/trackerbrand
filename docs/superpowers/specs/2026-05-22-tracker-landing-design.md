# Tracker Landing — Design Spec

**Tarih:** 2026-05-22
**Hedef:** Tracker ürününü dışarıdaki ekip/şirketlere tanıtan tek-sayfa marketing landing'i.
**Konum:** `C:\Users\fatih\OneDrive\Masaüstü\tracker-landing\` (Tracker codebase'inden ayrı bağımsız proje)

---

## 1. Amaç

Tracker'ı 3-15 kişilik ekiplere sahip şirketlerin yöneticilerine tanıtan, "Demo iste" akışıyla lead toplayan tek bir landing page. Hedef: ziyaretçinin sayfa altındaki form'u doldurması ya da `info@collbrai.com` adresine yazması.

### Hedef olmayan (Non-goals)

- Pricing/billing sayfası
- Müşteri alıntıları/case study (henüz müşteri yok)
- Dark mode toggle (sayfa sadece light mode; Tracker'ın iç dark mode'u landing'e taşınmayacak)
- Multi-page site, blog, dokümantasyon
- I18n (sayfa sadece Türkçe; İngilizce versiyon kapsam dışı)
- A/B test framework
- Analytics dashboard

---

## 2. Konumlandırma

**Tek cümle:** _"Jira'nın karmaşası olmadan, küçük ekipler için günlük + sprint görev takibi."_

**Hero başlığı:** `Bugün ne yapacağını [tek bakışta] gör.` ("tek bakışta" ochre vurgu)

**Hedef kitle:** 3-15 kişilik ekipleri olan KOBİ/startup yöneticileri, müdürler. Tracker'ın iç değer önerisinin doğal hedefi.

**Ses tonu:** Düz, kendinden emin, üst-perdeden olmayan. Boş slogan ya da "AI-powered" gibi içi boş tabirler kullanılmaz.

---

## 3. Tech Stack

| Katman | Seçim | Gerekçe |
|---|---|---|
| Framework | Next.js 16.2.6 (App Router) | Tracker ile birebir versiyon — öğrenme eğrisi yok |
| Dil | TypeScript strict | Tracker konvansiyonu |
| Styling | Tailwind v4 | Tracker ile birebir |
| Component | shadcn (base-ui sürümü) | Tracker ile birebir |
| Font | Poppins (next/font) | Tracker ile birebir |
| Form backend | Server Action + Nodemailer + Gmail SMTP | Tracker'da hâli hazırda kanıtlanmış stack |
| Hosting | Vercel (öneri) ya da Tracker self-host sunucusu | İkisi de çalışır; Vercel daha kolay |

**Bağımlılıklar (package.json):**
- runtime: `next`, `react`, `react-dom`, `zod`, `nodemailer`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`
- dev: `typescript`, `@types/node`, `@types/react`, `@types/nodemailer`, `tailwindcss@4`, `@tailwindcss/postcss`, `postcss`, `eslint`, `eslint-config-next`, `prettier`, `vitest`

Test ekipmanı (Playwright E2E vb.) bu projede yok. Sadece Vitest smoke testleri.

---

## 4. Tasarım Token'ları

Tracker'ın Warm Modernist v2 token'larından **light mode**'u birebir kopya. Dark mode token'ları sayfa scope'una dahil edilmez (kullanılmıyor).

```css
/* tailwind.config — @theme inline (Tailwind v4) */
--paper:        #faf7f2  /* body bg */
--paper-soft:   #fdfbf6  /* card bg, top nav */
--paper-deeper: #f3ede0  /* footer bg */
--ink:          #1a1814  /* primary text, dark CTA */
--ink-soft:     #6b6259  /* secondary text */
--ink-mute:     #8a7e6e  /* meta, label */
--hairline:     #e8e0d0  /* border, divider */
--ochre:        #b8860b  /* accent, brand dot, focus */
--ochre-soft:   #f5e6c0  /* pillar icon bg */
--ochre-deep:   #8a6608  /* ochre hover */
--clay:         #c84630  /* problem card left bar */
```

**Final CTA bloğu** koyu zemin kullandığı için, sadece o blok içinde dark variant token'ları aktif olur:
```css
--paper-dark:        #1a1814
--paper-dark-soft:   #1f1c16  /* form card bg */
--paper-dark-deeper: #16140f  /* input bg */
--ink-dark:          #f0e8d8
--ink-dark-soft:     #b8ad9a
--hairline-dark:     #3a342c
--ochre-dark:        #d4a444  /* ochre on dark — biraz daha açık */
```

**Tipografi:**
- Font ailesi: Poppins (300, 400, 500, 600, 700)
- Hero h1: 56px, weight 700, line-height 0.98, letter-spacing -0.035em
- Section title (h2): 26-32px, weight 700, letter-spacing -0.02em
- Eyebrow: 11px, uppercase, letter-spacing 0.12em, color ochre, weight 600
- Body: 14-15px, line-height 1.5
- Meta/label: 11-12px, color ink-mute

---

## 5. Sayfa Yapısı

Tek sayfa, 9 blok, yukarıdan aşağıya:

### 5.1. Top Nav (sticky)

- **Sol:** Brand mark — ochre dot + "Tracker" wordmark
- **Orta:** 3 in-page link — "Özellikler", "Nasıl çalışır", "SSS" (smooth scroll)
- **Sağ:** "Demo iste" → ink button, alt formu hedefler

Mobile'da nav linkleri hamburger arkasına gizlenir; brand + Demo iste hep görünür.

### 5.2. Hero

- **Eyebrow:** `3–15 KİŞİLİK EKİPLER İÇİN`
- **H1:** `Bugün ne yapacağını [tek bakışta] gör.` ("tek bakışta" ochre)
- **Lead:** `Jira'nın karmaşası, Notion'un dağınıklığı olmadan. Günlük fix + haftalık sprint tek arayüzde.`
- **CTA satırı:**
  - Primary: `Demo iste →` (ink button, form'a anchor)
  - Secondary: `Özellikleri gör` (underline link, değer kolonlarına anchor)
- **Meta satırı (CTA'nın altında):** "Self-hosted · 2 dakikada kuruluyor"

Sağda büyük dekoratif öğe yok — hero saf metin odaklı. Sağa "1 büyük screenshot" eklenmesi opsiyonel ama v1'de yok (screenshot'lar showcase bölümünde gösterilir).

### 5.3. Problem Statement

- **Eyebrow:** `TANIDIK GELDİ Mİ?`
- **H2:** `Küçük ekiplerde günlük kaos hep aynı.`
- **3 kart yatay grid:**
  - "'Bugün ne yapmam gerekiyordu?' mailde, Slack'te, Trello'da kayıp."
  - "Sprint hedefi açık ama günlük fix'ler nereye düştüğünü kimse bilmiyor."
  - "Müdür: 'Ekibimde kim ne yapıyor, kimin yükü fazla?' — cevap yok."
- Kartların sol kenarında 3px clay (`#c84630`) çubuk — problem hissi.

### 5.4. Değer Kolonları (4 pillar)

- **Eyebrow:** `TRACKER FARKI`
- **H2:** `4 net değer. Daha fazlası değil.`
- **4 kart yatay grid (mobile'da 2x2):**

| İkon | Başlık | Açıklama |
|---|---|---|
| ◐ | Günlük odak | Sabah aç, bugünkü görevini gör. Standup, bildirim, fix listesi tek yerde. |
| ▦ | Sprint takip | Kanban + dense tablo + kapasite. Sprint açıl-kapanışı tek tık. |
| ◇ | Self-hosted | Verin senin sunucunda. Subscription yok, bulut kilidi yok. |
| ▤ | 3 rol, tek workspace | Yönetici/Müdür/Üye. Bir uygulama, ek modül kurma yok. |

İkonlar lucide-react'tan: `Focus`, `Columns3` (kanban için), `Server`, `Users` (yukarıdaki sembolik karakterler değil — placeholder). Lucide icon ismi yoksa en yakın anlamdaş seçilir.

### 5.5. Screenshot Showcase

- **Eyebrow:** `GERÇEK ARAYÜZ`
- **H2:** `İlk bakışta ne göreceksin.`
- **Tab bar (4 sekme):** Dashboard · Kanban · Sprint board · Görev detay
- **Tab içeriği:** 16:9 PNG, paper-soft kart içinde, hairline border, 8px radius

Sekme değiştirme client-side state (basit `useState`). URL hash güncelleme yok.

### 5.6. Nasıl Çalışır (3 adım)

- **Eyebrow:** `3 ADIM`
- **H2:** `Bir öğleden sonrada hazır.`
- **3 kart yatay grid:**
  - **1 — Kur** — "Sunucuna Docker'la veya systemd ile. Run-book hazır."
  - **2 — Ekibini davet et** — "Admin login + in-app davet veya CSV bulk import."
  - **3 — İlk sprint'i aç** — "Görevler, kanban, mail bildirimleri ilk günden çalışıyor."

Adım numarası: 24px daire, ochre bg, paper text.

### 5.7. SSS

- **Eyebrow:** `SIK SORULANLAR`
- **H2:** `Hemen aklına gelenler.`
- **5 accordion item:**
  1. Self-hosted nasıl çalışıyor? Ne lazım?
  2. Verim güvende mi? Şifreleme, yedekleme?
  3. Maksimum kaç kişi kullanabilir?
  4. Mail bildirimleri nasıl yapılıyor?
  5. Mevcut Trello/Jira'dan veri taşınabilir mi?

shadcn `Accordion` component'i, single-collapsible.

### 5.8. Contact / Final CTA (koyu blok)

İki kolonlu koyu zemin (`--paper-dark`) bloğu.

**Sol kolon:**
- Eyebrow: `DEMO TALEBİ`
- H3: `Ekibini [Tracker'a] taşımaya hazır mısın?` ("Tracker'a" ochre)
- Lead: `30 dakikalık bir demo'da kendi senaryonuza özel kurulum gösteriyoruz. Sorularını cevaplayıp ekibine uygun mu birlikte karar veriyoruz.`
- 4'lü güven sinyali grid:
  - ✓ 24 saat içinde dönüş — İş günü içinde direkt mail
  - ✓ 30 dakikalık demo — Senin takvimine uygun
  - ✓ Kredi kartı yok — Bağlayıcı bir şey yok
  - ✓ Türkçe destek — Senin saatinde, senin dilinde
- Alt — hairline ayraç sonrası: `Form doldurmayı tercih etmiyorsan` → `info@collbrai.com`

**Sağ kolon — Form kartı (`#1f1c16` bg):**
- Header: "Demo iste" + "Aşağıyı doldur, 24 saat içinde sana dönüyoruz."
- **Alanlar (sırayla):**
  | Alan | Tip | Validasyon |
  |---|---|---|
  | Adın | text | required, min 2 |
  | E-mail | email | required, valid email |
  | Şirket | text | required, min 2 |
  | Ekip boyutu | pill select (1-5 / 3-15 / 16-50 / 50+) | required, 3-15 default |
  | Mesaj | textarea | optional, max 500 |
- Submit: full-width, ochre bg (`#d4a444`), 12px padding
- Fineprint: `Mailini sadece sana cevap vermek için kullanırız.`

**Submit davranışı:**
- Client validation: `react-hook-form` + `@hookform/resolvers/zod` ile `lib/demo-schema.ts` schema'sı
- Server Action `submitDemoRequest()` çağırılır
- Server'da yeniden Zod validation + Honeypot kontrol + basit rate limit (IP başına dakikada 3)
- Nodemailer Gmail SMTP üzerinden `info@collbrai.com`'a mail gönderilir
- Mail içeriği: tüm form alanları + user agent + timestamp + IP
- Submit başarılı → form yerinde "Teşekkürler, 24 saat içinde dönüyoruz" mesajı (toast değil, in-place değişim)
- Hata → form üstünde inline error: "Bir sorun oldu, lütfen `info@collbrai.com` adresine yazın"

### 5.9. Footer (light, `--paper-deeper` bg)

Üst kısım — 3 kolon grid (2fr : 1fr : 1fr):

**Kolon 1 — Marka:**
- Logo: ochre dot + "Tracker"
- Tagline: `3-15 kişilik ekipler için günlük fix + haftalık sprint takibi. Self-hosted, Türkçe.`
- 4 sosyal ikon: GitHub, LinkedIn, X, mailto

**Kolon 2 — Ürün:**
- Özellikler (#features anchor)
- Nasıl çalışır (#how anchor)
- Self-hosted kurulum (henüz yoksa GitHub README'ye link)
- Sürüm notları (henüz yoksa "#")

**Kolon 3 — İletişim:**
- Demo iste (#contact anchor)
- info@collbrai.com (mailto)

Alt çubuk:
- Tek satır: `© 2026 Tracker · Türkiye'de yapıldı`

KVKK / Gizlilik / Kullanım Şartları linkleri **bilinçli olarak yok** (kullanıcı kararı — v1 kapsamı dışı).

---

## 6. Dosya Yapısı

```
tracker-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, Poppins font, metadata
│   │   ├── page.tsx            # Tek sayfa — tüm section'ları compose eder
│   │   ├── globals.css         # Tailwind import + token CSS vars + base styles
│   │   └── actions/
│   │       └── submit-demo.ts  # Server Action: form submit + mail
│   ├── components/
│   │   ├── nav.tsx
│   │   ├── hero.tsx
│   │   ├── problem.tsx
│   │   ├── pillars.tsx
│   │   ├── screenshots.tsx
│   │   ├── how-it-works.tsx
│   │   ├── faq.tsx
│   │   ├── contact.tsx         # Final CTA + form (en kompleks component)
│   │   ├── footer.tsx
│   │   └── ui/                 # shadcn components (accordion, button, input, textarea)
│   └── lib/
│       ├── demo-schema.ts      # Zod schema for form
│       ├── mail.ts             # Nodemailer transport wrapper
│       └── rate-limit.ts       # in-memory rate limiter (basit)
├── public/
│   └── screenshots/            # Playwright çıktısı, .gitkeep ile başlar
│       ├── dashboard.png
│       ├── kanban.png
│       ├── sprint.png
│       └── task-detail.png
├── scripts/
│   └── capture-screens.ts      # Playwright script, Tracker dev server'ından PNG çeker
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-05-22-tracker-landing-design.md  ← bu dosya
├── .env.example
├── .env.local                  # gitignored
├── .gitignore
├── components.json             # shadcn config
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts          # Tailwind v4 (CSS-first), minimal
├── tsconfig.json
└── README.md
```

---

## 7. Demo Form — Veri Akışı

```
[User] → [client form (react-hook-form + zod)]
                ↓ submit
[Server Action submitDemoRequest()]
   ├─ Re-validate input (zod)
   ├─ Check honeypot field (bot)
   ├─ Rate limit (IP başına 3/dk, in-memory Map)
   ├─ Compose mail body
   └─ nodemailer.sendMail() → Gmail SMTP → info@collbrai.com
                ↓
        [Return {ok: true} | {ok: false, error}]
                ↓
   [Client UI: in-place success/error swap]
```

**Env vars (`.env.local`):**
```
GMAIL_SMTP_USER=info@collbrai.com
GMAIL_SMTP_APP_PASSWORD=<gmail app password>
DEMO_REQUEST_TO=info@collbrai.com
```

Persistence yok (DB yok). Sadece mail. v2'de Supabase tablosu eklenebilir ama v1 kapsamı dışı.

---

## 8. Screenshot Pipeline

`scripts/capture-screens.ts` script'i:

1. **Önkoşul kontrolü:** Tracker dev server'ı çalışıyor mu (`TRACKER_BASE_URL` env, default `http://localhost:3000`), seed user `admin@tracker.local` / `admin123` ile login olunabiliyor mu. Tracker repo'sunun fiziksel konumu önemli değil — script sadece HTTP üzerinden konuşur.
2. **Playwright launch:** Chromium, viewport 1440x900, deviceScaleFactor 2 (retina).
3. **Login:** Magic seed credentials ile login.
4. **Capture 4 view:**
   - `/dashboard` → `public/screenshots/dashboard.png`
   - `/board` (kanban) → `public/screenshots/kanban.png`
   - `/sprint` → `public/screenshots/sprint.png`
   - `/tasks/[first-task-id]` → `public/screenshots/task-detail.png`
5. Her ekran için: `waitForLoadState('networkidle')` sonra `fullPage: false` ile viewport boyutunda PNG.

> **Konum notu:** Tracker `C:\Users\fatih\Desktop\tracker`, landing `C:\Users\fatih\OneDrive\Masaüstü\tracker-landing` — iki farklı parent klasörde. Script HTTP üzerinden konuştuğu için relative path ihtiyacı yok.

Script `npm run screens` komutuyla çalışır. Çıktı `public/screenshots/`'a yazılır. Çıktıdaki PNG'ler **git'e commit edilir** — landing build edildiğinde dependency olmasın diye.

Screenshot içeriği (data seed sorumluluğu): Tracker'ın seed.sql'i landing screenshot'ları için "iyi görünen" data üretmeli. Eğer mevcut seed yetersizse, scripts içinde gösterilecek mock data toplaması yapılabilir. Bu detay implementation aşamasında netleşir.

---

## 9. Performans & SEO

- **Lighthouse hedef:** 90+ tüm metriklerde (mobile + desktop)
- **Font loading:** `next/font/google` ile Poppins, swap stratejisi
- **Image:** Tüm screenshot'lar Next.js `<Image>` komponenti, `priority` yalnızca hero üstünde
- **Metadata:** `<title>`, OG image (`/og-image.png` ayrı asset), Türkçe description
- **Sitemap + robots:** `app/sitemap.ts`, `app/robots.ts` (yalnızca `/`)
- **Analytics:** v1'de yok. v2'de Plausible/Umami eklenebilir.

---

## 10. Test Stratejisi

Marketing landing'i için ağır test gereksizdir. Smoke seviyesi:

- **Vitest unit:** `submitDemoRequest` server action — Zod red durumu, success durumu, rate limit, honeypot. Nodemailer mock'lanır.
- **TypeScript strict** + **ESLint** + **Prettier** — CI'da otomatik.
- **Manual smoke checklist** — README'de:
  - 4 sekmeli screenshot tab değişiyor mu
  - Accordion açılıp kapanıyor mu
  - Form valid input'ta submit oluyor mu (Mailhog ya da Gmail draft'a düşüyor mu)
  - Form invalid input'ta inline error gösteriyor mu
  - Smooth scroll anchor'lar (#features, #how, #contact) çalışıyor mu

Playwright E2E v1'de yok.

---

## 11. Açık Sorular & Karar Yeri

| Konu | Karar | Karar Sahibi |
|---|---|---|
| Hosting | Vercel önerilir (auto deploy) ama self-host sunucusu da geçerli | Kullanıcı, deploy aşamasında karar verecek |
| Logo | Şu an wordmark + ochre dot. Özel logo varsa swap edilir. | Şu an wordmark yeterli |
| OG image | Hero'nun statik bir snapshot'ı olarak otomatik üretilir veya elle hazırlanır | Implementation aşamasında karar |
| Domain | tracker.collbrai.com mı, collbrai.com/tracker mı, ayrı domain mi? | Kullanıcı, deploy aşamasında karar verecek |

---

## 12. Risk & Belirsizlik

- **Screenshot kalitesi** — Tracker dev seed'i landing-grade görsel üretmiyorsa script'in seed data'yı zenginleştirmesi gerekebilir.
- **Gmail SMTP rate limit** — 500 mail/gün. Demo form için fazlasıyla yeterli ama Gmail app password rotasyonu gerekir.
- **Mobile responsive** — 4-kolon pillars grid ve 2-kolon contact bloğu mobile'da agresif stack edilecek. Tasarım kısıtı bu noktada test edilmeli.

---

## 13. v2 / Sonra (kapsam dışı)

- İngilizce versiyon (`/en/`)
- Pricing sayfası
- Blog / changelog
- Müşteri alıntıları bölümü
- Newsletter signup
- Live demo (sandbox env)
- Plausible/Umami analytics
- Form lead'lerini Supabase tablosuna yazma
