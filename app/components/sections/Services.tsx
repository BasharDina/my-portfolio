"use client";

import { Layout, Palette, Sparkles, Check, ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";

const SERVICES = [
  {
    title: "UI/UX Design",
    icon: Layout,
    bullets: ["User research & flows", "Wireframes to high-fidelity UI", "Accessible responsive layouts"],
    deliverables: ["Figma design file", "Interactive prototype", "UI kit + style guide"],
  },
  {
    title: "Branding",
    icon: Palette,
    bullets: ["Strategic visual direction", "Logo and identity system", "Consistent cross-platform look"],
    deliverables: ["Primary/secondary logo pack", "Color + typography system", "Brand guidelines PDF"],
  },
  {
    title: "Motion",
    icon: Sparkles,
    bullets: ["Story-driven motion concepts", "Smooth micro-interactions", "Social and product animations"],
    deliverables: ["Animation source files", "Export-ready assets", "Motion usage guidance"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="mb-10 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40FF00]">What I Offer</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Premium Creative Services</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
              End-to-end craft across interface design, branding, and motion — built to look sharp and perform.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group glass glass-hover glass-highlight glow-hover relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-7 transition-transform duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div
                    className="pointer-events-none absolute -top-16 -right-14 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                    style={{ background: "radial-gradient(circle, rgba(64,255,0,0.25), rgba(124,58,237,0.18), transparent 65%)" }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="glass-strong rounded-2xl p-2.5">
                      <Icon className="h-5 w-5 text-[#40FF00]" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#40FF00]" />
                  </div>

                  <h3 className="relative z-10 mt-5 text-xl font-semibold">{service.title}</h3>

                  <ul className="relative z-10 mt-4 space-y-2.5">
                    {service.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#40FF00]/15">
                          <Check className="h-3.5 w-3.5 text-[#40FF00]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/55">Deliverables</p>
                    <ul className="mt-2.5 space-y-1.5 text-sm text-white/75">
                      {service.deliverables.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
