"use client";
import { useRef } from "react";

type GlowLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function useGlowRef<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return { ref, onMove };
}

export function GlowLink({
  href,
  children,
  variant = "primary",
  className = "",
  download,
  target,
  rel,
  onClick,
}: GlowLinkProps) {
  const { ref, onMove } = useGlowRef<HTMLAnchorElement>();

  const base =
    "glow-btn relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-bold transition active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-[#40FF00] text-black hover:brightness-110"
      : "bg-transparent text-foreground border border-border hover:border-[#40FF00]/60";

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      download={download}
      target={target}
      rel={rel}
    >
      {children}
      <span className="glow-border" aria-hidden="true" />
    </a>
  );
}