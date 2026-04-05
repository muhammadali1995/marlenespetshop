"use client";

import { useEffect, useRef, useState } from "react";

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

export default function LifestyleStrip({ photos }: LifestyleStripProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === 2) { // offset 0 = center = active
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  function prev() {
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  }
  function next() {
    setActiveIndex((i) => (i + 1) % photos.length);
  }

  const isMobile = useIsMobile();
  const offsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2];
  const W = isMobile ? 160 : 260;
  const H_active = isMobile ? 270 : 434;
  const H_inactive = isMobile ? 200 : 317;

  return (
    <div className="w-full my-10">
      {/* 5-card strip — center is always active */}
      <div className="flex items-center justify-center gap-3 overflow-hidden">
        {offsets.map((offset, i) => {
          const isActive = offset === 0;
          return (
            <div
              key={offset}
              className="shrink-0 relative rounded-2xl overflow-hidden bg-brand-grey-card transition-all duration-300"
              style={{ width: W, height: isActive ? H_active : H_inactive }}
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src="/video.mp4"
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Sound icon — bottom right */}
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white">
                <MuteIcon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-4 mt-4">
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
