"use client";

import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/lib/data";

export default function FaqSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Imperatively sync muted
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress(video.currentTime / video.duration);
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  }

  return (
    <section className="py-16 bg-white overflow-hidden">

      {/* Heading */}
      <div className="mx-auto max-w-[1440px] px-6 mb-8">
        <h2 className="text-4xl font-bold text-brand-dark">
          Frequently Asked
        </h2>
      </div>

      {/* Stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row lg:items-center">

        {/* Video wrapper — relative context for Watch Video badge */}
        <div className="relative shrink-0 w-[80vw] lg:w-1/2 mb-10 lg:mb-0">
          <div
            role="button"
            tabIndex={0}
            className="relative overflow-hidden bg-brand-grey-card cursor-pointer
                       rounded-r-[9999px] w-screen lg:w-full"
            style={{ aspectRatio: "16/9" }}
            onClick={togglePlay}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") togglePlay(); }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <video
              ref={videoRef}
              src="/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient for controls */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/70 to-transparent" />

            {/* Controls bar */}
            <div
              className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="shrink-0 w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center shadow"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand-dark">
                    <rect x="5" y="3" width="4" height="18" />
                    <rect x="15" y="3" width="4" height="18" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand-dark ml-0.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              {/* Progress bar */}
              <div
                className="flex-1 max-w-[50%] h-0.75 rounded-full bg-white/30 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full rounded-full bg-white transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* Mute / Unmute */}
              <button
                onClick={() => setIsMuted((m) => !m)}
                className="shrink-0 text-white"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Watch Video badge — mobile only, overlaps bottom-right corner */}
          <div className="lg:hidden absolute -right-14 top-full -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-brand-navy flex flex-col items-center justify-center cursor-pointer select-none">
            <span className="text-white text-xs font-bold text-center leading-tight">Watch<br />Video</span>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex-1 px-6 lg:px-12 pt-8 lg:pt-0">
          <Accordion items={faqItems} />
        </div>

      </div>
    </section>
  );
}
