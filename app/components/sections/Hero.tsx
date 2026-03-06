"use client";

import Reveal from "../ui/Reveal";
import { GlowLink } from "../ui/GlowButton";
import { Sparkles, Layout, Palette, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
        <div className="absolute -left-52 top-10 h-[620px] w-[620px] rounded-full bg-[#7C3AED]/10 blur-3xl" />
        <div className="absolute -right-52 bottom-10 h-[620px] w-[620px] rounded-full bg-[#40FF00]/10 blur-3xl" />
      </div>

      <Reveal>
        <div className="mx-auto grid max-w-[1320px] gap-10 px-3 pt-10 pb-20 sm:px-4 md:grid-cols-2 md:items-start md:gap-12 md:pt-14 md:pb-28 lg:px-5">
          {/* Left */}
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
              Available for freelance work
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Bashar <span className="text-[#40FF00]">Emad</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              Senior Graphic Designer crafting premium visuals and clean UI/UX—turning chaos into
              clarity with brand systems, interfaces, and motion-ready assets.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#40FF00]" /> Premium visuals
              </div>
              <div className="flex items-center gap-2">
                <Layout size={16} className="text-[#40FF00]" /> UI/UX systems
              </div>
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-[#40FF00]" /> Branding & identity
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GlowLink href="/projects" variant="primary" className="gap-2 shine-btn">
  View Projects <ArrowRight size={16} />
</GlowLink>

              <GlowLink href="/cv.pdf" download variant="secondary" className="shine-btn">
                Download CV
              </GlowLink>

              <GlowLink href="#contact" variant="secondary" className="shine-btn">
                Contact
              </GlowLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span>Find me on:</span>

              <a
                className="shine-btn rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-[#40FF00]/50"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                in <span className="font-semibold text-white/80">LinkedIn</span>
              </a>

              <a
                className="shine-btn rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-[#40FF00]/50"
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
              className="pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-95"
              style={{
                background:
                  "radial-gradient(circle, rgba(64,255,0,0.34) 0%, rgba(124,58,237,0.18) 35%, rgba(0,0,0,0) 70%)",
              }}
            />

            <img
              src="/hero/bashar.png"
              alt="Bashar Emad"
              className="block w-full select-none drop-shadow-[0_60px_140px_rgba(0,0,0,0.65)] md:mt-1"
            />

            <div className="pointer-events-none mx-auto mt-2 h-7 w-[340px] rounded-full bg-black/55 blur-2xl opacity-40" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}