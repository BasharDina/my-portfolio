"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GlowLink } from "../ui/GlowButton";
import { Sparkles, Layout, Palette, ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const magneticRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 }
      )
        .fromTo(
          ".hero-title-line",
          { yPercent: 115, opacity: 0, rotateX: 12, transformOrigin: "0% 100%" },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .fromTo(
          ".hero-copy",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "-=0.55"
        )
        .fromTo(
          ".hero-feature",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          ".hero-cta",
          { y: 18, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.07 },
          "-=0.42"
        )
        .fromTo(
          ".hero-social",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
          "-=0.4"
        )
        .fromTo(
          ".hero-visual-glow",
          { scale: 0.9, opacity: 0, filter: "blur(24px)" },
          { scale: 1, opacity: 0.95, filter: "blur(0px)", duration: 1.2 },
          "<"
        )
        .fromTo(
          ".hero-image-reveal",
          { clipPath: "inset(0% 0% 100% 0% round 24px)" },
          { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.15, ease: "power4.out" },
          "-=0.95"
        )
        .fromTo(
          ".hero-image-wrap",
          { y: 30, opacity: 0, rotate: -1.5, scale: 1.08 },
          { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.2, ease: "power4.out" },
          "-=0.8"
        );

      const ctas = gsap.utils.toArray<HTMLAnchorElement>(".hero-cta-magnetic");
      ctas.forEach((el) => {
        const strength = 0.24;
        const enter = () => gsap.to(el, { scale: 1.025, duration: 0.28, ease: "power3.out" });
        const leave = () =>
          gsap.to(el, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.45)",
          });
        const move = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          gsap.to(el, {
            x: x * strength,
            y: y * strength,
            duration: 0.35,
            ease: "power2.out",
          });
        };

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);

        magneticRefs.current.push(el);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden border-b">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
        <div className="absolute -left-52 top-10 h-[620px] w-[620px] rounded-full bg-[#7C3AED]/10 blur-3xl" />
        <div className="absolute -right-52 bottom-10 h-[620px] w-[620px] rounded-full bg-[#40FF00]/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-3 pt-10 pb-20 sm:px-4 md:grid-cols-2 md:items-start md:gap-12 md:pt-14 md:pb-28 lg:px-5">
        {/* Left */}
        <div className="max-w-[560px]">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
              Available for freelance work
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              <span className="hero-title-line hero-gradient-title block will-change-transform">Bashar</span>
              <span className="hero-title-line hero-gradient-title block will-change-transform">Emad</span>
            </h1>

            <p className="hero-copy mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              Senior Graphic Designer crafting premium visuals and clean UI/UX—turning chaos into
              clarity with brand systems, interfaces, and motion-ready assets.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-3">
              <div className="hero-feature flex items-center gap-2">
                <Sparkles size={16} className="text-[#40FF00]" /> Premium visuals
              </div>
              <div className="hero-feature flex items-center gap-2">
                <Layout size={16} className="text-[#40FF00]" /> UI/UX systems
              </div>
              <div className="hero-feature flex items-center gap-2">
                <Palette size={16} className="text-[#40FF00]" /> Branding & identity
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GlowLink href="/projects" variant="primary" className="hero-cta hero-cta-magnetic gap-2 shine-btn">
                View Projects <ArrowRight size={16} />
              </GlowLink>

              <GlowLink href="/cv.pdf" download variant="secondary" className="hero-cta hero-cta-magnetic shine-btn">
                Download CV
              </GlowLink>

              <GlowLink href="/#contact" variant="secondary" className="hero-cta hero-cta-magnetic shine-btn">
                Contact
              </GlowLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span>Find me on:</span>

              <a
                className="hero-social shine-btn rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-[#40FF00]/50"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                in <span className="font-semibold text-white/80">LinkedIn</span>
              </a>

              <a
                className="hero-social shine-btn rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-[#40FF00]/50"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                up <span className="font-semibold text-white/80">Upwork</span>
              </a>
            </div>
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-[560px] md:mx-0 md:justify-self-end">
            <div
              className="hero-visual-glow pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-95"
              style={{
                background:
                  "radial-gradient(circle, rgba(64,255,0,0.34) 0%, rgba(124,58,237,0.18) 35%, rgba(0,0,0,0) 70%)",
              }}
            />

            {/* ✅ Image optimized */}
            <div className="hero-image-reveal overflow-hidden rounded-[24px]">
              <div className="hero-image-wrap relative w-full will-change-transform">
              <Image
                src="/hero/bashar.png"
                alt="Bashar Emad"
                width={1200}
                height={1200}
                priority
                className="h-auto w-full select-none"
              />
              </div>
            </div>

            <div className="pointer-events-none mx-auto mt-2 h-7 w-[340px] rounded-full bg-black/55 blur-2xl opacity-40" />
        </div>
      </div>
    </section>
  );
}