"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, Layout, Palette, ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { y: 18, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65 }
      )
        .fromTo(
          ".hero-title-line",
          { yPercent: 112, opacity: 0, rotateX: 12, transformOrigin: "0% 100%" },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.05, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subhead",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-feature",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.07 },
          "-=0.42"
        )
        .fromTo(
          ".hero-cta",
          { y: 16, opacity: 0, scale: 0.985 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.06 },
          "-=0.4"
        )
        .fromTo(
          ".hero-social",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
          "-=0.35"
        )
        .fromTo(
          ".hero-image-reveal",
          { clipPath: "inset(0% 0% 100% 0% round 24px)" },
          { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.1, ease: "power4.out" },
          "-=0.85"
        )
        .fromTo(
          ".hero-image-wrap",
          { y: 28, opacity: 0, rotate: -1.1, scale: 1.07 },
          { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.15, ease: "power4.out" },
          "-=0.78"
        );

      // Glow orbit pulse
      const glow = section.querySelector<HTMLElement>(".hero-glow-orbit");
      if (glow) {
        gsap.to(glow, {
          scale: 1.06,
          opacity: 1,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Magnetic CTA buttons
      const ctas = gsap.utils.toArray<HTMLElement>(".hero-cta-magnetic");
      ctas.forEach((el) => {
        const shine = el.querySelector<HTMLElement>(".hero-cta-shine");
        const strength = 0.16;

        const enter = () => gsap.to(el, { scale: 1.02, duration: 0.24, ease: "power3.out" });
        const leave = () => {
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
          if (shine) gsap.to(shine, { xPercent: 0, yPercent: 0, opacity: 0.32, duration: 0.28, ease: "power2.out" });
        };
        const move = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          const x = relX - rect.width / 2;
          const y = relY - rect.height / 2;

          gsap.to(el, { x: x * strength, y: y * strength, duration: 0.28, ease: "power2.out" });

          if (shine) {
            const xPct = ((relX / rect.width) * 100 - 50) * 0.85;
            const yPct = ((relY / rect.height) * 100 - 50) * 0.85;
            gsap.to(shine, { xPercent: xPct, yPercent: yPct, opacity: 0.55, duration: 0.2, ease: "power2.out" });
          }
        };
        const down = () => gsap.to(el, { scale: 0.975, duration: 0.12, ease: "power2.out" });
        const up = () => gsap.to(el, { scale: 1.02, duration: 0.16, ease: "power2.out" });

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        el.addEventListener("mousedown", down);
        el.addEventListener("mouseup", up);

        (el as HTMLElement & { __heroCleanup?: () => void }).__heroCleanup = () => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
          el.removeEventListener("mousedown", down);
          el.removeEventListener("mouseup", up);
        };
      });
    }, section);

    return () => {
      const node = sectionRef.current;
      if (node) {
        node.querySelectorAll<HTMLElement>(".hero-cta-magnetic").forEach((el) => {
          const cleanup = (el as HTMLElement & { __heroCleanup?: () => void }).__heroCleanup;
          cleanup?.();
        });
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden pt-28 pb-20">
      {/* Cinematic background layers */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(700px 500px at 72% 36%, rgba(64, 255, 0, 0.14), transparent 62%),
              radial-gradient(660px 460px at 34% 65%, rgba(124, 58, 237, 0.18), transparent 64%),
              radial-gradient(980px 580px at 50% -18%, rgba(255, 255, 255, 0.08), transparent 70%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.58))
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="hero-glow-orbit absolute left-1/2 top-[44%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.82] blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(64, 255, 0, 0.28) 0%, rgba(124, 58, 237, 0.2) 40%, transparent 72%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-3 pt-10 pb-20 sm:px-4 md:grid-cols-2 md:items-start md:gap-12 md:pt-14 md:pb-28 lg:px-5">
        <div className="max-w-[590px]">
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
            Available for freelance work
          </div>

          <h1 className="mt-6 text-[2.5rem] font-black leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
            <span className="hero-title-line block will-change-transform gradient-text">Bashar</span>
            <span className="hero-title-line block will-change-transform gradient-text">Emad</span>
          </h1>

          <p className="hero-subhead mt-5 max-w-[58ch] text-base leading-relaxed text-white/85 sm:text-lg">
            Senior Graphic Designer crafting premium visuals and clean UI/UX—turning chaos into
            clarity with brand systems, interfaces, and motion-ready assets.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 text-sm text-white/85 sm:grid-cols-3">
            <div className="hero-feature flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
              <Sparkles size={16} className="text-[#40FF00]" /> Premium visuals
            </div>
            <div className="hero-feature flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
              <Layout size={16} className="text-[#40FF00]" /> UI/UX systems
            </div>
            <div className="hero-feature flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
              <Palette size={16} className="text-[#40FF00]" /> Branding & identity
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="hero-cta hero-cta-magnetic relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[#40FF00] px-6 py-3 text-sm font-bold text-black transition active:scale-[0.98] hover:brightness-110"
            >
              <span className="hero-cta-shine absolute inset-[-24%] z-[1] pointer-events-none opacity-[0.32]" style={{
                background: "radial-gradient(180px 120px at center, rgba(255,255,255,0.32), rgba(64,255,0,0.2) 35%, transparent 72%)",
              }} />
              <span className="relative z-[2] inline-flex items-center gap-2">
                View Projects <ArrowRight size={16} />
              </span>
            </Link>

            <a
              href="/cv.pdf"
              download
              className="hero-cta hero-cta-magnetic relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition active:scale-[0.98] hover:border-[#40FF00]/40"
            >
              <span className="hero-cta-shine absolute inset-[-24%] z-[1] pointer-events-none opacity-[0.32]" style={{
                background: "radial-gradient(180px 120px at center, rgba(255,255,255,0.32), rgba(64,255,0,0.2) 35%, transparent 72%)",
              }} />
              <span className="relative z-[2]">Download CV</span>
            </a>

            <Link
              href="/#contact"
              className="hero-cta hero-cta-magnetic relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition active:scale-[0.98] hover:border-[#40FF00]/40"
            >
              <span className="hero-cta-shine absolute inset-[-24%] z-[1] pointer-events-none opacity-[0.32]" style={{
                background: "radial-gradient(180px 120px at center, rgba(255,255,255,0.32), rgba(64,255,0,0.2) 35%, transparent 72%)",
              }} />
              <span className="relative z-[2]">Contact</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="text-white/70">Find me on:</span>
            <a
              className="hero-social rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white/90 transition hover:border-[#40FF00]/50 hover:bg-black/45"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              in <span className="font-semibold text-white">LinkedIn</span>
            </a>
            <a
              className="hero-social rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white/90 transition hover:border-[#40FF00]/50 hover:bg-black/45"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              up <span className="font-semibold text-white">Upwork</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] md:mx-0 md:justify-self-end">
          <div className="hero-image-reveal overflow-hidden rounded-[24px] border border-white/15 bg-black/20">
            <div className="hero-image-wrap relative w-full will-change-transform">
              <Image
                src="/hero/bashar.png"
                alt="Bashar Emad — Senior Graphic Designer"
                width={800}
                height={800}
                priority
                sizes="(max-width: 768px) 90vw, 560px"
                className="h-auto w-full select-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-white/[0.04]" />
            </div>
          </div>
          <div className="pointer-events-none mx-auto mt-2 h-7 w-[340px] rounded-full bg-black/65 blur-2xl opacity-45" />
        </div>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
