"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, ALL_CATEGORIES } from "@/app/data/case-studies";
import Navbar from "@/app/components/sections/Navbar";
import Footer from "@/app/components/sections/Footer";
import Reveal from "@/app/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/app/components/ui/Stagger";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";

type SortOption = "newest" | "oldest" | "a-z";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let results = [...CASE_STUDIES];

    // Filter by category
    if (activeCategory !== "All") {
      results = results.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === "newest") {
      results.sort((a, b) => (b.year ?? "0").localeCompare(a.year ?? "0"));
    } else if (sort === "oldest") {
      results.sort((a, b) => (a.year ?? "0").localeCompare(b.year ?? "0"));
    } else {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [search, activeCategory, sort]);

  const categories = ["All", ...ALL_CATEGORIES];

  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <div className="container-lux section-pad">
        {/* Header */}
        <Reveal>
          <section className="glass glass-highlight rounded-3xl border border-white/10 p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.22em] text-[#40FF00]">Selected Work</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              Projects & Case Studies
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              A curated collection of branding, social, and packaging projects. Explore
              each case study for process notes, outcomes, and full visual galleries.
            </p>
          </section>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur-md transition focus:border-[#40FF00]/40 focus:outline-none focus:ring-1 focus:ring-[#40FF00]/30"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                      activeCategory === cat
                        ? "bg-[#40FF00]/20 text-[#40FF00] border border-[#40FF00]/30"
                        : "border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <SlidersHorizontal className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="appearance-none rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-8 text-xs text-white/80 backdrop-blur-md transition focus:border-[#40FF00]/40 focus:outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="a-z">A → Z</option>
                </select>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Results count */}
        <div className="mt-4 text-xs text-white/50">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </div>

        {/* Grid */}
        <Stagger>
          <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group glass glass-highlight glow-hover block overflow-hidden rounded-3xl border border-white/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-white/55">
                      <span>{project.category}</span>
                      {project.year ? <span>{project.year}</span> : null}
                    </div>

                    <h2 className="text-xl font-bold tracking-tight">{project.title}</h2>
                    <p className="text-sm leading-relaxed text-white/70 line-clamp-2">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {(project.tags ?? []).slice(0, 4).map((tag) => (
                        <span
                          key={`${project.slug}-${tag}`}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2 text-sm font-semibold text-[#40FF00] transition-transform duration-200 group-hover:translate-x-1">
                      View case study <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </section>
        </Stagger>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-white/60">No projects match your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 transition hover:border-[#40FF00]/40"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
