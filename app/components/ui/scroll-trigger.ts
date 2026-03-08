"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Cleanup = () => void;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initHomeScrollTriggers(root: HTMLElement): Cleanup {
  if (typeof window === "undefined") return () => {};
  if (prefersReducedMotion()) return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    const hero = root.querySelector<HTMLElement>("[data-home-chapter='hero']");
    const services = root.querySelector<HTMLElement>("[data-home-chapter='services']");
    const projects = root.querySelector<HTMLElement>("[data-home-chapter='projects']");

    if (hero) {
      const glow = hero.querySelector<HTMLElement>(".hero-visual-glow");
      const imageWrap = hero.querySelector<HTMLElement>(".hero-image-wrap");

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=120%",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (glow) {
        heroTl.fromTo(
          glow,
          { scale: 1, opacity: 0.8, filter: "blur(40px)" },
          { scale: 1.08, opacity: 1, filter: "blur(52px)", ease: "none" },
          0
        );
      }

      if (imageWrap) {
        heroTl.fromTo(
          imageWrap,
          { yPercent: 0, scale: 1, rotate: 0 },
          { yPercent: -3.5, scale: 1.035, rotate: 0.35, ease: "none" },
          0
        );
      }
    }

    if (services) {
      const cards = gsap.utils.toArray<HTMLElement>("article", services);

      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: services,
          start: "top top",
          end: "+=120%",
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
        },
      });

      servicesTl.fromTo(
        cards,
        { y: 42, autoAlpha: 0, scale: 0.97 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.14,
          duration: 1,
          ease: "power2.out",
        }
      );
    }

    if (projects) {
      const cards = gsap.utils.toArray<HTMLElement>("a.glass", projects);
      const media = projects.querySelectorAll<HTMLElement>(".relative.h-44");

      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: projects,
          start: "top top",
          end: "+=120%",
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
        },
      });

      projectsTl.fromTo(
        cards,
        { y: 56, autoAlpha: 0, scale: 0.975 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      projectsTl.fromTo(
        media,
        { yPercent: 0 },
        { yPercent: -8, stagger: 0.1, duration: 1, ease: "none" },
        0
      );
    }

    ScrollTrigger.refresh();
  }, root);

  return () => {
    ctx.revert();
  };
}