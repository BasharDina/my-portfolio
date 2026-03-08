"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "../ui/Reveal";
import { Stagger, StaggerItem } from "../ui/Stagger";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/app/data/case-studies";

export default function ProjectsPreview() {
  const featured = CASE_STUDIES.slice(0, 3);

  return (
    <section id="projects" className="py-20">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40FF00]">
                Selected Work
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Featured Projects</h2>
              <p className="mt-2 max-w-lg text-sm text-white/70">
                Highlights only — open the full portfolio for case studies and galleries.
              </p>
            </div>

            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#40FF00]/40 hover:shadow-[0_0_18px_rgba(64,255,0,0.12)]"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative mt-8">
            <Stagger>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <StaggerItem key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group glass glass-highlight glow-hover block overflow-hidden rounded-3xl border border-white/10"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-white/5">
                        <Image
                          src={p.cover}
                          alt={p.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute left-3 top-3 z-10 flex gap-2">
                          <Badge variant="secondary" className="glass text-[11px]">
                            {p.category}
                          </Badge>
                          {p.year && (
                            <Badge variant="secondary" className="glass text-[11px]">
                              {p.year}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-base font-bold text-white">{p.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2">
                          {p.subtitle}
                        </p>

                        {p.tags && p.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/65"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00] transition-transform duration-200 group-hover:translate-x-1">
                          View case study <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>

            <div className="mt-8 sm:hidden">
              <Link
                href="/projects"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#40FF00] px-5 py-3 text-sm font-bold text-black transition hover:brightness-110 active:scale-[0.98]"
              >
                View all projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
