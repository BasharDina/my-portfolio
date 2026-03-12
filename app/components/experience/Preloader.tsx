"use client";

import { useEffect, useState } from "react";

type PreloaderProps = {
  onDone?: () => void;
};

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const tick = () => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.max(1, (100 - prev) * 0.12));

        if (next >= 100) {
          timeoutId = window.setTimeout(() => {
            if (cancelled) return;
            setHidden(true);
            onDone?.();
          }, 280);
        } else {
          timeoutId = window.setTimeout(tick, 26);
        }

        return Math.round(next);
      });
    };

    timeoutId = window.setTimeout(tick, 180);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [onDone]);

  return (
    <div
      aria-hidden={hidden}
      className={`pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-[#020303] transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Loading</p>
        <p className="mt-2 text-5xl font-semibold tabular-nums text-white">{progress}%</p>
      </div>
    </div>
  );
}