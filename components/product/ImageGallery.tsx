"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    const newIndex = (index + images.length) % images.length;
    setActiveIndex(newIndex);
    if (sliderRef.current) {
      const step = sliderRef.current.offsetWidth - 44;
      sliderRef.current.scrollTo({ left: newIndex * step, behavior: "smooth" });
    }
  }

  function prev() {
    goTo(activeIndex - 1);
    thumbsRef.current?.scrollBy({ left: -(84 + 8), behavior: "smooth" });
  }
  function next() {
    goTo(activeIndex + 1);
    thumbsRef.current?.scrollBy({ left: 84 + 8, behavior: "smooth" });
  }

  const mainImages = [images[activeIndex], images[(activeIndex + 1) % images.length]];

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: scroll-snap slider with right peek */}
      <div className="lg:hidden pt-1 lg:pt-0 lg:-mx-6 overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 [scroll-padding-left:16px]"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="shrink-0 relative rounded-[20px] overflow-hidden bg-brand-grey-card snap-start aspect-square"
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
      <div className="relative flex items-center gap-2 w-full max-w-[796px]">
        <button
          onClick={prev}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors"
          aria-label="Previous"
        >
          ‹
        </button>

        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-none w-[84px] h-[84px] lg:w-[calc((100%-32px)/5)] lg:h-auto lg:aspect-square lg:max-w-[133px] rounded-[20px] overflow-hidden border-2 transition-colors ${
                i === activeIndex ? "border-[#0d0a0b]" : "border-transparent"
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
