"use client";

import Reveal from "../ui/Reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "AR",
    name: "Ahmed R.",
    role: "Marketing Manager",
    rating: 4.8,
    quote:
      "The social media designs were visually strong, consistent, and highly professional. They gave our brand a clear and modern presence across all platforms.",
  },
  {
    initials: "MR",
    name: "Maha R.",
    role: "Brand Owner",
    rating: 4.7,
    quote:
      "The packaging design was creative, polished, and aligned perfectly with the product identity. The final result looked premium and production-ready.",
  },
  {
    initials: "KS",
    name: "Khaled S.",
    role: "Print Business Owner",
    rating: 4.6,
    quote:
      "The print materials were accurate, well-prepared, and easy to execute. File organization and final output quality were excellent from start to finish.",
  },
];

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);

  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < fullStars ? "fill-[#40FF00] text-[#40FF00]" : "text-white/20"
      }`}
    />
  ));
}

export default function TrustedBy() {
  return (
<section className="py-12 sm:py-16">
        <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My clients
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Selected feedback on social media design, packaging, and print work —
                focused on quality, clarity, and professional execution.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
              <span className="text-white">★</span>
              <span>Average rating 4.7/5</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="glass glass-highlight rounded-3xl border border-white/10 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg font-bold text-white/90">
                      {item.initials}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-white/60">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {renderStars(item.rating)}
                  </div>
                </div>

                <p className="mt-8 text-base leading-relaxed text-white/78">
                  “{item.quote}”
                </p>

                <div className="mt-8 flex items-center justify-between text-sm text-white/55">
                  <span>Verified client</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
                    {item.rating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}