"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Show 2 main images side-by-side starting from activeIndex
  const mainImages = [images[activeIndex], images[(activeIndex + 1) % images.length]];

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 2 main images side-by-side */}
      <div className="grid grid-cols-2 gap-4 max-w-[796px]">
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
      <div className="relative flex items-center gap-2 w-full">
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
              onClick={() => setActiveIndex(i)}
              className={`flex-none w-[calc((100%-32px)/5)] aspect-square rounded-[20px] max-w-[133px] overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-brand-yellow"
                  : "border-transparent"
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
