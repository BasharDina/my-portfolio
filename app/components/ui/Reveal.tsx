"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = media.matches;
    setReduceMotion(reduced);

    if (reduced) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -20% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: reduceMotion ? "none" : shown ? "translateY(0px)" : `translateY(${y}px)`,
        transition: reduceMotion
          ? undefined
          : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: reduceMotion ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;