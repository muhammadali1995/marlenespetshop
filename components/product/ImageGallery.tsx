"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    const newIndex = (index + images.length) % images.length;
    setActiveIndex(newIndex);
    // Slide width = calc(100% - 60px), gap = 16px, so step = containerWidth - 44
    if (sliderRef.current) {
      const step = sliderRef.current.offsetWidth - 44;
      sliderRef.current.scrollTo({ left: newIndex * step, behavior: "smooth" });
    }
  }

  function prev() { goTo(activeIndex - 1); }
  function next() { goTo(activeIndex + 1); }

  const mainImages = [images[activeIndex], images[(activeIndex + 1) % images.length]];

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: scroll-snap slider with right peek */}
      <div className="lg:hidden lg:-mx-6 overflow-hidden">
        <div
          ref={sliderRef}
          className="flex pl-6 gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className={`shrink-0 relative aspect-square rounded-[20px] overflow-hidden bg-brand-grey-card snap-start${i === 0 ? " pl-4" : ""}`}
              style={{ width: "calc(100% - 60px)" }}
            >
              {i === 1 ? (
                <video
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={src}
                  alt={`Product image ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              )}
            </div>
          ))}
          {/* Right padding spacer so last slide scrolls fully into view */}
          <div className="shrink-0 w-6" aria-hidden />
        </div>
      </div>

      {/* Desktop: 2 main images side-by-side */}
      <div className="hidden lg:grid grid-cols-2 gap-4 max-w-[796px]">
        {mainImages.map((src, i) => (
          <div
            key={i}
            className="relative max-w-[390px] aspect-square rounded-[20px] overflow-hidden bg-brand-grey-card"
          >
            {i === 1 ? (
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={src}
                alt={`Product image ${activeIndex + i + 1}`}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="relative flex items-center gap-2" style={{ width: "-webkit-fill-available" }}>
        <button
          onClick={prev}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors"
          aria-label="Previous"
        >
          ‹
        </button>

        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-none aspect-square rounded-[20px] overflow-hidden border-2 transition-colors w-[calc((100%-24px)/3)] lg:w-[calc((100%-32px)/5)] max-w-[133px] ${
                i === activeIndex ? "border-brand-yellow" : "border-transparent"
              }`}
            >
              <div className="relative w-full h-full bg-brand-grey-card">
                {i === 1 ? (
                  <video
                    src="/video.mp4"
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
