import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";
import { HowItWorks } from "@/components/how-it-works";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
        <HowItWorks />
      </main>
    </>
  );
}
