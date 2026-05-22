import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
      </main>
    </>
  );
}
