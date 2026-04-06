"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import StarRating from "@/components/ui/StarRating";
import WriteReviewModal from "@/components/product/WriteReviewModal";
import { product, reviews } from "@/lib/data";

const PAGE_SIZE = 4;

const SORT_OPTIONS = [
  "Most recent",
  "Highest rating",
  "Photo first",
  "Photo reviews",
  "Video reviews",
  "Video first",
  "Pin",
] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

export default function ReviewsSection() {
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>("Photo first");

  const ratingRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ratingRef.current && !ratingRef.current.contains(e.target as Node)) {
        setRatingOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
  const visible = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
    <section id="reviews" className="py-4 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px] flex flex-col lg:flex-row lg:gap-12 lg:items-start">
        {/* ── Left panel: heading + summary ─────────────────── */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <h2
            className="text-[25px] font-bold mb-6 text-center lg:text-left"
            style={{ color: "#062D3D" }}
          >
            Read The Reviews
          </h2>

          {/* Mobile: stacked centered */}
          <div className="flex flex-col items-center mb-5 lg:hidden">
            <span className="text-[64px] font-bold text-brand-dark/25 leading-none font-[Gilroy]">
              {product.rating}
            </span>
            <StarRating rating={product.rating} size="lg" fillColor="#062D3D" />
            <span className="text-brand-dark/50 text-sm mt-2">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Desktop: inline */}
          <div className="hidden lg:flex items-center gap-3 mb-5">
            <span className="text-[40px] font-bold text-brand-dark/40 leading-none font-[Gilroy]">
              {product.rating}
            </span>
            <StarRating rating={product.rating} size="lg" fillColor="#062D3D" />
            <span className="text-brand-dark/50 text-sm">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="w-full lg:w-auto rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold hover:brightness-95 text-black/70 transition-all"
          >
            Write a review
          </button>
        </div>

        {/* ── Right panel: filters + grid ───────────────────── */}
        <div className="flex-1 min-w-0 border-t border-brand-dark/20 pt-6 mt-6 lg:mt-20">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${searchOpen ? "bg-brand-yellow border-brand-yellow" : "border-brand-dark/20 hover:border-brand-dark"}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={searchOpen ? "#ffffff" : "#062D3D"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Rating dropdown */}
            <div className="relative" ref={ratingRef}>
              <button
                onClick={() => { setRatingOpen((v) => !v); setSortOpen(false); }}
                className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm hover:border-brand-dark transition-colors flex items-center gap-2"
                style={{ color: "#808080" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="14" y2="12" />
                  <line x1="4" y1="18" x2="10" y2="18" />
                </svg>
                Rating
              </button>
              {ratingOpen && (
                <div
                  className="absolute left-0 top-full mt-2 z-50 bg-white rounded-2xl overflow-hidden"
                  style={{ minWidth: 200, boxShadow: "0px 8px 32px rgba(0,0,0,0.12)" }}
                >
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      onClick={() => { setSelectedRating(selectedRating === star ? null : star); setRatingOpen(false); }}
                      className="w-full flex items-center gap-2 px-5 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
                      style={{ color: "#1b2a3b", fontWeight: selectedRating === star ? 600 : 400 }}
                    >
                      <span>{star}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#1b2a3b">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                  <button
                    onClick={() => { setSelectedRating(null); setRatingOpen(false); }}
                    className="w-full flex items-center px-5 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
                    style={{ color: "#1b2a3b", fontWeight: selectedRating === null ? 600 : 400 }}
                  >
                    All stars
                  </button>
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => { setSortOpen((v) => !v); setRatingOpen(false); }}
                className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm hover:border-brand-dark transition-colors flex items-center gap-2"
                style={{ color: "#808080" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18.5 16.44V6.75C18.5 6.55109 18.421 6.36032 18.2803 6.21967C18.1397 6.07902 17.9489 6 17.75 6C17.5511 6 17.3603 6.07902 17.2197 6.21967C17.079 6.36032 17 6.55109 17 6.75V16.44L14.78 14.22C14.7113 14.1463 14.6285 14.0872 14.5365 14.0462C14.4445 14.0052 14.3452 13.9832 14.2445 13.9814C14.1438 13.9796 14.0438 13.9982 13.9504 14.0359C13.857 14.0736 13.7722 14.1297 13.701 14.201C13.6297 14.2722 13.5736 14.357 13.5359 14.4504C13.4982 14.5438 13.4796 14.6438 13.4814 14.7445C13.4832 14.8452 13.5052 14.9445 13.5462 15.0365C13.5872 15.1285 13.6463 15.2113 13.72 15.28L17.22 18.78C17.3606 18.9205 17.5512 18.9993 17.75 18.9993C17.9488 18.9993 18.1394 18.9205 18.28 18.78L21.78 15.28C21.8537 15.2113 21.9128 15.1285 21.9538 15.0365C21.9948 14.9445 22.0168 14.8452 22.0186 14.7445C22.0204 14.6438 22.0018 14.5438 21.9641 14.4504C21.9264 14.357 21.8703 14.2722 21.799 14.201C21.7278 14.1297 21.643 14.0736 21.5496 14.0359C21.4562 13.9982 21.3562 13.9796 21.2555 13.9814C21.1548 13.9832 21.0555 14.0052 20.9635 14.0462C20.8715 14.0872 20.7887 14.1463 20.72 14.22L18.5 16.44ZM2 7.25C2 7.05109 2.07902 6.86032 2.21967 6.71967C2.36032 6.57902 2.55109 6.5 2.75 6.5H12.25C12.4489 6.5 12.6397 6.57902 12.7803 6.71967C12.921 6.86032 13 7.05109 13 7.25C13 7.44891 12.921 7.63968 12.7803 7.78033C12.6397 7.92098 12.4489 8 12.25 8H2.75C2.55109 8 2.36032 7.92098 2.21967 7.78033C2.07902 7.63968 2 7.44891 2 7.25ZM2 12.25C2 12.0511 2.07902 11.8603 2.21967 11.7197C2.36032 11.579 2.55109 11.5 2.75 11.5H8.25C8.44891 11.5 8.63968 11.579 8.78033 11.7197C8.92098 11.8603 9 12.0511 9 12.25C9 12.4489 8.92098 12.6397 8.78033 12.7803C8.63968 12.921 8.44891 13 8.25 13H2.75C2.55109 13 2.36032 12.921 2.21967 12.7803C2.07902 12.6397 2 12.4489 2 12.25ZM2 17.25C2 17.0511 2.07902 16.8603 2.21967 16.7197C2.36032 16.579 2.55109 16.5 2.75 16.5H6.25C6.44891 16.5 6.63968 16.579 6.78033 16.7197C6.92098 16.8603 7 17.0511 7 17.25C7 17.4489 6.92098 17.6397 6.78033 17.7803C6.63968 17.921 6.44891 18 6.25 18H2.75C2.55109 18 2.36032 17.921 2.21967 17.7803C2.07902 17.6397 2 17.4489 2 17.25Z"
                    fill="#000000"
                  />
                </svg>
                {selectedSort}
              </button>
              {sortOpen && (
                <div
                  className="absolute left-0 top-full mt-2 z-50 bg-white rounded-2xl overflow-hidden"
                  style={{ minWidth: 220, boxShadow: "0px 8px 32px rgba(0,0,0,0.12)" }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSelectedSort(opt); setSortOpen(false); }}
                      className="w-full flex items-center px-5 py-3 text-sm text-left transition-colors"
                      style={{
                        background: selectedSort === opt ? "#F5C518" : "transparent",
                        color: "#1b2a3b",
                        fontWeight: selectedSort === opt ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSort !== opt) (e.currentTarget as HTMLButtonElement).style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSort !== opt) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search input */}
          {searchOpen && (
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                autoFocus
                className="w-full rounded-full border border-brand-dark/20 pl-10 pr-4 py-3 text-sm outline-none focus:border-brand-dark/40 transition-colors"
                style={{ color: "#062D3D" }}
              />
            </div>
          )}

          {/* Review grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 mb-8">
            {visible.map((review) => (
              <div
                key={review.id}
                className="relative bg-white flex flex-col md:flex-row"
                style={{
                  borderRadius: 10,
                  border:
                    "var(--tr-border-width) solid var(--tr-review-box-stroke-color, #d6d6d6)",
                  boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.1)",
                  minHeight: 234,
                }}
              >
                {/* Star pill — floats above top edge, over the content side */}
                <div className="absolute top-0 left-[177px] right-0 flex justify-center -translate-y-1/2 pointer-events-none z-10">
                  <div
                    style={{
                      borderRadius: 50,
                      background: "var(--tr-color-white, #ffffff)",
                      boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.06)",
                      padding: "7px 16px",
                    }}
                  >
                    <StarRating
                      rating={review.rating}
                      size="lg"
                      fillColor="#062D3D"
                    />
                  </div>
                </div>

                {/* Photo */}
                {review.photo && (
                  <div
                    className="relative shrink-0 w-full md:w-[177px] aspect-[3/2] md:aspect-auto md:self-stretch overflow-hidden"
                    style={{ borderRadius: "9px 0 0 9px" }}
                  >
                    <Image
                      src={review.photo}
                      alt="Review photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div
                  className="flex-1 flex flex-col min-w-0"
                  style={{
                    padding: 20,
                    paddingTop: 36,
                    fontSize: 14,
                    color: "#808080",
                  }}
                >
                  {/* Name + flag */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="font-bold truncate"
                      style={{ color: "#1b2a3b" }}
                    >
                      {review.name}
                    </span>
                    <span className="shrink-0 text-base">{review.flag}</span>
                  </div>

                  {/* Verified */}
                  {review.verified && (
                    <div
                      className="flex items-center gap-1 mb-1"
                      style={{ color: "#16A679", fontSize: 13 }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5ZM5.18613 7.854L8.35267 3.89547L7.78067 3.43787L5.08053 6.81193L3.168 5.2184L2.69867 5.7816L5.18613 7.85473V7.854Z"
                          fill="#16A679"
                        />
                      </svg>
                      Verified
                    </div>
                  )}

                  {/* Date */}
                  <div
                    className="mb-2"
                    style={{ color: "#808080", fontSize: 14 }}
                  >
                    {review.date}
                  </div>

                  {/* Text */}
                  <p
                    className="leading-relaxed flex-1"
                    style={{ color: "#808080" }}
                  >
                    {review.text}
                  </p>

                  {/* Thumbnail */}
                  {review.photo && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 mt-3 border border-gray-200">
                      <Image
                        src={review.photo}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-brand-dark disabled:opacity-30 hover:bg-black/10 transition-colors"
                style={{
                  background: "#EFEFEF4D",
                  border: "1px solid #0d0a0b33",
                }}
              >
                ‹ Previous page
              </button>
              <span className="text-sm text-brand-dark/60">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-brand-dark disabled:opacity-30 hover:bg-black/10 transition-colors"
                style={{
                  background: "#EFEFEF4D",
                  border: "1px solid #0d0a0b33",
                }}
              >
                Next page ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>

    {reviewModalOpen && <WriteReviewModal onClose={() => setReviewModalOpen(false)} />}
    </>
  );
}
