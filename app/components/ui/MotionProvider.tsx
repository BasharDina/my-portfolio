"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* respect user reduced-motion settings */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}