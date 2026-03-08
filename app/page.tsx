"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import ProjectsPreview from "./components/sections/ProjectsPreview";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import Link from "next/link";
import { initHomeScrollTriggers } from "./components/ui/scroll-trigger";

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
      <div data-home-chapter="hero">
        <Hero />
      </div>
      <section id="about" className="mx-auto w-full max-w-[1320px] px-3 py-16 sm:px-4 sm:py-20 lg:px-5">
        <About />
      </section>
      <div data-home-chapter="services">
        <section id="skills" className="mx-auto w-full max-w-[1320px] px-3 py-16 sm:px-4 sm:py-20 lg:px-5">
          <Services />
        </section>
      </div>
      <div data-home-chapter="projects">
        <section id="projects" className="mx-auto w-full max-w-[1320px] px-3 py-16 sm:px-4 sm:py-20 lg:px-5">
          <ProjectsPreview />
        </section>
      </div>
      <section id="contact" className="mx-auto w-full max-w-[1320px] px-3 py-16 sm:px-4 sm:py-20 lg:px-5">
        <Contact />
      </section>
      <section className="mx-auto w-full max-w-[1320px] px-3 pb-16 sm:px-4 sm:pb-20 lg:px-5">
        <div className="rounded-3xl border bg-card/60 p-6 text-center sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready for the full interactive journey?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Explore the immersive version of my portfolio with richer motion, deeper case studies, and a crafted storytelling flow.
          </p>
          <Link
            href="/experience"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-3 text-base font-bold text-primary-foreground transition hover:brightness-110 active:scale-[0.98]"
          >
            Enter Experience
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}