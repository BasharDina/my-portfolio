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
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className="group glass glass-highlight overflow-hidden rounded-3xl border border-white/10 text-left"
          >
            <div className="relative aspect-[4/3] w-full bg-white/5">
              <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={slides} />
    </>
  );
}