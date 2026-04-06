"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { benefitCards, socialProofPhotos } from "@/lib/data";

function MuteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 576 512"><title>Volume down</title><desc>Volume down icon</desc><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"></path></svg>
  );
}

function UnmuteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export default function SocialProof() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [lightboxMuted, setLightboxMuted] = useState(true);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = lightboxVideoRef.current;
    if (!video || !lightboxOpen) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [lightboxOpen, lightboxIdx]);

  useEffect(() => {
    if (lightboxVideoRef.current) lightboxVideoRef.current.muted = lightboxMuted;
  }, [lightboxMuted]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  function openLightbox(idx: number) { setLightboxIdx(idx); setLightboxOpen(true); }
  function lightboxPrev() { setLightboxIdx((i) => (i - 1 + socialProofPhotos.length) % socialProofPhotos.length); }
  function lightboxNext() { setLightboxIdx((i) => (i + 1) % socialProofPhotos.length); }

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
    <>
    <section className="py-1 px-6">
      <div className="mx-auto max-w-[1440px]">

        {/* Mobile: 3 circles centered with symmetric peek */}
        <div className="sm:hidden -mx-6 overflow-hidden mb-8">
          <div className="flex justify-center items-center gap-4">
            {socialProofPhotos.slice(0, 3).map((_, i) => (
              <button key={i} onClick={() => openLightbox(i)} className="relative shrink-0 w-[200px] h-[200px] rounded-full overflow-hidden bg-brand-grey-card cursor-pointer" aria-label={`Open video ${i + 1}`}>
                <video src="/video.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover pointer-events-none" />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: drag-to-scroll all circles */}
        <div
          ref={sliderRef}
          className="hidden sm:flex items-center gap-4 overflow-x-auto no-scrollbar cursor-grab select-none mb-8"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {socialProofPhotos.map((_, i) => (
            <button key={i} onClick={() => openLightbox(i)} className="relative shrink-0 w-[200px] h-[200px] rounded-full overflow-hidden bg-brand-grey-card cursor-pointer" aria-label={`Open video ${i + 1}`}>
              <video src="/video.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-12">
          <h2 className="text-3xl sm:text-[40px] font-bold text-brand-dark shrink-0">
            +7500 Units Sold
          </h2>
          <p className="text-base sm:text-xl text-brand-dark/60 sm:max-w-xl leading-relaxed sm:text-right ml-auto">
            Pet-Parents love the all-in-one design. A scratcher, ball track,
            shape-shifter and even a cozy bed.
          </p>
        </div>

        {/* Benefit cards — image + label + description */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefitCards.map((card) => (
            <div key={card.label} className="flex flex-col gap-3">
              {/* Image */}
              <div className="relative aspect-5/3 rounded-[40px] overflow-hidden bg-brand-grey-card">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
              </div>
             <div className="p-4">
               {/* Label row */}
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl">{card.icon}</span>
                <span className="font-bold text-brand-dark text-base sm:text-lg">{card.label}</span>
              </div>
              {/* Description */}
              <p className="text-brand-dark/70 text-base sm:text-[21px] leading-relaxed">
                {card.description}
              </p>
             </div>
            </div>
          ))}
        </div>

      </div>
    </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center text-white text-2xl"
            aria-label="Close"
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxMuted((m) => !m); }}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 text-white text-sm"
            aria-label={lightboxMuted ? "Unmute" : "Mute"}
          >
            {lightboxMuted ? (
              <>
                <MuteIcon />
                <span>Tap to unmute</span>
              </>
            ) : (
              <UnmuteIcon />
            )}
          </button>

          <div
            className="relative h-full max-h-screen aspect-[9/16]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={lightboxVideoRef}
              src="/video.mp4"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg"
              aria-label="Previous"
            >
              ↑
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg"
              aria-label="Next"
            >
              ↓
            </button>
          </div>
        </div>
      )}
    </>
  );
}
