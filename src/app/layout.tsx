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
  title: "Tracker — Küçük ekipler için günlük + sprint görev takibi",
  description:
    "Jira'nın karmaşası olmadan, 3-15 kişilik ekipler için günlük fix ve haftalık sprint görevlerini tek arayüzde takip et. Self-hosted, Türkçe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
