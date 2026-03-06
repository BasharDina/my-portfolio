"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "../ui/Reveal";
import { Stagger, StaggerItem } from "../ui/Stagger";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
} from "lucide-react";

type Category = "All" | "Social" | "Branding" | "Packaging";
type AlbumImage = { src: string; label?: string };

type CaseStudy = {
  overview: string;
  role: string[];
  deliverables: string[];
  tools: string[];
  outcome: string[];
};

type Project = {
  title: string;
  desc: string;
  tags: string[];
  cover?: string;
  live?: string;
  upwork?: string;
  album?: AlbumImage[];
  category: Exclude<Category, "All">;
  caseStudy: CaseStudy;
};

type SortMode = "featured" | "az" | "category";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Search highlight helpers ---------- */
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  const safe = escapeRegExp(q);
  const parts = text.split(new RegExp(`(${safe})`, "ig"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-md bg-[#40FF00]/25 px-1 text-white"
            style={{ boxShadow: "0 0 18px rgba(64,255,0,0.18)" }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
/* -------------------------------------------- */

export default function Projects() {
  // ===== DATA =====
  const PROJECTS: Project[] = useMemo(
    () => [
      {
        title: "Social Media Album",
        desc: "A curated set of social media posts and ad creatives.",
        tags: ["Social", "Campaign", "Design"],
        cover: "/projects/p1.png",
        category: "Social",
        live: "#",
        upwork: "#",
        album: [
          { src: "/projects/social/1.png", label: "Post 01" },
          { src: "/projects/social/2.png", label: "Post 02" },
          { src: "/projects/social/3.png", label: "Post 03" },
          { src: "/projects/social/4.png", label: "Post 04" },
        ],
        caseStudy: {
          overview:
            "Designed a consistent social system for a campaign — clean layout, strong hierarchy, and motion-ready compositions.",
          role: ["Art direction", "Layout system", "Ad variations"],
          deliverables: ["Carousel posts", "Ad creatives", "Story templates", "Export-ready files"],
          tools: ["Figma", "Photoshop", "Illustrator"],
          outcome: ["Consistent visual identity", "Faster content production", "High-quality, reusable templates"],
        },
      },
      {
        title: "Branding Identity",
        desc: "Logo + identity system + guidelines and applications.",
        tags: ["Branding", "Identity", "System"],
        cover: "/projects/p2.png",
        category: "Branding",
        live: "#",
        upwork: "#",
        album: [
          { src: "/projects/branding/1.png", label: "Logo" },
          { src: "/projects/branding/2.png", label: "Colors" },
          { src: "/projects/branding/3.png", label: "Mockup" },
        ],
        caseStudy: {
          overview:
            "Built a brand system that scales across digital and print, with clear logo usage, spacing rules, and typography.",
          role: ["Brand strategy", "Identity design", "Guidelines"],
          deliverables: ["Logo suite", "Color & type system", "Brand guide", "Mockups"],
          tools: ["Illustrator", "Photoshop", "Figma"],
          outcome: ["Stronger brand recall", "Consistency across channels", "Professional, deploy-ready kit"],
        },
      },
      {
        title: "Packaging Design",
        desc: "Packaging concepts with 3D mockups and print-ready layout.",
        tags: ["Packaging", "Print", "Mockup"],
        cover: "/projects/p3.png",
        category: "Packaging",
        live: "#",
        upwork: "#",
        album: [
          { src: "/projects/packaging/1.png", label: "Front" },
          { src: "/projects/packaging/2.png", label: "Back" },
          { src: "/projects/packaging/3.png", label: "3D Mockup" },
        ],
        caseStudy: {
          overview:
            "Created packaging that looks premium on shelf and online, with clear info hierarchy and production-ready specs.",
          role: ["Packaging layout", "Mockups", "Print prep"],
          deliverables: ["Dieline layout", "Label variants", "3D mockups", "Print assets"],
          tools: ["Illustrator", "Photoshop", "Blender"],
          outcome: ["Premium shelf presence", "Clear information layout", "Ready for production"],
        },
      },
    ],
    []
  );

  // ===== FILTERS / CONTROLS =====
  const [tab, setTab] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("featured");

  const baseFiltered = useMemo(() => {
    const byTab = tab === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === tab);

    const q = query.trim().toLowerCase();
    if (!q) return byTab;

    return byTab.filter((p) => {
      const haystack = [
        p.title,
        p.desc,
        p.category,
        ...p.tags,
        ...p.caseStudy.tools,
        ...p.caseStudy.role,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [PROJECTS, tab, query]);

  const filtered = useMemo(() => {
    const list = [...baseFiltered];

    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "category") {
      const order = { Social: 1, Branding: 2, Packaging: 3 } as const;
      list.sort((a, b) => order[a.category] - order[b.category]);
    }

    return list;
  }, [baseFiltered, sort]);

  // ===== DIALOG STATE =====
  const [open, setOpen] = useState(false);
  const [activeIndexProject, setActiveIndexProject] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [dialogTab, setDialogTab] = useState<"overview" | "gallery" | "details">("overview");

  const activeProject = filtered[activeIndexProject] ?? null;
  const activeAlbum = activeProject?.album || [];
  const activeSlide = activeAlbum[activeSlideIndex];

  const totalProjects = filtered.length || 1;
  const projectNumber = Math.min(activeIndexProject + 1, totalProjects);

  const totalSlides = activeAlbum.length || 1;
  const slideNumber = Math.min(activeSlideIndex + 1, totalSlides);
  const progressPct = totalSlides ? Math.round((slideNumber / totalSlides) * 100) : 0;

  function openProjectByIndex(i: number) {
    setActiveIndexProject(i);
    setActiveSlideIndex(0);
    setDialogTab("overview");
    setOpen(true);
  }

  function nextProject() {
    setActiveIndexProject((i) => (i + 1) % Math.max(filtered.length, 1));
    setActiveSlideIndex(0);
    setDialogTab("overview");
  }

  function prevProject() {
    setActiveIndexProject((i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    setActiveSlideIndex(0);
    setDialogTab("overview");
  }

  function nextSlide() {
    if (!activeAlbum.length) return;
    setActiveSlideIndex((i) => (i + 1) % activeAlbum.length);
  }
  function prevSlide() {
    if (!activeAlbum.length) return;
    setActiveSlideIndex((i) => (i - 1 + activeAlbum.length) % activeAlbum.length);
  }

  // Keyboard nav
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") dialogTab === "gallery" ? nextSlide() : nextProject();
      if (e.key === "ArrowLeft") dialogTab === "gallery" ? prevSlide() : prevProject();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, dialogTab, activeAlbum.length, filtered.length]);

  // Reset slide when switching to gallery
  useEffect(() => {
    if (!open) return;
    if (dialogTab === "gallery") setActiveSlideIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogTab, open, activeProject?.title]);

  // Keep active index safe when filters reduce list
  useEffect(() => {
    if (activeIndexProject > Math.max(filtered.length - 1, 0)) {
      setActiveIndexProject(0);
      setActiveSlideIndex(0);
      setDialogTab("overview");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length]);

  return (
    <section id="projects" className="py-20">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
              <p className="mt-2 text-sm text-white/70">
                Search, sort, and open any card to view a full case study + gallery.
              </p>
            </div>

            <a
              href="/#contact"
              className="hidden items-center gap-2 text-sm font-semibold text-[#40FF00] hover:opacity-90 sm:flex"
            >
              Hire me <ArrowRight size={16} />
            </a>
          </div>

          {/* ✅ Sticky controls */}
          <div className="sticky top-3 z-40 mt-8">
            <div className="glass glass-highlight rounded-3xl border border-white/10 p-3">
              <div className="grid gap-3 md:grid-cols-12">
                <div className="md:col-span-8">
                  <div className="rounded-2xl px-3 py-2 flex items-center gap-2 border border-white/10 bg-white/5">
                    <Search className="h-4 w-4 text-[#40FF00]" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search projects… (title, tags, tools)"
                      className="border-0 bg-transparent text-white placeholder:text-white/35 focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="rounded-2xl px-3 py-2 flex items-center gap-2 border border-white/10 bg-white/5">
                    <ArrowUpDown className="h-4 w-4 text-[#40FF00]" />
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortMode)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                    >
                      <option value="featured" className="bg-[#020617]">Featured</option>
                      <option value="az" className="bg-[#020617]">A → Z</option>
                      <option value="category" className="bg-[#020617]">By Category</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Tabs value={tab} onValueChange={(v) => setTab(v as Category)} className="w-full md:w-auto">
                  <TabsList className="w-full grid grid-cols-4 rounded-2xl p-1 border border-white/10 bg-white/5">
                    <TabsTrigger value="All" className="rounded-xl">All</TabsTrigger>
                    <TabsTrigger value="Social" className="rounded-xl">Social</TabsTrigger>
                    <TabsTrigger value="Branding" className="rounded-xl">Branding</TabsTrigger>
                    <TabsTrigger value="Packaging" className="rounded-xl">Packaging</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center justify-between gap-3 text-xs text-white/55 md:justify-end">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Results: <span className="text-white/80 font-semibold">{filtered.length}</span>
                  </span>

                  <button
                    onClick={() => {
                      setQuery("");
                      setSort("featured");
                      setTab("All");
                    }}
                    className="text-white/60 hover:text-white"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="relative mt-10">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(64,255,0,0.14) 0%, rgba(124,58,237,0.08) 35%, rgba(0,0,0,0) 70%)",
              }}
            />

            <Stagger>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, idx) => (
                  <StaggerItem key={p.title}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25, ease }}
                      onClick={() => openProjectByIndex(idx)}
                      className="glass glass-highlight glow-hover cursor-pointer rounded-3xl overflow-hidden border border-white/10"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-white/5">
                        {p.cover ? (
                          <img
                            src={p.cover}
                            alt={p.title}
                            className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[#40FF00]/15 via-transparent to-transparent" />
                        )}

                        <div className="absolute left-3 top-3">
                          <Badge variant="secondary" className="glass">{p.category}</Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-base font-bold">
                          <HighlightText text={p.title} query={query} />
                        </div>

                        <p className="mt-2 text-sm text-white/70">
                          <HighlightText text={p.desc} query={query} />
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <Badge key={t} variant="secondary" className="glass text-xs">
                              <HighlightText text={t} query={query} />
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00]">
                          Open Case Study <ArrowRight size={16} />
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>

            {filtered.length === 0 ? (
              <div className="mt-10 glass glass-highlight rounded-3xl p-8 text-center text-white/70 border border-white/10">
                No results found. Try a different search term.
              </div>
            ) : null}
          </div>

          {/* Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl glass-strong border-white/10">
              {activeProject ? (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <DialogTitle className="text-xl">{activeProject.title}</DialogTitle>
                        <p className="mt-1 text-sm text-white/70">{activeProject.desc}</p>

                        <div className="mt-2 inline-flex items-center gap-2 text-xs text-white/60">
                          <span className="glass rounded-full px-3 py-1 border border-white/10">
                            Project {projectNumber} / {totalProjects}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
                          <span className="glass rounded-full px-3 py-1 border border-white/10">
                            {activeProject.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="secondary" className="shine-btn" onClick={prevProject}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" className="shine-btn" onClick={nextProject}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="mt-4">
                    <Tabs value={dialogTab} onValueChange={(v) => setDialogTab(v as any)}>
                      <TabsList className="glass w-full grid grid-cols-3 rounded-2xl p-1">
                        <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
                        <TabsTrigger value="gallery" className="rounded-xl">Gallery</TabsTrigger>
                        <TabsTrigger value="details" className="rounded-xl">Details</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease }}
                            className="glass glass-highlight rounded-3xl p-6 border border-white/10"
                          >
                            <div className="text-sm font-semibold">Overview</div>
                            <p className="mt-2 text-sm text-white/70">{activeProject.caseStudy.overview}</p>

                            <div className="mt-6 grid gap-3">
                              <div className="text-xs font-semibold text-white/60">Role</div>
                              <div className="flex flex-wrap gap-2">
                                {activeProject.caseStudy.role.map((x) => (
                                  <Badge key={x} variant="secondary" className="glass text-xs">{x}</Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease, delay: 0.06 }}
                            className="glass glass-highlight rounded-3xl p-6 border border-white/10"
                          >
                            <div className="text-sm font-semibold">Outcome</div>
                            <ul className="mt-3 space-y-2 text-sm text-white/70">
                              {activeProject.caseStudy.outcome.map((x) => (
                                <li key={x} className="flex items-start gap-2">
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-6 flex flex-wrap gap-3">
                              {activeProject.live ? (
                                <Button asChild className="shine-btn bg-[#40FF00] text-black hover:brightness-110">
                                  <a href={activeProject.live} target="_blank" rel="noreferrer">
                                    Live <ExternalLink className="ml-2 h-4 w-4" />
                                  </a>
                                </Button>
                              ) : null}

                              {activeProject.upwork ? (
                                <Button asChild variant="secondary" className="shine-btn">
                                  <a href={activeProject.upwork} target="_blank" rel="noreferrer">
                                    Upwork <ExternalLink className="ml-2 h-4 w-4" />
                                  </a>
                                </Button>
                              ) : null}

                              <Button asChild variant="secondary" className="shine-btn">
                                <a href="/#contact">Start a project</a>
                              </Button>
                            </div>
                          </motion.div>
                        </div>
                      </TabsContent>

                      <TabsContent value="gallery" className="mt-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                              <Carousel opts={{ loop: true }} className="w-full" key={activeProject.title}>
                                <CarouselContent>
                                  {activeAlbum.map((img, idx) => (
                                    <CarouselItem key={img.src}>
                                      <div className="relative aspect-video w-full">
                                        <img
                                          src={img.src}
                                          alt={img.label || `Slide ${idx + 1}`}
                                          className="h-full w-full object-cover"
                                          onClick={() => setActiveSlideIndex(idx)}
                                        />
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-3" onClick={prevSlide} />
                                <CarouselNext className="right-3" onClick={nextSlide} />
                              </Carousel>
                            </div>

                            <div className="mt-3 flex flex-col gap-2">
                              <div className="flex items-center justify-between gap-3">
                                <Badge variant="secondary" className="glass">
                                  {activeSlide?.label || `Slide ${slideNumber}`}
                                </Badge>

                                <div className="flex items-center gap-3 text-xs text-white/60">
                                  <span className="glass rounded-full px-3 py-1 border border-white/10">
                                    Slide {slideNumber} / {totalSlides}
                                  </span>
                                  <span>Use ← → arrows</span>
                                </div>
                              </div>

                              <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                                <motion.div
                                  className="h-full rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progressPct}%` }}
                                  transition={{ duration: 0.45, ease }}
                                  style={{
                                    background:
                                      "linear-gradient(90deg, rgba(64,255,0,0.85), rgba(124,58,237,0.25))",
                                    boxShadow: "0 0 22px rgba(64,255,0,0.22)",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-5 gap-2">
                              {activeAlbum.slice(0, 10).map((img, idx) => (
                                <button
                                  key={img.src}
                                  onClick={() => setActiveSlideIndex(idx)}
                                  className={[
                                    "overflow-hidden rounded-xl border bg-white/5 transition",
                                    idx === activeSlideIndex
                                      ? "border-[#40FF00]/70"
                                      : "border-white/10 hover:border-[#40FF00]/40",
                                  ].join(" ")}
                                >
                                  <img src={img.src} alt="thumb" className="h-14 w-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease }}
                            className="glass glass-highlight rounded-3xl p-6 border border-white/10"
                          >
                            <div className="text-sm font-semibold">Gallery Notes</div>
                            <p className="mt-2 text-sm text-white/70">
                              هنا بنعرض الصور كـAlbum، وبعدين بنضيف captions ووصف لكل لقطة حسب مشروعك الحقيقي.
                            </p>

                            <div className="mt-6">
                              <div className="text-xs font-semibold text-white/60">Tools</div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {activeProject.caseStudy.tools.map((x) => (
                                  <Badge key={x} variant="secondary" className="glass text-xs">{x}</Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </TabsContent>

                      <TabsContent value="details" className="mt-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease }}
                            className="glass glass-highlight rounded-3xl p-6 border border-white/10"
                          >
                            <div className="text-sm font-semibold">Deliverables</div>
                            <ul className="mt-3 space-y-2 text-sm text-white/70">
                              {activeProject.caseStudy.deliverables.map((x) => (
                                <li key={x} className="flex items-start gap-2">
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease, delay: 0.06 }}
                            className="glass glass-highlight rounded-3xl p-6 border border-white/10"
                          >
                            <div className="text-sm font-semibold">Tags</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {activeProject.tags.map((t) => (
                                <Badge key={t} variant="secondary" className="glass text-xs">{t}</Badge>
                              ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                              <div className="text-sm font-semibold">Next step</div>
                              <p className="mt-1 text-sm text-white/70">
                                ابعت brief بسيط في Contact، وأنا برجعلك بخطة تنفيذ + timeline + deliverables.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="mt-8">
                    <div className="text-sm font-semibold text-white/80">Related projects</div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {filtered.slice(0, 3).map((p, idx) => (
                        <button
                          key={p.title}
                          onClick={() => openProjectByIndex(idx)}
                          className={[
                            "glass glass-hover glass-highlight rounded-2xl p-4 text-left transition border",
                            idx === activeIndexProject ? "border-[#40FF00]/45" : "border-white/10",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-bold text-white">{p.title}</div>
                            <Badge variant="secondary" className="glass text-xs">{p.category}</Badge>
                          </div>
                          <div className="mt-1 text-xs text-white/60 line-clamp-2">{p.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </DialogContent>
          </Dialog>
        </div>
      </Reveal>
    </section>
  );
}