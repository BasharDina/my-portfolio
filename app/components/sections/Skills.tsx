"use client";

import Reveal from "../ui/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Layout, Palette, Sparkles } from "lucide-react";
import { GlowLink } from "../ui/GlowButton";

const SERVICES = [
  {
    value: "uiux",
    title: "UI/UX Design",
    icon: Layout,
    badge: "Core",
    desc: "Clean interfaces with strong UX flow — designed to convert and feel premium.",
    bullets: ["User flows & wireframes", "High-fidelity UI", "Design system", "Responsive layout"],
    cta: "Start a project",
  },
  {
    value: "branding",
    title: "Branding",
    icon: Palette,
    badge: "Identity",
    desc: "Brand identity that looks sharp everywhere — from logo to visual system.",
    bullets: ["Logo & identity", "Typography + colors", "Brand guide", "Social templates"],
    cta: "Build my brand",
  },
  {
    value: "motion",
    title: "Motion",
    icon: Sparkles,
    badge: "Engagement",
    desc: "Motion-ready assets and visuals that elevate the product.",
    bullets: ["Micro-interactions", "Marketing visuals", "Hero graphics", "Direction"],
    cta: "Make it stand out",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Services</h2>
              <p className="mt-2 text-sm text-white/70">Premium output — clean, scalable, and consistent.</p>
            </div>

            <a href="#contact" className="hidden items-center gap-2 text-sm font-semibold text-[#40FF00] hover:opacity-90 sm:flex">
              Let’s talk <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <Tabs defaultValue="uiux" className="mt-10">
            <TabsList className="glass w-full grid grid-cols-3 rounded-2xl p-1">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <TabsTrigger key={s.value} value={s.value} className="gap-2 rounded-xl">
                    <Icon className="h-4 w-4 text-[#40FF00]" />
                    {s.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <TabsContent key={s.value} value={s.value} className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left: Main card */}
                    <div className="glass glass-hover glass-highlight glow-hover rounded-3xl p-6">
                      <div className="flex items-center gap-3">
                        <div className="glass-strong rounded-2xl p-2">
                          <Icon className="h-5 w-5 text-[#40FF00]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{s.title}</h3>
                            <Badge variant="secondary" className="glass">{s.badge}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3">
                        {s.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-2">
                            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#40FF00]/15">
                              <Check className="h-4 w-4 text-[#40FF00]" />
                            </span>
                            <div className="text-sm text-white/70">{b}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <GlowLink href="#contact" variant="primary" className="shine-btn gap-2">
                          {s.cta} <ArrowRight size={16} />
                        </GlowLink>
                        <GlowLink href="#projects" variant="secondary" className="shine-btn">
                          See Projects
                        </GlowLink>
                      </div>
                    </div>

                    {/* Right: Deliverables visual */}
                    <div className="glass glass-hover glass-highlight rounded-3xl p-6">
                      <div className="text-sm font-semibold">Deliverables</div>
                      <p className="mt-1 text-sm text-white/70">Organized files + premium presentation.</p>

                      <div
                        className="mt-6 rounded-3xl border border-white/10 p-5"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 20%, rgba(64,255,0,0.20), rgba(124,58,237,0.08), rgba(0,0,0,0) 60%)",
                        }}
                      >
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="h-2 w-20 rounded bg-[#40FF00]/40" />
                            <div className="mt-3 h-24 rounded-xl bg-[#40FF00]/10" />
                          </div>
                          <div className="col-span-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="h-2 w-12 rounded bg-[#40FF00]/40" />
                            <div className="mt-3 h-24 rounded-xl bg-[#40FF00]/10" />
                          </div>
                          <div className="col-span-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="h-2 w-10 rounded bg-[#40FF00]/40" />
                            <div className="mt-3 h-24 rounded-xl bg-[#40FF00]/10" />
                          </div>
                          <div className="col-span-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="h-2 w-16 rounded bg-[#40FF00]/40" />
                            <div className="mt-3 h-24 rounded-xl bg-[#40FF00]/10" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
          {/* Stats strip (Agency proof) */}
<div className="mt-10 grid gap-4 md:grid-cols-4">
  {[
    { k: "120+", v: "Designs delivered" },
    { k: "40+", v: "Happy clients" },
    { k: "5★", v: "Average rating" },
    { k: "48h", v: "Avg. delivery" },
  ].map((s) => (
    <div
      key={s.v}
      className="glass glass-hover glass-highlight glow-hover rounded-3xl p-5"
    >
      <div className="text-2xl font-extrabold tracking-tight text-white">
        <span className="text-[#40FF00]">{s.k}</span>
      </div>
      <div className="mt-1 text-sm text-white/70">{s.v}</div>

      <div
        className="mt-4 h-[2px] w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(64,255,0,0.55), rgba(124,58,237,0.22), rgba(0,0,0,0))",
        }}
      />
    </div>
  ))}
</div>
        </div>
      </Reveal>
    </section>
  );
}