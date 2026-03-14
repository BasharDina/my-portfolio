"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryImage = {
  src: string;
  alt?: string;
};

type GalleryGroup = {
  title: string;
  images: GalleryImage[];
};

export default function LightboxClient({ groups }: { groups: GalleryGroup[] }) {
  const [index, setIndex] = useState<number>(-1);

  const flatImages = useMemo(() => groups.flatMap((group) => group.images), [groups]);
  const slides = useMemo(
    () => flatImages.map((image) => ({ src: image.src })),
    [flatImages]
  );

  let runningIndex = 0;

  return (
    <>
      <div className="mt-6 space-y-12">
        {groups.map((group) => {
          const startIndex = runningIndex;
          runningIndex += group.images.length;

          return (
            <section key={group.title}>
              <div className="mb-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#40FF00] shadow-[0_0_12px_rgba(64,255,0,0.45)]" />
                    <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                      {group.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-[#40FF00]/20 bg-[#40FF00]/10 px-3 py-1 text-xs font-medium text-[#40FF00]">
                    {group.images.length} image{group.images.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#40FF00]/30 via-white/10 to-transparent" />
              </div>

              <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 [column-fill:_balance]">
                {group.images.map((image, i) => {
                  const absoluteIndex = startIndex + i;

                  return (
                    <button
                      key={`${group.title}-${i}-${image.src}`}
                      onClick={() => setIndex(absoluteIndex)}
                      className="group glass glass-highlight mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-white/10 text-left transition hover:border-white/20"
                      aria-label={`Open image ${absoluteIndex + 1} of ${flatImages.length}`}
                      type="button"
                    >
                      <div className="relative w-full bg-white/5">
                        <img
                          src={image.src}
                          alt={image.alt || `${group.title} image ${i + 1}`}
                          className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 py-3 text-xs text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {group.title} · {i + 1} / {group.images.length}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        on={{ view: ({ index: nextIndex }) => setIndex(nextIndex) }}
        render={{
          buttonPrev: flatImages.length > 1 ? undefined : () => null,
          buttonNext: flatImages.length > 1 ? undefined : () => null,
          slideFooter: () => (
            <div className="pointer-events-none mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-4 px-4 text-xs text-white/80 sm:text-sm">
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5">
                {index + 1} / {flatImages.length}
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