import { Nav } from "@/components/nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";
import { Comparison } from "@/components/comparison";
import { Screenshots } from "@/components/screenshots";
import { HowItWorks } from "@/components/how-it-works";
import { ValueStrip } from "@/components/value-strip";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
        <Comparison />
        <Screenshots />
        <HowItWorks />
        <ValueStrip />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
