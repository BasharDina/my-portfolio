"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Reveal from "../components/ui/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "framer-motion";

import { brandBooks, socialClients } from "../data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

type Album =
  | { type: "social"; title: string; meta?: string; cover: string; images: string[] }
  | { type: "brandbook"; title: string; meta?: string; cover: string; images: string[] };

export default function ProjectsPage() {
  const [tab, setTab] = useState<"social" | "brandbooks" | "print">("social");

  const albums: Album[] = useMemo(() => {
    if (tab === "social") {
      return socialClients.map((c) => ({
        type: "social",
        title: c.name,
        meta: c.niche || "Social Media",
        cover: c.cover,
        images: c.posts,
      }));
    }
    if (tab === "brandbooks") {
      return brandBooks.map((b) => ({
        type: "brandbook",
        title: b.name,
        meta: "Brand Guidelines",
        cover: b.cover,
        images: b.pages,
      }));
    }
    // placeholder للـPrint (نضيفه بعدين)
    return [];
  }, [tab]);

  const [open, setOpen] = useState(false);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const activeAlbum = albums[activeAlbumIndex];
  const images = activeAlbum?.images || [];

  function openAlbum(i: number) {
    setActiveAlbumIndex(i);
    setActiveSlideIndex(0);
    setOpen(true);
  }

  function nextAlbum() {
    setActiveAlbumIndex((i) => (i + 1) % Math.max(albums.length, 1));
    setActiveSlideIndex(0);
  }

  function prevAlbum() {
    setActiveAlbumIndex((i) => (i - 1 + Math.max(albums.length, 1)) % Math.max(albums.length, 1));
    setActiveSlideIndex(0);
  }

  return (
    <main className="min-h-screen">
      <section className="py-16">
        <Reveal>
          <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white">Projects</h1>
                <p className="mt-2 text-sm text-white/70">
                  Albums grouped by category — open any card to view the full gallery.
                </p>
              </div>

              <a href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00]">
                Let’s talk <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-8">
              <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                <TabsList className="glass w-full grid grid-cols-3 rounded-2xl p-1 border border-white/10 bg-white/5 max-w-xl">
                  <TabsTrigger value="social" className="rounded-xl">Social</TabsTrigger>
                  <TabsTrigger value="brandbooks" className="rounded-xl">Brand Books</TabsTrigger>
                  <TabsTrigger value="print" className="rounded-xl">Print</TabsTrigger>
                </TabsList>

                <TabsContent value="social" className="mt-8">
                  <GridAlbums albums={albums} onOpen={openAlbum} />
                </TabsContent>

                <TabsContent value="brandbooks" className="mt-8">
                  <GridAlbums albums={albums} onOpen={openAlbum} />
                </TabsContent>

                <TabsContent value="print" className="mt-8">
                  <div className="glass glass-highlight rounded-3xl p-8 border border-white/10 text-white/70">
                    Print section coming next (rollups / posters / 16:9).
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Album Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl glass-strong border-white/10">
          {activeAlbum ? (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <DialogTitle className="text-xl">{activeAlbum.title}</DialogTitle>
                    <p className="mt-1 text-sm text-white/70">{activeAlbum.meta}</p>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs text-white/60">
                      <span className="glass rounded-full px-3 py-1 border border-white/10">
                        Album {activeAlbumIndex + 1} / {albums.length}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
                      <span className="glass rounded-full px-3 py-1 border border-white/10">
                        {activeAlbum.type === "social" ? "Social" : "Brand Book"}
                      </span>
                    </div>
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
                <div>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Carousel opts={{ loop: true }} className="w-full" key={activeAlbum.title}>
                      <CarouselContent>
                        {images.map((src, idx) => (
                          <CarouselItem key={src}>
                            <div className="relative aspect-video w-full">
                              <Image
                                src={src}
                                alt={`Slide ${idx + 1}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
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

                  <div className="mt-3 grid grid-cols-6 gap-2">
                    {images.slice(0, 12).map((src) => (
                      <div key={src} className="relative h-14 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <Image src={src} alt="thumb" fill sizes="120px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass glass-highlight rounded-3xl p-6 border border-white/10">
                  <div className="text-sm font-semibold text-white/90">What’s inside</div>
                  <p className="mt-2 text-sm text-white/70">
                    {activeAlbum.type === "social"
                      ? "3 curated posts for this client — clean layout, hierarchy, and campaign-ready design."
                      : "Selected pages from the brand guidelines — logo rules, typography, colors, and usage examples."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="glass">
                      Premium
                    </Badge>
                    <Badge variant="secondary" className="glass">
                      Clean System
                    </Badge>
                    <Badge variant="secondary" className="glass">
                      Ready to deliver
                    </Badge>
                  </div>

                  <div className="mt-7">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00] hover:opacity-90"
                    >
                      Request similar work <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function GridAlbums({
  albums,
  onOpen,
}: {
  albums: { title: string; meta?: string; cover: string; images: string[] }[];
  onOpen: (i: number) => void;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((a, idx) => (
        <m.button
          key={a.title}
          onClick={() => onOpen(idx)}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25, ease }}
          className="glass glass-highlight glow-hover text-left overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="relative h-44 w-full overflow-hidden bg-white/5">
            <Image
              src={a.cover}
              alt={a.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition duration-300 hover:scale-[1.03]"
            />
            <div className="absolute left-3 top-3 z-10">
              <Badge variant="secondary" className="glass">
                {a.meta || "Album"}
              </Badge>
            </div>
          </div>

          <div className="p-6">
            <div className="text-base font-bold text-white">{a.title}</div>
            <p className="mt-2 text-sm text-white/70">
              {a.images.length} items • click to open
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00]">
              Open album <ArrowRight size={16} />
            </div>
          </div>
        </m.button>
      ))}
    </div>
  );
}