"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface LifestyleStripProps {
  photos: string[];
}

export default function LifestyleStrip({ photos }: LifestyleStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // start centered on 3rd photo

  function scroll(dir: "left" | "right") {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  }

  const updateActive = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const items = el.querySelectorAll<HTMLElement>("[data-photo]");
    let closest = 0;
    let minDist = Infinity;
    items.forEach((item, i) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(center - itemCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Scroll to show 3rd photo centered on mount
    const items = el.querySelectorAll<HTMLElement>("[data-photo]");
    if (items[2]) {
      el.scrollLeft = items[2].offsetLeft - el.clientWidth / 2 + items[2].offsetWidth / 2;
    }
    el.addEventListener("scroll", updateActive, { passive: true });
    return () => el.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  return (
    <div className="w-full my-10">
      {/* Photos */}
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto no-scrollbar px-6 items-center"
      >
        {photos.map((src, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              data-photo
              className="flex-shrink-0 relative rounded-xl overflow-hidden bg-brand-grey-card transition-all duration-300"
              style={{
                width: isActive ? "15rem" : "12rem",
                height: isActive ? "20rem" : "16rem",
                transform: isActive ? "scale(1)" : "scale(0.9)",
              }}
            >
              <Image
                src={src}
                alt={`Lifestyle photo ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation arrows — below, centered */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => scroll("left")}
          className="w-8 h-8 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors text-lg"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-8 h-8 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors text-lg"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
}
