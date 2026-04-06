"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface WriteReviewModalProps {
  onClose: () => void;
}

const BG = "#ffffff";
const STAR_PATH = "M13.5 0.5L17.7791 8.61036L26.8148 10.1738L20.4237 16.7496L21.729 25.8262L13.5 21.78L5.27101 25.8262L6.57631 16.7496L0.185208 10.1738L9.22092 8.61036L13.5 0.5Z";

export default function WriteReviewModal({ onClose }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const active = hovered || rating;

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors";
  const inputStyle = { background: "#ffffff", border: "1px solid #d1d5db", color: "#374151" };
  const labelStyle = { color: "#6b7280", background: "#ffffff" };

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center sm:p-9"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="rounded-2xl w-full max-w-[770px] max-h-full overflow-y-auto relative"
        style={{ background: BG }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M10.5 12.7357L2.6749 20.5608C2.38213 20.8536 2.00951 21 1.55703 21C1.10456 21 0.731939 20.8536 0.439163 20.5608C0.146387 20.2681 0 19.8954 0 19.443C0 18.9905 0.146387 18.6179 0.439163 18.3251L8.26426 10.5L0.439163 2.6749C0.146387 2.38213 0 2.00951 0 1.55703C0 1.10456 0.146387 0.731939 0.439163 0.439163C0.731939 0.146387 1.10456 0 1.55703 0C2.00951 0 2.38213 0.146387 2.6749 0.439163L10.5 8.26426L18.3251 0.439163C18.6179 0.146387 18.9905 0 19.443 0C19.8954 0 20.2681 0.146387 20.5608 0.439163C20.8536 0.731939 21 1.10456 21 1.55703C21 2.00951 20.8536 2.38213 20.5608 2.6749L12.7357 10.5L20.5608 18.3251C20.8536 18.6179 21 18.9905 21 19.443C21 19.8954 20.8536 20.2681 20.5608 20.5608C20.2681 20.8536 19.8954 21 19.443 21C18.9905 21 18.6179 20.8536 18.3251 20.5608L10.5 12.7357Z" fill="black" />
          </svg>
        </button>

        <div style={{ padding: "50px 16px" }}>
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#4a6a8a" }}>
            Write a review
          </h2>

          {/* Star picker */}
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
                className="flex flex-col items-center gap-2"
              >
                <svg width="57" height="54" viewBox="0 0 27 26" fill="none">
                  <path
                    d={STAR_PATH}
                    fill={active >= star ? "#F59E0B" : "#c8d6e0"}
                    style={{ transition: "fill 0.15s" }}
                  />
                </svg>
                <span
                  className="text-xs font-medium px-1.5 py-0.5"
                  style={{ color: "#374151", border: "1px solid #d1d5db", minWidth: 22, textAlign: "center" }}
                >
                  {star}
                </span>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Name + Email */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <label className="absolute -top-2.5 left-3 px-1 text-xs" style={labelStyle}>Your name</label>
                <input type="text" className={inputClass} style={inputStyle} />
              </div>
              <div className="flex-1 relative">
                <label className="absolute -top-2.5 left-3 px-1 text-xs" style={labelStyle}>Your email</label>
                <input type="email" className={inputClass} style={inputStyle} />
              </div>
            </div>

            {/* Review title */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 px-1 text-xs" style={labelStyle}>Review title</label>
              <input type="text" className={inputClass} style={inputStyle} />
            </div>

            {/* Review content */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 px-1 text-xs" style={labelStyle}>Review content</label>
              <textarea rows={6} className={`${inputClass} resize-y`} style={inputStyle} />
            </div>

            {/* Upload photos/videos */}
            <input ref={mediaInputRef} type="file" accept="image/*,video/*" multiple className="hidden" />
            <button
              type="button"
              onClick={() => mediaInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-3 rounded-xl py-5 text-sm transition-colors"
              style={{ background: BG, border: "1.5px dashed rgba(100,140,180,0.5)", color: "#6b8aaa" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              Upload photos, videos
            </button>

            {/* Profile picture */}
            <div>
              <p className="text-sm mb-2" style={{ color: "#6b8aaa" }}>Profile picture</p>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="w-[72px] h-[72px] flex items-center justify-center rounded-xl transition-colors"
                style={{ background: BG, border: "1.5px dashed rgba(100,140,180,0.5)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </button>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-auto pt-6">
              <button
                type="button"
                className="w-full rounded-xl text-white font-bold text-base transition-opacity hover:opacity-90"
                style={{ background: "#002544", padding: "16px 40px", maxWidth: 400 }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
