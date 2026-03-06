"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Layout, Palette } from "lucide-react";

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 26 });
  const sy = useSpring(my, { stiffness: 220, damping: 26 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const tx = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const ty = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    mx.set(px - 0.5);
    my.set(py - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto w-full max-w-[560px] md:max-w-none"
    >
      {/* Strong green radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-95"
        style={{
          background:
            "radial-gradient(circle, rgba(64,255,0,0.55) 0%, rgba(64,255,0,0.20) 38%, rgba(64,255,0,0.00) 72%)",
        }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX: tx,
          translateY: ty,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Orb */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto h-[360px] w-[360px] sm:h-[420px] sm:w-[420px]"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-card to-background shadow-[0_50px_120px_rgba(0,0,0,0.35)] dark:shadow-[0_55px_140px_rgba(0,0,0,0.65)]" />

          <div
            className="absolute inset-0 rounded-full opacity-90 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(64,255,0,0.55) 0%, rgba(64,255,0,0.08) 45%, rgba(64,255,0,0.00) 70%)",
            }}
          />

          <div className="absolute left-[18%] top-[18%] h-[42%] w-[42%] rounded-full bg-white/10 blur-2xl" />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(64,255,0,0.22), 0 0 42px rgba(64,255,0,0.18)",
            }}
          />

          <div className="absolute -right-6 top-10 h-2 w-2 rounded-full bg-[#40FF00] shadow-[0_0_18px_rgba(64,255,0,0.6)]" />
          <div className="absolute left-10 bottom-8 h-1.5 w-1.5 rounded-full bg-[#40FF00]/90 shadow-[0_0_16px_rgba(64,255,0,0.45)]" />
        </motion.div>

        {/* Floating cards */}
        <FloatingCard
          icon={<Palette size={16} className="text-primary" />}
          title="Branding"
          desc="Identity • Logo • Visual systems"
          className="absolute left-0 top-10 sm:left-[-10px]"
          delay={0.0}
        />
        <FloatingCard
          icon={<Layout size={16} className="text-primary" />}
          title="UI/UX"
          desc="Web • Mobile • Design systems"
          className="absolute right-0 top-28 sm:right-[-10px]"
          delay={0.2}
        />
        <FloatingCard
          icon={<Sparkles size={16} className="text-primary" />}
          title="Motion"
          desc="Micro-interactions • Animations"
          className="absolute left-10 bottom-6 sm:left-6"
          delay={0.35}
        />
      </motion.div>

      <div className="pointer-events-none mx-auto mt-6 h-7 w-[340px] rounded-full bg-black/20 blur-2xl opacity-35 dark:bg-black/40" />
    </div>
  );
}

function FloatingCard({
  icon,
  title,
  desc,
  className,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      <div className="rounded-2xl border bg-card px-4 py-3 shadow-[0_30px_80px_rgba(0,0,0,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-2 text-sm font-extrabold text-foreground">
          <Badge className="h-6 px-2" variant="secondary">
            {icon}
          </Badge>
          {title}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
      </div>
    </motion.div>
  );
}