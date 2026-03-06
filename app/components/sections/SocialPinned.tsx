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
        cover: c.cover,
        images: c.posts,
      })),
    []
  );

  const shellRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  // smooth follow
  const rafRef = useRef<number | null>(null);
  const currentXRef = useRef(0);

  // measurements
  const stepPxRef = useRef(520 + 22); // fallback
  const [activeIndex, setActiveIndex] = useState(0);

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

  function safeCover(a: Album) {
    return a.cover || a.images?.[0] || "/projects/p1.png";
  }

  // ===== shell height
  const scrollPages = Math.max(3, Math.round(albums.length * 0.9));
  const shellHeight = `calc(${scrollPages} * 100vh)`;

  // ===== measure card width + gap from DOM (REAL)
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      const firstCard = track.querySelector<HTMLElement>(".hscroll-card");
      if (!firstCard) return;

      const cardW = firstCard.getBoundingClientRect().width;
      const styles = getComputedStyle(track);
      const gapStr = styles.columnGap || styles.gap || "22px";
      const gap = parseFloat(gapStr) || 22;

      stepPxRef.current = cardW + gap;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ===== compute progress from window scroll
  useEffect(() => {
    const onScroll = () => {
      const shell = shellRef.current;
      if (!shell) return;

      const startY = window.scrollY + shell.getBoundingClientRect().top;
      const endY = startY + shell.offsetHeight - window.innerHeight;

      const p = endY <= startY ? 0 : clamp((window.scrollY - startY) / (endY - startY));
      progressRef.current = p;
      setProgress(p);

      // active index
      const idx = Math.round(p * (albums.length - 1));
      setActiveIndex(Math.max(0, Math.min(albums.length - 1, idx)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [albums.length]);

  // ===== animate translateX (MUST move cards)
  useEffect(() => {
    const loop = () => {
      const track = trackRef.current;
      if (!track) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const step = stepPxRef.current;
      const maxIndex = Math.max(0, albums.length - 1);
      const virtualIndex = (reduceMotion ? 0 : progressRef.current) * maxIndex;

      // target X based on step
      const targetX = -(virtualIndex * step);

      // smooth follow
      const current = currentXRef.current;
      const next = current + (targetX - current) * 0.14;
      currentXRef.current = next;

      track.style.transform = `translate3d(${next}px,0,0)`;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [albums.length, reduceMotion]);

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
              <span className="text-white/60">Now viewing:</span>
              <span className="text-white/85 font-semibold">{albums[activeIndex]?.title}</span>
            </div>
          </div>

          <div ref={shellRef} className="hscroll-shell mt-8" style={{ height: shellHeight }}>
            <div className="hscroll-sticky glass glass-highlight border border-white/10 relative">
              <div className="h-full w-full p-5 relative">
                {/* progress row */}
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

                  <a href="/#contact" className="text-xs font-semibold text-[#40FF00] hover:opacity-90">
                    Contact <ArrowRight size={14} className="inline-block ml-1" />
                  </a>
                </div>

                {/* track */}
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
                                  scale: isActive ? 1.02 : 0.985,
                                  opacity: isActive ? 1 : 0.78,
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
                                sizes="(max-width: 1024px) 90vw, 560px"
                                className="object-cover"
                              />
                              <div className="absolute left-3 top-3">
                                <Badge variant="secondary" className="glass">
                                  {a.meta || "Social Media"}
                                </Badge>
                              </div>

                              {/* active glow */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  opacity: isActive ? 1 : 0,
                                  transition: "opacity 240ms ease",
                                  background:
                                    "radial-gradient(600px circle at 20% 20%, rgba(64,255,0,0.14), transparent 55%)",
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

                  <div className="hscroll-fade-right" />
                </div>
              </div>
            </div>
          </div>

          {/* dialog */}
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
                        لاحقاً بنضيف: الهدف + أسلوب التصميم + النتائج.
                      </p>
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