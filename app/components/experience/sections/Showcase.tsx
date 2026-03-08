import { Sparkles, Layers, MousePointer2 } from "lucide-react";

interface ShowcaseProps {
  reducedMotion: boolean;
}

export default function Showcase({ reducedMotion }: ShowcaseProps) {
  const items = [
    { icon: Sparkles, title: "UI/UX", desc: "Thoughtful interfaces with precision interaction." },
    { icon: Layers, title: "Branding", desc: "Cohesive visual language with premium clarity." },
    { icon: MousePointer2, title: "Motion", desc: "Subtle cinematic movement that guides focus." },
  ];

  const stats = [
    { label: "Projects", value: "48+" },
    { label: "Avg. score", value: "4.9/5" },
    { label: "Delivery", value: "On time" },
  ];

  return (
    <section
      data-exp-chapter
      className="pointer-events-none absolute inset-0 flex min-h-screen items-center"
      aria-label="Experience showcase"
    >
      <div className="mx-auto w-full max-w-[1320px] px-6">
        <div data-showcase-parallax className="max-w-[980px]">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
            Crafted to perform and impress.
          </h2>
          <p className="mt-4 max-w-[700px] text-white/70 md:text-lg">
            Three focused disciplines combined into one dark, high-contrast storytelling system.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {items.map((it, index) => (
              <div
                key={it.title}
                className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl"
                style={{
                  boxShadow: "0 12px 35px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(64,255,0,0.08)",
                  transitionDelay: reducedMotion ? "0ms" : `${index * 90}ms`,
                }}
              >
                <it.icon className="h-5 w-5 text-[#40FF00]" />
                <h3 className="mt-3 text-lg font-bold tracking-tight text-white">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{it.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md"
                style={{ transitionDelay: reducedMotion ? "0ms" : `${180 + index * 70}ms` }}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">{stat.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}