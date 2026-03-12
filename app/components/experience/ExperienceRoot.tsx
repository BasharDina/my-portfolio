"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Preloader from "./Preloader";
import { setScrollState, useScrollState } from "./scroll-state";
import Intro from "./sections/Intro";
import PosterShowcase from "./sections/PosterShowcase";
import Showcase from "./sections/Showcase";
import FinalCTA from "./sections/FinalCTA";

const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#030505]" />,
});

function useReducedMotion() {
  const media =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  return media?.matches ?? false;
}

export default function ExperienceRoot() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollState = useScrollState();

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.classList.remove("has-cursor");

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, window.scrollY / maxScroll);
      setScrollState({ progress });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-exp-scene]")
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const active = Number(
          (visible[0].target as HTMLElement).dataset.expSceneIndex ?? 0
        ) as 0 | 1 | 2;

        setScrollState({ activeScene: active });
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-12% 0px -22% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen bg-black text-white">
      <div className="fixed left-0 top-0 z-[90] h-[2px] w-full bg-white/10">
        <div
          className="h-full bg-[#40FF00] transition-[width] duration-100"
          style={{ width: `${scrollState.progress * 100}%` }}
        />
      </div>

      <div className="relative z-[100]">
        <Navbar />
      </div>

      <Preloader />

      <div className="fixed inset-0 z-0">
        <ExperienceCanvas />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.5))]" />
      </div>

<main className="relative z-20 pt-14 sm:pt-16">
          <div id="exp-scene-0">
          <Intro reducedMotion={reducedMotion} />
        </div>

        <PosterShowcase />

        <div id="exp-scene-1">
          <Showcase reducedMotion={reducedMotion} />
        </div>

        <div id="exp-scene-2">
          <FinalCTA reducedMotion={reducedMotion} />
        </div>

        <Footer />
      </main>
    </div>
  );
}