"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialClients } from "@/app/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function SocialPinnedGSAP() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - section.clientWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`, // طول السكروول
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-8">
      {/* Header */}
      <div className="mx-auto max-w-[1320px] px-4 pb-6">
        <h2 className="text-3xl font-bold text-white">Social Clients</h2>
        <p className="mt-2 text-sm text-white/70">
          Vertical scroll controls horizontal showcase (GSAP pinned).
        </p>
      </div>

      {/* Track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {socialClients.map((c) => (
            <div
              key={c.name}
              className="w-[520px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="relative h-[300px] bg-black/20">
                <Image
                  src={c.cover || c.posts?.[0] || "/projects/p1.png"}
                  alt={c.name}
                  fill
                  className="object-cover"
                  sizes="520px"
                />
                <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                  Social Media
                </div>
              </div>

              <div className="p-6">
                <div className="text-lg font-bold text-white">{c.name}</div>
                <div className="mt-2 text-sm text-white/70">{c.posts.length} posts • click to open</div>

                <div className="mt-5 text-sm font-semibold text-[#40FF00]">
                  Open album →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* subtle right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#020617] to-transparent" />
      </div>
    </section>
  );
}