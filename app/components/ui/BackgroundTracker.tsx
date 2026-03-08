"use client";

import { useEffect } from "react";

/**
 * Tracks mouse position and scroll to drive the animated CSS background.
 * On coarse pointers or reduced-motion, this is a no-op.
 */
export default function BackgroundTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced || isCoarse) return;

    const root = document.documentElement;

    let mouseX = 50;
    let mouseY = 50;
    let targetX = 50;
    let targetY = 50;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const onScroll = () => {
      root.style.setProperty("--scroll-y", String(window.scrollY));
    };

    const loop = () => {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      root.style.setProperty("--glow-x", `${mouseX}%`);
      root.style.setProperty("--glow-y", `${mouseY}%`);

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    // Initial scroll position
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
