"use client";

import Image from "next/image";
import { useRef } from "react";
import { benefitCards, socialProofPhotos } from "@/lib/data";

export default function SocialProof() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  function onMouseDown(e: React.MouseEvent) {
    if (!sliderRef.current) return;
    dragStart.current = { x: e.pageX, scrollLeft: sliderRef.current.scrollLeft };
    sliderRef.current.style.cursor = "grabbing";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!dragStart.current || !sliderRef.current) return;
    e.preventDefault();
    sliderRef.current.scrollLeft = dragStart.current.scrollLeft - (e.pageX - dragStart.current.x);
  }

  function stopDrag() {
    dragStart.current = null;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  }

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-[1440px]">

        {/* Swiper — drag to scroll, video if available */}
        <div
          ref={sliderRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar cursor-grab select-none mb-8"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {socialProofPhotos.map((_, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[110px] h-[110px] sm:w-[170px] sm:h-[170px] rounded-full overflow-hidden bg-brand-grey-card"
            >
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-12">
          <h2 className="text-3xl sm:text-[54px] font-black text-brand-dark shrink-0">
            +7500 Units Sold
          </h2>
          <p className="text-base sm:text-2xl text-brand-dark/60 sm:max-w-xs leading-relaxed sm:text-right ml-auto">
            Pet-Parents love the all-in-one design. A scratcher, ball track,
            shape-shifter and even a cozy bed.
          </p>
        </div>

        {/* Benefit cards — image + label + description */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefitCards.map((card) => (
            <div key={card.label} className="flex flex-col gap-3">
              {/* Image */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-brand-grey-card">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Label row */}
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl">{card.icon}</span>
                <span className="font-bold text-brand-dark text-sm sm:text-[21px]">{card.label}</span>
              </div>
              {/* Description */}
              <p className="text-brand-dark/70 text-sm sm:text-[21px] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
