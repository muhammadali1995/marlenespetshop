"use client";

import Image from "next/image";
import { useState } from "react";
import StarRating from "@/components/ui/StarRating";
import { product, reviews } from "@/lib/data";

const PAGE_SIZE = 4;

export default function ReviewsSection() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
  const visible = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section id="reviews" className="py-4 px-6">
      <div className="mx-auto max-w-[1440px] flex flex-col lg:flex-row lg:gap-12 lg:items-start">
        {/* ── Left panel: heading + summary ─────────────────── */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <h2 className="text-[25px] font-bold text-brand-dark mb-6 text-center lg:text-left">
            Read The Reviews
          </h2>

          {/* Mobile: stacked centered */}
          <div className="flex flex-col items-center mb-5 lg:hidden">
            <span className="text-[64px] font-bold text-brand-dark/25 leading-none">
              {product.rating}
            </span>
            <StarRating rating={product.rating} size="lg" />
            <span className="text-brand-dark/50 text-sm mt-2">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Desktop: inline */}
          <div className="hidden lg:flex items-center gap-3 mb-5">
            <span className="text-[40px] font-bold text-brand-dark/40 leading-none">
              {product.rating}
            </span>
            <StarRating rating={product.rating} size="lg" />
            <span className="text-brand-dark/50 text-sm">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <button className="w-full lg:w-auto rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold hover:brightness-95 text-black/70 transition-all">
            Write a review
          </button>
        </div>

        {/* ── Right panel: filters + grid ───────────────────── */}
        <div className="flex-1 min-w-0 border-t border-brand-dark/20 pt-6 mt-6 lg:mt-20">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button className="w-9 h-9 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:border-brand-dark transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm text-brand-dark hover:border-brand-dark transition-colors flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
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
            <button className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm text-brand-dark hover:border-brand-dark transition-colors flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
              Photo first
            </button>
          </div>

          {/* Review grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 mb-8">
            {visible.map((review) => (
              <div
                key={review.id}
                className="relative bg-white flex flex-col md:flex-row overflow-hidden"
                style={{
                  borderRadius: 10,
                  border: "1px solid #d6d6d6",
                  boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.1)",
                  minHeight: 234,
                }}
              >
                {/* Star pill — floats above top edge, centered */}
                <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 pointer-events-none z-10">
                  <div
                    className="bg-white rounded-full px-4 py-1.5"
                    style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.12)", border: "1px solid #e8e8e8" }}
                  >
                    <StarRating rating={review.rating} size="lg" />
                  </div>
                </div>

                {/* Photo */}
                {review.photo && (
                  <div
                    className="relative shrink-0 w-full md:w-[177px] aspect-[3/2] md:aspect-auto md:self-stretch"
                    style={{ borderRadius: "10px 0 0 10px" }}
                  >
                    <Image
                      src={review.photo}
                      alt="Review photo"
                      fill
                      className="object-cover"
                      style={{ borderRadius: "10px 0 0 10px" }}
                    />
                  </div>
                )}

                {/* Content */}
                <div
                  className="flex-1 flex flex-col gap-2 min-w-0"
                  style={{ padding: 20, fontSize: 14, color: "#808080" }}
                >
                  <div className="flex items-center justify-between gap-2 mt-4 md:mt-2">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="font-semibold truncate" style={{ color: "#808080" }}>
                        {review.name}
                      </span>
                      <span className="shrink-0">{review.flag}</span>
                      {review.verified && (
                        <span className="shrink-0 flex items-center gap-0.5" style={{ color: "#22c55e", fontSize: 12 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="shrink-0" style={{ fontSize: 12, color: "#b0b0b0" }}>
                      {review.date}
                    </span>
                  </div>

                  <p className="leading-relaxed flex-1" style={{ color: "#808080" }}>
                    {review.text}
                  </p>

                  {review.photo && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 mt-1">
                      <Image src={review.photo} alt="Thumbnail" fill className="object-cover" />
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
  );
}
