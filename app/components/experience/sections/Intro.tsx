interface IntroProps {
  reducedMotion: boolean;
}

export default function Intro({ reducedMotion }: IntroProps) {
  const lines = ["Crafting immersive", "digital experiences"];

  return (
    <section
      data-exp-chapter
      className="pointer-events-none absolute inset-0 flex min-h-screen items-center"
      aria-label="Experience intro"
    >
      <div className="mx-auto w-full max-w-[1320px] px-6">
        <div data-intro-parallax className="max-w-[900px]">
          <p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl"
            style={{ boxShadow: "0 0 28px rgba(64,255,0,0.18)" }}
          >
            <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
            Cinematic story mode
          </p>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {lines.map((line, index) => (
              <span
                key={line}
                className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 36px rgba(64,255,0,0.18)",
                  transitionDelay: reducedMotion ? "0ms" : `${index * 80}ms`,
                }}
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