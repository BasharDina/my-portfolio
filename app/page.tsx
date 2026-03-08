"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import ProjectsPreview from "./components/sections/ProjectsPreview";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { initHomeScrollTriggers } from "./components/ui/scroll-trigger";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const cleanup = initHomeScrollTriggers(root);
    return cleanup;
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen">
      <Navbar />

      {/* Hero — pinned scroll-story */}
      <div data-home-chapter="hero">
        <Hero />
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Testimonials */}
      <section id="about" className="container-lux section-pad">
        <About />
      </section>

      <div className="section-divider" />

      {/* Services — pinned scroll-story */}
      <div data-home-chapter="services">
        <section id="skills" className="container-lux section-pad">
          <Services />
        </section>
      </div>

      <div className="section-divider" />

      {/* Projects Preview — pinned scroll-story */}
      <div data-home-chapter="projects">
        <section id="projects" className="container-lux section-pad">
          <ProjectsPreview />
        </section>
      </div>

      <div className="section-divider" />

      {/* Contact */}
      <section id="contact" className="container-lux section-pad">
        <Contact />
      </section>

      <div className="section-divider" />

      {/* Enter Experience CTA */}
      <section className="container-lux pb-20">
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
              Enter Experience <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
