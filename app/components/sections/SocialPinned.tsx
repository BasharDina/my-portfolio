"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { socialClients } from "@/app/data/projects";
import { m, useReducedMotion } from "framer-motion";

type Album = {
  title: string;
  meta?: string;
  cover: string;
  images: string[];
};

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

export default function SocialPinned() {
  const reduceMotion = useReducedMotion();

  const albums: Album[] = useMemo(
    () =>
      socialClients.map((c) => ({
        title: c.name,
        meta: c.niche || "Social Media",
        cover: c.cover, // ممكن يكون 01.png مؤقتاً
        images: c.posts,
      })),
    []
  );

  const shellRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [active, setActive] = useState(0);

  // ===== Dialog
  const [open, setOpen] = useState(false);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

  const activeAlbum = albums[activeAlbumIndex];
  const imgs = activeAlbum?.images || [];

  function openAlbum(i: number) {
    setActiveAlbumIndex(i);
    setOpen(true);
  }
  function nextAlbum() {
    setActiveAlbumIndex((i) => (i + 1) % Math.max(albums.length, 1));
  }
  function prevAlbum() {
    setActiveAlbumIndex((i) => (i - 1 + Math.max(albums.length, 1)) % Math.max(albums.length, 1));
  }

  // ===== Shell height: كل ما زاد عدد الشركات زاد طول السكروول
  // 0.85 يعطي إحساس سريع بس مش مزعج
  const scrollPages = Math.max(3, Math.round(albums.length * 0.85));
  const shellHeight = `calc(${scrollPages} * 100vh)`;

  // ===== Scroll → progress
  useEffect(() => {
    if (reduceMotion) return;
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;

    const onScroll = () => {
      const rect = shell.getBoundingClientRect();
      const shellTop = rect.top;
      const shellHeightPx = shell.offsetHeight;

      // shellTop: 0 عند بداية pin
      // نحتاج progress من 0→1 خلال طول السكشن ناقص viewport
      const start = 0;
      const end = -(shellHeightPx - window.innerHeight); // negative

      const t = clamp((shellTop - start) / (end - start));
      setProgress(t);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  // ===== Apply translateX + active card
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxX = track.scrollWidth - track.clientWidth;
    const x = reduceMotion ? 0 : -maxX * progress;
    track.style.transform = `translate3d(${x}px, 0, 0)`;

    // active index based on progress
    if (!albums.length) return;
    const idx = Math.round(progress * (albums.length - 1));
    setActive(clamp(idx / (albums.length - 1 || 1)) * (albums.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, reduceMotion]);

  // ===== Active index as integer
  const activeIndex = useMemo(() => {
    if (!albums.length) return 0;
    return Math.max(0, Math.min(albums.length - 1, Math.round(progress * (albums.length - 1))));
  }, [progress, albums.length]);

  // ===== Fallback cover if missing
  function safeCover(a: Album) {
    return a.cover || a.images?.[0] || "/projects/p1.png";
  }

  return (
    <section id="social" className="py-14">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Social Clients</h2>
              <p className="mt-2 text-sm text-white/70">
                Scroll down — the gallery moves sideways. Click any card to open the album.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
              <span>Vertical scroll → Horizontal showcase</span>
            </div>
          </div>

          <div ref={shellRef} className="hscroll-shell mt-8" style={{ height: shellHeight }}>
            <div className="hscroll-sticky glass glass-highlight border border-white/10 relative">
              <div className="h-full w-full p-5 relative">
                {/* Progress row */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/60 w-10">{Math.round(progress * 100)}%</div>

                  <div className="h-2 flex-1 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(progress * 100)}%`,
                        background:
                          "linear-gradient(90deg, rgba(64,255,0,0.98), rgba(64,255,0,0.16))",
                        boxShadow: "0 0 22px rgba(64,255,0,0.22)",
                      }}
                    />
                  </div>

                  <a
                    href="/#contact"
                    className="text-xs font-semibold text-[#40FF00] hover:opacity-90"
                  >
                    Contact <ArrowRight size={14} className="inline-block ml-1" />
                  </a>
                </div>

                {/* Track */}
                <div className="relative h-[calc(100%-40px)]">
                  <div ref={trackRef} className="hscroll-track">
                    {albums.map((a, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <m.button
                          key={a.title}
                          onClick={() => openAlbum(idx)}
                          className="hscroll-card text-left"
                          animate={
                            reduceMotion
                              ? {}
                              : {
                                  scale: isActive ? 1.02 : 0.98,
                                  opacity: isActive ? 1 : 0.75,
                                }
                          }
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="hscroll-card-inner glass glass-highlight glow-hover overflow-hidden rounded-3xl border border-white/10">
                            <div className="hscroll-media bg-white/5">
                              <Image
                                src={safeCover(a)}
                                alt={a.title}
                                fill
                                sizes="(max-width: 1024px) 90vw, 520px"
                                className="object-cover"
                              />

                              <div className="absolute left-3 top-3">
                                <Badge variant="secondary" className="glass">
                                  {a.meta || "Social Media"}
                                </Badge>
                              </div>

                              {/* Active glow */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  opacity: isActive ? 1 : 0,
                                  transition: "opacity 300ms ease",
                                  background:
                                    "radial-gradient(600px circle at 20% 20%, rgba(64,255,0,0.12), transparent 55%)",
                                }}
                              />
                            </div>

                            <div className="hscroll-content p-6">
                              <div className="text-base font-bold text-white">{a.title}</div>
                              <p className="mt-2 text-sm text-white/70">
                                {a.images.length} posts • click to open
                              </p>

                              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00]">
                                Open album <ArrowRight size={16} />
                              </div>
                            </div>
                          </div>
                        </m.button>
                      );
                    })}
                  </div>

                  {/* right fade for nicer cut */}
                  <div className="hscroll-fade-right" />
                </div>
              </div>
            </div>
          </div>

          {/* Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl glass-strong border-white/10">
              {activeAlbum ? (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <DialogTitle className="text-xl">{activeAlbum.title}</DialogTitle>
                        <p className="mt-1 text-sm text-white/70">{activeAlbum.meta}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="secondary" className="shine-btn" onClick={prevAlbum}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" className="shine-btn" onClick={nextAlbum}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="mt-5 grid gap-6 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Carousel opts={{ loop: true }} className="w-full" key={activeAlbum.title}>
                        <CarouselContent>
                          {imgs.map((src, idx) => (
                            <CarouselItem key={src}>
                              <div className="relative aspect-[4/5] w-full">
                                <Image
                                  src={src}
                                  alt={`Post ${idx + 1}`}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                  className="object-contain bg-black/30"
                                  priority={idx === 0}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3" />
                        <CarouselNext className="right-3" />
                      </Carousel>
                    </div>

                    <div className="glass glass-highlight rounded-3xl p-6 border border-white/10">
                      <div className="text-sm font-semibold text-white/90">Client Notes</div>
                      <p className="mt-2 text-sm text-white/70">
                        اكتب هنا نبذة سريعة: نوع الخدمة + الهدف + ستايل التصميم.
                        (بنخليها ديناميكية لاحقًا من الداتا)
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="glass">Social</Badge>
                        <Badge variant="secondary" className="glass">Campaign</Badge>
                        <Badge variant="secondary" className="glass">Premium layout</Badge>
                      </div>

                      <div className="mt-7">
                        <a href="/#contact" className="text-sm font-semibold text-[#40FF00] hover:opacity-90">
                          Request similar work <ArrowRight size={16} className="inline-block ml-1" />
                        </a>
                      </div>
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