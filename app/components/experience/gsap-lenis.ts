type LenisGsapOptions = {
  duration?: number;
  wheelMultiplier?: number;
};

let isScrollTriggerRegistered = false;

export async function setupLenisGsap(options: LenisGsapOptions = {}) {
  if (typeof window === "undefined") return () => {};

  const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
    await Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);

  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }

  const lenis = new Lenis({
    duration: options.duration ?? 1.2,
    wheelMultiplier: options.wheelMultiplier ?? 1,
  });

  let rafId = 0;

  const onLenisScroll = () => {
    ScrollTrigger.update();
  };

  const raf = (time: number) => {
    lenis.raf(time);
    rafId = window.requestAnimationFrame(raf);
  };

  lenis.on("scroll", onLenisScroll);
  rafId = window.requestAnimationFrame(raf);

  return () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
    lenis.off("scroll", onLenisScroll);
    lenis.destroy();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}