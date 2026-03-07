"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const StaggerContext = createContext<{ shown: boolean; stagger: number }>({
  shown: false,
  stagger: 0.1,
});

export function Stagger({ children, stagger = 0.1 }: { children: React.ReactNode; stagger?: number }) {
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
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <StaggerContext.Provider value={{ shown, stagger }}>
      <div ref={ref} data-reduce-motion={reduceMotion ? "true" : "false"}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

export function StaggerItem({ children, y = 14 }: { children: React.ReactNode; y?: number }) {
  const { shown, stagger } = useContext(StaggerContext);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [order, setOrder] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const siblings = Array.from(el.parentElement.children);
    setOrder(Math.max(0, siblings.indexOf(el)));
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: reduceMotion ? "none" : shown ? "translateY(0px)" : `translateY(${y}px)`,
        transition: reduceMotion
          ? undefined
          : `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${order * stagger}s, transform 600ms cubic-bezier(0.22,1,0.36,1) ${order * stagger}s`,
        willChange: reduceMotion ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}