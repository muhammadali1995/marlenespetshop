"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

interface LifestyleStripProps {
  photos: string[];
}

function MuteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
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

export default function LifestyleStrip({ photos }: LifestyleStripProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMobile = useIsMobile();
  const offsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2];

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

  function prev() {
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  }
  function next() {
    setActiveIndex((i) => (i + 1) % photos.length);
  }

  const W_active = isMobile ? 280 : 260;
  const W_inactive = isMobile ? 160 : 260;
  const H_active = isMobile ? 490 : 434;
  const H_inactive = isMobile ? 340 : 317;

  return (
    <div className="w-full my-10">
      <div className="flex items-center justify-center gap-3 overflow-hidden">
        {offsets.map((offset) => {
          const isActive = offset === 0;
          const photoIdx = (activeIndex + offset + photos.length) % photos.length;
          return (
            <div
              key={offset}
              className="shrink-0 relative rounded-2xl overflow-hidden bg-brand-grey-card transition-all duration-300"
              style={{ width: isActive ? W_active : W_inactive, height: isActive ? H_active : H_inactive }}
            >
              {/* Image background — different per card based on navigation */}
              <Image
                src={photos[photoIdx]}
                alt=""
                fill
                className="object-cover"
                sizes={`${isActive ? W_active : W_inactive}px`}
              />
              {/* Video overlay on active card only */}
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
              {/* Mute toggle — active card only */}
              {isActive && (
                <button
                  onClick={() => setIsMuted((m) => !m)}
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

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-4 mt-2">
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
  );
}
