"use client";

import { Megaphone, Palette, Package, Check, ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Design",
    points: [
      "Creative campaign visuals",
      "Platform-ready post systems",
      "Consistent branded content",
    ],
    deliverables: [
      "Instagram & Facebook posts",
      "Story and ad creatives",
      "Reusable content templates",
    ],
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    points: [
      "Logo and visual identity design",
      "Color and typography systems",
      "Clear and modern brand direction",
    ],
    deliverables: [
      "Logo package",
      "Brand identity system",
      "Basic brand guidelines",
    ],
  },
  {
    icon: Package,
    title: "Print & Packaging",
    points: [
      "Packaging concepts and layouts",
      "Print-ready marketing materials",
      "Clean production-focused execution",
    ],
    deliverables: [
      "Packaging design",
      "Flyers, brochures, and posters",
      "Print-ready export files",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              What I offer
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Premium Creative Services
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Design services tailored for brands that need strong visuals, clear identity,
              and polished execution across digital and print touchpoints.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="glass glass-highlight rounded-[2rem] border border-white/10 p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                      <Icon className="h-6 w-6 text-[#40FF00]" />
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-white/45" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold tracking-tight sm:text-[2rem]">
                    {service.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    {service.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-white/78">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#40FF00]/10">
                          <Check className="h-4 w-4 text-[#40FF00]" />
                        </span>
                        <span className="text-base leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Deliverables
                    </p>

                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/72">
                      {service.deliverables.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}