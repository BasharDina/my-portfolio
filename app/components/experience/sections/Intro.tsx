interface IntroProps {
  reducedMotion: boolean;
}

export default function Intro({ reducedMotion }: IntroProps) {
  const lines = ["Crafting immersive", "digital experiences"];

  return (
    <section
      data-exp-scene
      data-exp-scene-index="0"
className="relative flex min-h-[70vh] items-center"
      aria-label="Experience intro"
    >
<div className="mx-auto w-full max-w-[1320px] px-6 py-8 md:py-10">
          <div
          className="max-w-[900px]"
          style={{
            transform: reducedMotion ? "none" : "translateY(0px)",
          }}
        >
          <p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl"
            style={{ boxShadow: "0 0 28px rgba(64,255,0,0.18)" }}
          >
            <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
            Cinematic story mode
          </p>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {lines.map((line) => (
              <span
                key={line}
                className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
                style={{ textShadow: "0 0 36px rgba(64,255,0,0.18)" }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[620px] text-base leading-relaxed text-white/70 md:text-lg">
            Scroll through a dark, glassy journey shaped with subtle neon accents and premium motion rhythm.
          </p>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/50">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}