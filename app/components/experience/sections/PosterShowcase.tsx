"use client";

import Image from "next/image";

export default function PosterShowcase() {
  return (
    <section
      className="relative flex items-center"
      aria-label="Portfolio visual showcase"
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 py-6 md:py-10">
        <div className="mx-auto flex justify-center">
          <Image
            src="/experience/portfolio-poster.png"
            alt="Bashar Emad portfolio visual showcase"
            width={1400}
            height={1400}
            priority={false}
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 78vw, 900px"
            className="h-auto w-full max-w-[860px] select-none object-contain"
          />
        </div>
      </div>
    </section>
  );
}