"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import TrustedBy from "./components/sections/TrustedBy";
import ProjectsPreview from "./components/sections/ProjectsPreview";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { initHomeScrollTriggers } from "./components/ui/scroll-trigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HOME_SECTIONS = [
  { id: "home-scene-0", label: "HOME" },
  { id: "home-scene-1", label: "ABOUT" },
  { id: "home-scene-2", label: "SERVICES" },
  { id: "home-scene-3", label: "PROJECTS" },
  { id: "home-scene-4", label: "CONTACT" },
] as const;

function SideIndicator({
  items,
  activeIndex,
}: {
  items: readonly { id: string; label: string }[];
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-[95] hidden -translate-y-1/2 md:block lg:right-8">
      <div className="pointer-events-auto relative">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/72 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent" />
          <div className="pointer-events-none absolute -left-10 top-1/2 h-28 w-20 -translate-y-1/2 rounded-full border border-white/[0.04] bg-black/80 blur-[1px]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[31px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]" />
          <div className="pointer-events-none absolute right-0 top-10 h-20 w-20 rounded-full bg-[#40FF00]/[0.06] blur-2xl" />

          <div className="relative flex flex-col gap-5">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center justify-end gap-3">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeIndex === i
                      ? "text-[#40FF00] opacity-100"
                      : "text-white/26 opacity-90"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`h-[10px] rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-10 bg-[#40FF00] shadow-[0_0_18px_rgba(64,255,0,0.4)]"
                      : activeIndex > i
                      ? "w-4 bg-white/28"
                      : "w-4 bg-white/12"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const cleanup = initHomeScrollTriggers(root);
    return cleanup;
  }, []);

  useEffect(() => {
    const sections = HOME_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const index = Number(
          (visible[0].target as HTMLElement).dataset.homeSceneIndex ?? 0
        );

        setActiveScene(index);
      },
      {
        threshold: [0.25, 0.45, 0.6],
        rootMargin: "-18% 0px -28% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main ref={mainRef} className="min-h-screen pt-[78px] sm:pt-[86px]">
        <SideIndicator items={HOME_SECTIONS} activeIndex={activeScene} />

        <div
          id="home-scene-0"
          data-home-scene-index="0"
          data-home-chapter="hero"
        >
          <Hero />
        </div>

        <div className="section-divider" />

        <div
          id="home-scene-1"
          data-home-scene-index="1"
          data-home-chapter="about"
          className="container-lux"
        >
          <About />
        </div>

        <div className="section-divider" />

        <div
          id="home-scene-2"
          data-home-scene-index="2"
          data-home-chapter="services"
          className="container-lux"
        >
          <Services />
        </div>

        <div className="section-divider" />

        <div className="container-lux">
          <TrustedBy />
        </div>

        <div className="section-divider" />

        <div
          id="home-scene-3"
          data-home-scene-index="3"
          data-home-chapter="projects"
          className="container-lux"
        >
          <ProjectsPreview />
        </div>

        <div className="section-divider" />

        <div
          id="home-scene-4"
          data-home-scene-index="4"
          className="container-lux"
        >
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
                and a crafted storytelling flow.
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

        <Footer />
      </main>
    </>
  );
}