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

type Album = {
  title: string;
  meta?: string;
  cover: string;
  images: string[];
};

export default function SocialPinned() {
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

  // ===== Pinned horizontal scroll logic
  const shellRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;

    const onScroll = () => {
      const rect = shell.getBoundingClientRect();
      const shellTop = rect.top;
      const shellHeight = shell.offsetHeight;

      // when shell enters viewport: start progress
      const start = 0;
      const end = -(shellHeight - window.innerHeight);
      // end is negative value

      const tRaw = (shellTop - start) / (end - start); // 0..1
      const t = Math.min(1, Math.max(0, tRaw));
      setProgress(t);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxX = track.scrollWidth - track.clientWidth; // how far we need to move
    const x = -maxX * progress;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, [progress]);

  // ===== Dialog (Album)
  const [open, setOpen] = useState(false);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

  const active = albums[activeAlbumIndex];
  const imgs = active?.images || [];

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

  // ===== Height of shell = viewport * (albums count) (gives long vertical scroll)
  // tweak: 0.8 = tighter, 1.0 = longer
  const scrollPages = Math.max(3, Math.round(albums.length * 0.85));
  const shellHeight = `calc(${scrollPages} * 100vh)`;

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

          {/* pinned shell */}
          <div ref={shellRef} className="hscroll-shell mt-8" style={{ height: shellHeight }}>
            <div className="hscroll-sticky glass glass-highlight border border-white/10">
              <div className="h-full w-full p-5">
                {/* progress bar */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/60">
                    {Math.round(progress * 100)}%
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(progress * 100)}%`,
                        background:
                          "linear-gradient(90deg, rgba(64,255,0,0.95), rgba(64,255,0,0.12))",
                        boxShadow: "0 0 20px rgba(64,255,0,0.2)",
                      }}
                    />
                  </div>
                  <a href="/#contact" className="text-xs font-semibold text-[#40FF00] hover:opacity-90">
                    Contact <ArrowRight size={14} className="inline-block ml-1" />
                  </a>
                </div>

                <div ref={trackRef} className="hscroll-track">
                  {albums.map((a, idx) => (
                    <button
                      key={a.title}
                      onClick={() => openAlbum(idx)}
                      className="hscroll-card glass glass-hover glass-highlight glow-hover overflow-hidden rounded-3xl border border-white/10 text-left"
                    >
                      <div className="relative h-64 w-full overflow-hidden bg-white/5">
                        <Image
                          src={a.cover}
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
                      </div>

                      <div className="p-6">
                        <div className="text-base font-bold text-white">{a.title}</div>
                        <p className="mt-2 text-sm text-white/70">
                          {a.images.length} posts • click to open
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00]">
                          Open album <ArrowRight size={16} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl glass-strong border-white/10">
              {active ? (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <DialogTitle className="text-xl">{active.title}</DialogTitle>
                        <p className="mt-1 text-sm text-white/70">{active.meta}</p>
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
                      <Carousel opts={{ loop: true }} className="w-full" key={active.title}>
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
                        هنا بنحط نبذة قصيرة عن الشغل: الهدف، الأسلوب، ونتيجة التصميم.
                        لاحقًا بنضيف KPI أو قبل/بعد إذا بدك.
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