"use client";

import Reveal from "../ui/Reveal";
import {
  Figma,
  Image as ImageIcon,
  PenTool,
  Film,
  Video,
  Box,
} from "lucide-react";

const TOOLS = [
  { name: "Figma", icon: Figma },
  { name: "Photoshop", icon: ImageIcon },
  { name: "Illustrator", icon: PenTool },
  { name: "After Effects", icon: Film },
  { name: "Premiere Pro", icon: Video },
  { name: "Blender", icon: Box },
];

export default function TrustedBy() {
  return (
    <section className="py-10">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="glass glass-highlight rounded-3xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-white/80">
                  Trusted tools in my workflow
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Built for speed, consistency, and premium output.
                </div>
              </div>

              <div
                className="hidden h-[2px] flex-1 rounded-full sm:block"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(64,255,0,0.35), rgba(124,58,237,0.18), rgba(0,0,0,0))",
                }}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {TOOLS.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.name}
                    className="glass glass-hover glow-hover rounded-2xl px-4 py-3"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white/80">
                      <Icon className="h-4 w-4 text-[#40FF00]" />
                      {t.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}