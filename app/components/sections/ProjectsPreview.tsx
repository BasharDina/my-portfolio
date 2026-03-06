"use client";

import Image from "next/image";
import Reveal from "../ui/Reveal";
import { Stagger, StaggerItem } from "../ui/Stagger";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { GlowLink } from "../ui/GlowButton";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PREVIEW = [
  {
    title: "Social Media Album",
    desc: "Campaign-ready social layouts with strong hierarchy and reusable templates.",
    category: "Social",
    cover: "/projects/p1.png",
  },
  {
    title: "Branding Identity",
    desc: "A scalable identity system with guidelines and premium applications.",
    category: "Branding",
    cover: "/projects/p2.png",
  },
  {
    title: "Packaging Design",
    desc: "Premium packaging layout + mockups and production-ready exports.",
    category: "Packaging",
    cover: "/projects/p3.png",
  },
];

export default function ProjectsPreview() {
  return (
    <section id="projects" className="py-20">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
              <p className="mt-2 text-sm text-white/70">
                Highlights only — open the full portfolio for case studies and galleries.
              </p>
            </div>

            <GlowLink href="/projects" variant="secondary" className="shine-btn hidden sm:inline-flex gap-2">
              View all projects <ArrowRight size={16} />
            </GlowLink>
          </div>

          <div className="relative mt-8">
            <Stagger>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PREVIEW.map((p) => (
                  <StaggerItem key={p.title}>
                    <motion.a
                      href="/projects"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25, ease }}
                      className="glass glass-highlight glow-hover block overflow-hidden rounded-3xl border border-white/10"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-white/5">
                        <Image
                          src={p.cover}
                          alt={p.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition duration-300 hover:scale-[1.03]"
                        />
                        <div className="absolute left-3 top-3 z-10">
                          <Badge variant="secondary" className="glass">
                            {p.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-base font-bold text-white">{p.title}</div>
                        <p className="mt-2 text-sm text-white/70">{p.desc}</p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00]">
                          View case study <ArrowRight size={16} />
                        </div>
                      </div>
                    </motion.a>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>

            <div className="mt-8 sm:hidden">
              <GlowLink href="/projects" variant="primary" className="shine-btn w-full justify-center gap-2">
                View all projects <ArrowRight size={16} />
              </GlowLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}