import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";
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
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
