"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SmoothScroll() {
  useEffect(() => {
    // ✅ إذا المستخدم مفعّل Reduce Motion: لا نشغّل Lenis
    if (prefersReducedMotion()) return;

    let lenis: any = null;
    let raf = 0;

    (async () => {
      const mod = await import("lenis");
      const Lenis = mod.default;

      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}