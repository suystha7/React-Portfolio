import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import TechMarquee from "@/components/sections/TechMarquee";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/shared/ScrollProgress";
import CursorGlow from "@/components/shared/CursorGlow";

/**
 * Single-page portfolio (SPA feel, SEO-friendly SSR via the App Router).
 * Each section is an anchor target for smooth-scroll navigation.
 */
export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <TechMarquee />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
