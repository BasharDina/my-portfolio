"use client";

import { useRef } from "react";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
};

export default function ShineButton(props: ButtonProps | AnchorProps) {
  const ref = useRef<HTMLElement | null>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
  }

  const base =
    "shine-btn rounded-2xl transition active:scale-[0.98]";

  if (props.as === "a") {
    const { as, className = "", children, ...rest } = props;
    return (
      <a
        ref={(n) => (ref.current = n as any)}
        onMouseMove={onMove}
        className={`${base} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { className = "", children, ...rest } = props;
  return (
    <button
      ref={(n) => (ref.current = n as any)}
      onMouseMove={onMove}
      className={`${base} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}