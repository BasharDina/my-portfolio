import Link from "next/link";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import ProjectsPreview from "./components/sections/ProjectsPreview";
import Contact from "./components/sections/Contact";
import HomeScrollInit from "./components/ui/HomeScrollInit";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeScrollInit />


      <div data-home-chapter="hero">
        <Hero />
      </div>

      <div className="section-divider" />

      <div data-home-chapter="about" className="container-lux">
        <About />
      </div>

      <div className="section-divider" />

      <div data-home-chapter="services" className="container-lux">
        <Services />
      </div>

      <div className="section-divider" />

      <div data-home-chapter="projects" className="container-lux">
        <ProjectsPreview />
      </div>

      <div className="section-divider" />

      <div className="container-lux">
        <Contact />
      </div>

      <div className="section-divider" />

      <section className="container-lux pb-14 pt-6 sm:pb-16 sm:pt-8">
        <div className="glass glass-highlight rounded-3xl p-8 text-center sm:p-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40FF00]">
              Immersive Mode
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Ready for the full interactive journey?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
              Explore the immersive version of my portfolio with richer motion, deeper case studies,
              and a crafted storytelling flow powered by WebGL.
            </p>
            <Link
              href="/experience"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#40FF00] px-7 py-3 text-base font-bold text-black transition hover:brightness-110 active:scale-[0.98] shadow-[0_0_30px_rgba(64,255,0,0.25)]"
            >
              <span className="text-black">Enter Experience</span>
              <ArrowRight size={18} className="text-black" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}