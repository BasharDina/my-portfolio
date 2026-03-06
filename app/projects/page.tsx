"use client";

import Reveal from "../components/ui/Reveal";
import SocialPinnedGSAP from "../components/sections/SocialPinnedGSAP";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brandBooks } from "../data/projects";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

type BrandAlbum = { title: string; cover: string; images: string[] };

export default function ProjectsPage() {
  const [tab, setTab] = useState<"social" | "brandbooks" | "print">("social");

  const brandAlbums: BrandAlbum[] = useMemo(
    () =>
      brandBooks.map((b) => ({
        title: b.name,
        cover: b.cover,
        images: b.pages,
      })),
    []
  );

  const [openBrand, setOpenBrand] = useState(false);
  const [brandIndex, setBrandIndex] = useState(0);
  const brandActive = brandAlbums[brandIndex];

  return (
    <main className="min-h-screen">
      <section className="py-16">
        <Reveal>
          <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white">Projects</h1>
                <p className="mt-2 text-sm text-white/70">
                  Social is cinematic scroll. Brand books are albums. Print next.
                </p>
              </div>
              <a
                href="/#contact"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#40FF00] hover:opacity-90"
              >
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
                  <SocialPinnedGSAP /> 
                </TabsContent>

                <TabsContent value="brandbooks" className="mt-8">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {brandAlbums.map((a, idx) => (
                      <button
                        key={a.title}
                        onClick={() => {
                          setBrandIndex(idx);
                          setOpenBrand(true);
                        }}
                        className="glass glass-highlight glow-hover overflow-hidden rounded-3xl border border-white/10 text-left"
                      >
                        <div className="relative h-44 w-full overflow-hidden bg-white/5">
                          <Image src={a.cover} alt={a.title} fill className="object-cover" />
                          <div className="absolute left-3 top-3">
                            <Badge variant="secondary" className="glass">Brand Guidelines</Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="text-base font-bold text-white">{a.title}</div>
                          <p className="mt-2 text-sm text-white/70">{a.images.length} pages</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <Dialog open={openBrand} onOpenChange={setOpenBrand}>
                    <DialogContent className="max-w-6xl glass-strong border-white/10">
                      {brandActive ? (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-xl">{brandActive.title}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {brandActive.images.map((src) => (
                              <div
                                key={src}
                                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                              >
                                <Image src={src} alt="page" fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </DialogContent>
                  </Dialog>
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
    </main>
  );
}