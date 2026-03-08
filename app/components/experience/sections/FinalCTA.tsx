import Link from "next/link";

interface FinalCTAProps {
  reducedMotion: boolean;
}

export default function FinalCTA({ reducedMotion }: FinalCTAProps) {
  return (
    <section
      data-exp-chapter
      className="pointer-events-none absolute inset-0 flex min-h-screen items-center"
      aria-label="Experience final call to action"
    >
      <div className="mx-auto w-full max-w-[1320px] px-6">
        <div data-cta-parallax className="max-w-[820px]">
          <h2
            className="text-4xl font-black tracking-tight md:text-6xl"
            style={{ textShadow: "0 0 40px rgba(64,255,0,0.16)" }}
          >
            Let&apos;s build your next iconic digital story.
          </h2>
          <p className="mt-4 max-w-[680px] text-white/70 md:text-lg">
            From concept to launch, I design and ship premium brand experiences with cinematic polish.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="rounded-2xl bg-[#40FF00] px-5 py-3 font-bold text-black shadow-[0_0_30px_rgba(64,255,0,0.35)] hover:brightness-110 active:scale-[0.98]"
              style={{ transitionDelay: reducedMotion ? "0ms" : "40ms" }}
            >
              Hire me
            </Link>
            <Link
              href="mailto:bashar@example.com"
              className="rounded-2xl border border-white/20 bg-white/[0.07] px-5 py-3 font-bold text-white backdrop-blur-xl hover:bg-white/[0.12] active:scale-[0.98]"
              style={{ transitionDelay: reducedMotion ? "0ms" : "90ms" }}
            >
              Email
            </Link>
            <Link
              href="/projects"
              className="rounded-2xl border border-white/20 bg-white/[0.07] px-5 py-3 font-bold text-white backdrop-blur-xl hover:bg-white/[0.12] active:scale-[0.98]"
              style={{ transitionDelay: reducedMotion ? "0ms" : "140ms" }}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}