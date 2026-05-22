import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tracker.collbrai.com"),
  title: "Tracker — Küçük ekipler için günlük + sprint görev takibi",
  description:
    "Jira'nın karmaşası olmadan, 3-15 kişilik ekipler için günlük fix ve haftalık sprint görevlerini tek arayüzde takip et. Self-hosted, Türkçe.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Tracker — Bugün ne yapacağını tek bakışta gör",
    description: "3-15 kişilik ekipler için günlük + sprint görev takibi. Self-hosted, Türkçe.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracker — Bugün ne yapacağını tek bakışta gör",
    description: "3-15 kişilik ekipler için günlük + sprint görev takibi. Self-hosted, Türkçe.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
