"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cursor from "./Cursor";
import Preloader from "./Preloader";
import { setupLenisGsap } from "./gsap-lenis";
import { setScrollState, useScrollState } from "./scroll-state";
import Intro from "./sections/Intro";
import Showcase from "./sections/Showcase";
import FinalCTA from "./sections/FinalCTA";

// Lazy-load the heavy WebGL canvas
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#030505]" />
  ),
});

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

const SCENE_LABELS = ["Intro", "Showcase", "Contact"] as const;

export default function ExperienceRoot() {
  const reducedMotion = useReducedMotion();
  const storyRef = useRef<HTMLDivElement>(null);
  const scrollState = useScrollState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void setupLenisGsap().then((dispose) => {
      if (cancelled) {
        dispose();
        return;
      }
      cleanup = dispose;
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const story = storyRef.current;
    if (!story) return;

    if (reducedMotion) {
      setScrollState({ progress: 0, activeScene: 0 });
      return;
    }

    const chapterElements = gsap.utils.toArray<HTMLElement>(story.querySelectorAll("[data-exp-chapter]"));
    const introParallax = story.querySelectorAll<HTMLElement>("[data-intro-parallax]");
    const showcaseParallax = story.querySelectorAll<HTMLElement>("[data-showcase-parallax]");
    const ctaParallax = story.querySelectorAll<HTMLElement>("[data-cta-parallax]");

    const setHidden = (el: HTMLElement) => {
      gsap.set(el, { autoAlpha: 0, y: 24, filter: "blur(10px)" });
    };

    chapterElements.forEach(setHidden);
    if (chapterElements[0]) {
      gsap.set(chapterElements[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: story,
        start: "top top",
        end: "+=3000",
        pin: "#experience-pin",
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeScene = Math.min(2, Math.floor(progress * 3)) as 0 | 1 | 2;
          setScrollState({ progress, activeScene });
        },
      },
    });

    const animateIn = (target?: HTMLElement | null) => {
      if (!target) return;
      timeline.to(target, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "power2.out" });
    };
    const animateOut = (target?: HTMLElement | null) => {
      if (!target) return;
      timeline.to(target, { autoAlpha: 0, y: -16, filter: "blur(8px)", duration: 0.28, ease: "power2.inOut" });
    };

    animateIn(chapterElements[0]);
    timeline.to(introParallax, { yPercent: -8, duration: 0.55, ease: "none" });
    animateOut(chapterElements[0]);

    animateIn(chapterElements[1]);
    timeline.to(showcaseParallax, { yPercent: -10, duration: 0.55, ease: "none" });
    animateOut(chapterElements[1]);

    animateIn(chapterElements[2]);
    timeline.to(ctaParallax, { yPercent: -6, duration: 0.45, ease: "none" });

    ScrollTrigger.refresh();

    return () => {
      setScrollState({ progress: 0, activeScene: 0 });
      timeline.scrollTrigger?.kill();
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === story) {
          trigger.kill();
        }
      });
    };
  }, [reducedMotion]);

  return (
    <div
      id="experience-story"
      ref={storyRef}
      className={`relative bg-black text-white ${reducedMotion ? "min-h-screen" : "h-[300vh]"}`}
    >
      {/* Progress bar */}
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/10">
        <div
          className="h-full bg-[#40FF00] transition-[width] duration-100"
          style={{ width: `${scrollState.progress * 100}%` }}
        />
      </div>

      {/* Scene indicator */}
      {!reducedMotion && (
        <div className="fixed right-6 top-1/2 z-[60] -translate-y-1/2 flex flex-col items-end gap-3">
          {SCENE_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                  scrollState.activeScene === i ? "text-[#40FF00] opacity-100" : "text-white/40 opacity-60"
                }`}
              >
                {label}
              </span>
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  scrollState.activeScene === i
                    ? "w-6 bg-[#40FF00]"
                    : scrollState.activeScene > i
                    ? "w-3 bg-white/30"
                    : "w-3 bg-white/15"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <Preloader />

      <div className={reducedMotion ? "relative min-h-screen" : "sticky top-0 h-screen overflow-hidden"}>
        <ExperienceCanvas />
        <div className="absolute inset-0 z-20">
          <Intro reducedMotion={reducedMotion} />
          <Showcase reducedMotion={reducedMotion} />
          <FinalCTA reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* Cursor only on /experience */}
      <Cursor />
    </div>
  );
}
