"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reduce) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}