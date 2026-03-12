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
      const glow = hero.querySelector<HTMLElement>(".hero-glow-orbit");
      const imageWrap = hero.querySelector<HTMLElement>(".hero-image-wrap");
      const contentSide = hero.querySelector<HTMLElement>(".hero-content");

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.45,
        },
      });

      if (glow) {
        heroTl.fromTo(
          glow,
          { scale: 1, opacity: 0.82, filter: "blur(48px)" },
          { scale: 1.08, opacity: 1, filter: "blur(56px)", ease: "none" },
          0
        );
      }

      if (imageWrap) {
        heroTl.fromTo(
          imageWrap,
          { yPercent: 0, scale: 1, rotate: 0 },
          { yPercent: -4, scale: 1.025, rotate: 0.2, ease: "none" },
          0
        );
      }

      if (contentSide) {
        heroTl.fromTo(
          contentSide,
          { y: 0, opacity: 1 },
          { y: -18, opacity: 0.96, ease: "none" },
          0
        );
      }
    }

    if (services) {
      const cards = gsap.utils.toArray<HTMLElement>("article", services);

      if (cards.length) {
        gsap.set(cards, { y: 34, autoAlpha: 0, scale: 0.985 });

        cards.forEach((card, index) => {
          gsap.to(card, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.04,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 62%",
              scrub: false,
              once: true,
            },
          });
        });
      }
    }

    if (projects) {
      const cards = gsap.utils.toArray<HTMLElement>("a.glass", projects);
      const media = gsap.utils.toArray<HTMLElement>(".relative.h-48", projects);

      if (cards.length) {
        gsap.set(cards, { y: 40, autoAlpha: 0, scale: 0.985 });

        cards.forEach((card, index) => {
          gsap.to(card, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.82,
            ease: "power3.out",
            delay: index * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 62%",
              scrub: false,
              once: true,
            },
          });
        });
      }

      if (media.length) {
        media.forEach((item) => {
          gsap.fromTo(
            item,
            { yPercent: 0 },
            {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        });
      }
    }

    ScrollTrigger.refresh();
  }, root);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}