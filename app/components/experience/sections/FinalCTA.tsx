import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  reducedMotion: boolean;
}

export default function FinalCTA({ reducedMotion }: FinalCTAProps) {
  return (
    <section
      data-exp-scene
      data-exp-scene-index="2"
      className="relative flex min-h-[60vh] items-center"
      aria-label="Experience final call to action"
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 py-8 md:py-10">
        <div className="max-w-[820px]">
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
            <Button
              asChild
              size="lg"
              style={{ transitionDelay: reducedMotion ? "0ms" : "40ms" }}
            >
              <Link href="/#contact">
                <span className="text-black">Hire me</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              style={{ transitionDelay: reducedMotion ? "0ms" : "90ms" }}
            >
              <Link href="mailto:bashar@example.com">Email</Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              style={{ transitionDelay: reducedMotion ? "0ms" : "140ms" }}
            >
              <Link href="/projects">Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}