"use client";

import { useEffect, useRef, useState } from "react";
import { setScrollState, useScrollState } from "./scroll-state";
import Intro from "./sections/Intro";
import Showcase from "./sections/Showcase";
import FinalCTA from "./sections/FinalCTA";
import Preloader from "./Preloader";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function ExperienceRoot() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollState = useScrollState();
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
        setActiveScene(active);
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
    <div ref={rootRef} className="relative min-h-screen text-white">
      <Preloader />

      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(700px 500px at 72% 36%, rgba(64, 255, 0, 0.12), transparent 62%),
              radial-gradient(660px 460px at 34% 65%, rgba(124, 58, 237, 0.14), transparent 64%),
              radial-gradient(980px 580px at 50% -18%, rgba(255, 255, 255, 0.05), transparent 70%),
              linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.24))
            `,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(64,255,0,0.12)_0%,rgba(124,58,237,0.10)_42%,transparent_72%)] blur-3xl" />
      </div>

      <div className="relative z-20">
        <div data-exp-scene data-exp-scene-index="0">
          <Intro reducedMotion={reducedMotion} />
        </div>

        <div data-exp-scene data-exp-scene-index="1">
          <Showcase reducedMotion={reducedMotion} />
        </div>

        <div data-exp-scene data-exp-scene-index="2">
          <FinalCTA reducedMotion={reducedMotion} />
        </div>
      </div>
    </div>
  );
}