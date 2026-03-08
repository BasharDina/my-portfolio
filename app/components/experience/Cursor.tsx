"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;

    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    // set initial positions (حتى ما يلمع فجأة)
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    ring.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const onDown = () => ring.classList.add("cursor--down");
    const onUp = () => ring.classList.remove("cursor--down");

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = !!target.closest(
        "a,button,[data-cursor='link'],[role='button'],input,textarea,select,.card,[class*='card'],[role='tab'],[data-state='active'],[data-state='inactive']"
      );

      if (isInteractive) ring.classList.add("cursor--hover");
      else ring.classList.remove("cursor--hover");
    };

    let rafId = 0;
    const loop = () => {
      dx += (mx - dx) * 0.12;
      dy += (my - dy) * 0.12;

      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;

      ring.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      ring.style.setProperty("--halo-x", `${rx}px`);
      ring.style.setProperty("--halo-y", `${ry}px`);

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  // ✅ مهم: دايمًا ارسم نفس الـDOM (لمنع hydration mismatch)
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}