"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function LightboxClient({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number>(-1);

  const slides = useMemo(
    () => images.map((src) => ({ src })),
    [images]
  );

  return (
    <>
      <div className="mt-5 columns-1 gap-4 sm:columns-2 xl:columns-3 [column-fill:_balance]">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className="group glass glass-highlight mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-white/10 text-left transition hover:border-white/20"
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <div
              className="relative w-full bg-white/5"
              style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : i % 2 === 0 ? "16 / 10" : "4 / 3" }}
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 py-3 text-xs text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {i + 1} / {images.length}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        on={{ view: ({ index: nextIndex }) => setIndex(nextIndex) }}
        render={{
          buttonPrev: images.length > 1 ? undefined : () => null,
          buttonNext: images.length > 1 ? undefined : () => null,
          slideFooter: () => (
            <div className="pointer-events-none mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-4 px-4 text-xs text-white/80 sm:text-sm">
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5">
                {index + 1} / {images.length}
              </span>
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5">
                Keyboard: ← → to navigate · Esc to close
              </span>
            </div>
          ),
        }}
      />
    </>
  );
}