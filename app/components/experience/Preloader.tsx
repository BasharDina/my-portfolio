"use client";

import { useEffect, useState } from "react";

type PreloaderProps = {
  onDone?: () => void;
};

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let value = 0;
    const tick = () => {
      value += Math.max(1, (100 - value) * 0.08);
      const next = Math.min(100, Math.round(value));
      setProgress(next);

      if (next >= 100) {
        setTimeout(() => setHidden(true), 220);
        setTimeout(() => onDone?.(), 900);
        return;
      }

      const timeout = window.setTimeout(tick, 24);
      return () => window.clearTimeout(timeout);
    };

    const timeout = window.setTimeout(tick, 200);
    return () => window.clearTimeout(timeout);
  }, [onDone]);

  return (
    <div
      aria-hidden={hidden}
      className={`pointer-events-none fixed inset-0 z-50 grid place-items-center bg-[#020303] transition-opacity duration-700 ${
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
