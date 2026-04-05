"use client";

import Image from "next/image";
import { useRef } from "react";

interface LifestyleStripProps {
  photos: string[];
}

export default function LifestyleStrip({ photos }: LifestyleStripProps) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <div className="relative w-full my-10">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors"
        aria-label="Scroll left"
      >
        ‹
      </button>

      {/* Photos */}
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto no-scrollbar px-14"
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative h-64 w-48 sm:h-80 sm:w-60 rounded-xl overflow-hidden bg-brand-grey-card"
          >
            <Image
              src={src}
              alt={`Lifestyle photo ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors"
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}
