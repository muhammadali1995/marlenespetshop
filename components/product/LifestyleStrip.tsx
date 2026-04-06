"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth < 640,
    () => false,
  );
}

interface LifestyleStripProps {
  photos: string[];
}

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

const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const TRANSITION = `transform 0.4s ${EASE}, width 0.4s ${EASE}, height 0.4s ${EASE}, opacity 0.25s ease`;

export default function LifestyleStrip({ photos }: LifestyleStripProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [lightboxMuted, setLightboxMuted] = useState(true);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);

  const isMobile = useIsMobile();

  const W_active   = isMobile ? 280 : 260;
  const W_inactive = isMobile ? 160 : 260;
  const H_active   = isMobile ? 490 : 434;
  const H_inactive = isMobile ? 340 : 317;
  const GAP        = 12;
  // Center-to-center slot distance — guarantees GAP between active and its neighbours
  const SLOT       = (W_active + W_inactive) / 2 + GAP;
  const maxVisible = isMobile ? 1 : 2;

  // Autoplay center video whenever activeIndex changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [activeIndex]);

  // Imperatively sync muted — React's `muted` prop doesn't update the DOM property
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Autoplay lightbox video when opened or index changes
  useEffect(() => {
    const video = lightboxVideoRef.current;
    if (!video || !lightboxOpen) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [lightboxOpen, lightboxIdx]);

  // Sync lightbox muted
  useEffect(() => {
    if (lightboxVideoRef.current) lightboxVideoRef.current.muted = lightboxMuted;
  }, [lightboxMuted]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  function prev() { setActiveIndex((i) => (i - 1 + photos.length) % photos.length); }
  function next() { setActiveIndex((i) => (i + 1) % photos.length); }
  function lightboxPrev() { setLightboxIdx((i) => (i - 1 + photos.length) % photos.length); }
  function lightboxNext() { setLightboxIdx((i) => (i + 1) % photos.length); }

  return (
    <>
      <div className="w-full my-10">
        {/*
          Each card is keyed by its photo index — the same DOM node physically
          translates across the screen instead of swapping content in-place.
          Position = offset * SLOT from the container centre (left: 50%).
        */}
        <div className="relative overflow-hidden" style={{ height: H_active }}>
          {photos.map((photo, idx) => {
            // Shortest-path offset in [-N/2, N/2]
            let offset = ((idx - activeIndex) % photos.length + photos.length) % photos.length;
            if (offset > photos.length / 2) offset -= photos.length;

            const isActive  = offset === 0;
            const W         = isActive ? W_active : W_inactive;
            const H         = isActive ? H_active : H_inactive;
            // translateX from left:50% so the card is centred at offset * SLOT
            const tx        = offset * SLOT - W / 2;
            // translateY so cards are vertically centred within the H_active container
            const ty        = (H_active - H) / 2;
            const visible   = Math.abs(offset) <= maxVisible;

            return (
              <div
                key={idx}
                role="button"
                tabIndex={visible ? 0 : -1}
                onClick={() => { if (visible) { setLightboxIdx(idx); setLightboxOpen(true); } }}
                onKeyDown={(e) => { if (visible && (e.key === "Enter" || e.key === " ")) { setLightboxIdx(idx); setLightboxOpen(true); } }}
                aria-label={`View photo ${idx + 1}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  width: W,
                  height: H,
                  transform: `translateX(${tx}px) translateY(${ty}px)`,
                  transition: TRANSITION,
                  opacity: visible ? 1 : 0,
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: visible ? "pointer" : "default",
                  zIndex: isActive ? 10 : maxVisible - Math.abs(offset),
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={`${W_active}px`}
                />
                {isActive && (
                  <video
                    ref={videoRef}
                    src="/video.mp4"
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {isActive && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsMuted((m) => !m); }}
                    className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <MuteIcon /> : <UnmuteIcon />}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation arrows — desktop only */}
        <div className="hidden sm:flex items-center justify-center gap-4 mt-2">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors text-2xl"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-grey-card transition-colors text-2xl"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Fullscreen lightbox */}
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
