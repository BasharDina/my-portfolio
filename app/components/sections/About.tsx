"use client";

import Reveal from "../ui/Reveal";
import { Stagger, StaggerItem } from "../ui/Stagger";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const DATA = [
  { name: "Sarah M.", role: "Startup Founder", text: "Premium UI + strong UX thinking. Smooth communication and excellent results.", rating: 5, avatar: "SM" },
  { name: "Omar K.", role: "Product Manager", text: "Great design system, consistent components, agency-level output and presentation.", rating: 5, avatar: "OK" },
  { name: "Lina A.", role: "Marketing Lead", text: "Brand visuals were sharp and campaign-ready. Engagement improved significantly.", rating: 5, avatar: "LA" },
];

export default function About() {
  return (
<section id="about" className="py-12 sm:py-14">
        <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">My happy customers</h2>
              <p className="mt-2 text-sm text-white/70">
                Feedback focused on quality, speed, and premium output.
              </p>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex glass">
              ★ Rated 4.8/5
            </Badge>
          </div>

          <div className="relative mt-10">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(64,255,0,0.16) 0%, rgba(124,58,237,0.08) 35%, rgba(0,0,0,0) 70%)",
              }}
            />

            <Stagger>
              <div className="grid gap-6 md:grid-cols-3">
                {DATA.map((t) => (
                  <StaggerItem key={t.name}>
                    <div className="glass glass-hover glass-highlight glow-hover rounded-3xl p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="glass-strong flex h-11 w-11 items-center justify-center rounded-full font-bold">
                            {t.avatar}
                          </div>
                          <div>
                            <div className="font-bold leading-tight">{t.name}</div>
                            <div className="text-xs text-white/60">{t.role}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={i < t.rating ? "h-4 w-4 text-[#40FF00]" : "h-4 w-4 text-white/20"}
                              fill={i < t.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-white/75">“{t.text}”</p>

                      <div className="mt-6 flex items-center justify-between text-xs text-white/55">
                        <span>Verified client</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
                          Trusted
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </div>
        </div>
      </Reveal>
    </section>
  );
}