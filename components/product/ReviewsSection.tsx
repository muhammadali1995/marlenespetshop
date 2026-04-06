"use client";

import Image from "next/image";
import { useState } from "react";
import StarRating from "@/components/ui/StarRating";
import { product, reviews } from "@/lib/data";

const PAGE_SIZE = 6;

export default function ReviewsSection() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
  const visible = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section id="reviews" className="py-16 px-6">
      <div className="mx-auto max-w-[1440px] flex flex-col lg:flex-row lg:gap-12 lg:items-start">

        {/* ── Left panel: heading + summary ─────────────────── */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <h2 className="text-[25px] font-bold text-brand-dark mb-6 text-center lg:text-left">
            Read The Reviews
          </h2>

          {/* Mobile: stacked centered */}
          <div className="flex flex-col items-center mb-5 lg:hidden">
            <span className="text-[64px] font-bold text-brand-dark/25 leading-none">{product.rating}</span>
            <StarRating rating={product.rating} size="lg" />
            <span className="text-brand-dark/50 text-sm mt-2">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Desktop: inline */}
          <div className="hidden lg:flex items-center gap-3 mb-5">
            <span className="text-[40px] font-bold text-brand-dark/40 leading-none">{product.rating}</span>
            <StarRating rating={product.rating} size="lg" />
            <span className="text-brand-dark/50 text-sm">({product.reviewCount.toLocaleString()} reviews)</span>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm text-brand-dark hover:border-brand-dark transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/>
              </svg>
              Rating
            </button>
            <button className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm text-brand-dark hover:border-brand-dark transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
              Photo first
            </button>
          </div>

          {/* Review grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 mb-8">
            {visible.map((review) => (
              <div
                key={review.id}
                className="relative bg-white border border-brand-dark/10 rounded-2xl flex flex-col md:flex-row"
              >
                {/* Star pill — desktop: floats above top edge */}
                <div className="hidden md:flex absolute top-0 left-[10%] right-0 justify-center -translate-y-1/2 pointer-events-none z-10">
                  <div className="bg-white border border-brand-dark/10 rounded-full px-4 py-1.5 shadow">
                    <StarRating rating={review.rating} size="lg" />
                  </div>
                </div>

                {/* Photo wrapper — allows star pill to overflow downward on mobile */}
                {review.photo && (
                  <div className="relative md:w-[40%] md:self-stretch md:-m-px md:min-h-[180px]">
                    {/* Photo with clipping */}
                    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-tl-2xl rounded-tr-2xl
                                   md:absolute md:inset-0 md:rounded-tl-2xl md:rounded-tr-none md:rounded-bl-2xl md:rounded-br-none md:aspect-auto">
                      <Image src={review.photo} alt="Review photo" fill className="object-cover" />
                    </div>
                    {/* Star pill — mobile: straddles photo/content boundary */}
                    <div className="md:hidden absolute bottom-0 left-4 translate-y-1/2 z-10">
                      <div className="bg-white rounded-xl px-3 py-2 shadow-md">
                        <StarRating rating={review.rating} size="lg" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 px-4 pt-8 md:pt-7 pb-4 flex flex-col gap-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="font-semibold text-brand-dark text-sm truncate">{review.name}</span>
                      <span className="text-sm shrink-0">{review.flag}</span>
                      {review.verified && (
                        <span className="text-xs text-green-600 shrink-0 flex items-center gap-0.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-green-500"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-brand-dark/40 shrink-0">{review.date}</span>
                  </div>

                  <p className="text-brand-dark/70 text-sm leading-relaxed flex-1">{review.text}</p>

                  {/* Thumbnail — visible on both mobile and desktop */}
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
                className="rounded-full border-2 border-brand-dark/20 px-5 py-2 text-sm font-semibold text-brand-dark disabled:opacity-30 hover:border-brand-dark transition-colors"
              >
                ‹ Previous page
              </button>
              <span className="text-sm text-brand-dark/60">{page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-full border-2 border-brand-dark/20 px-5 py-2 text-sm font-semibold text-brand-dark disabled:opacity-30 hover:border-brand-dark transition-colors"
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
