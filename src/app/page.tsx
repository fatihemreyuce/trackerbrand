import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";
import { Screenshots } from "@/components/screenshots";
import { HowItWorks } from "@/components/how-it-works";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
        <Screenshots />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
