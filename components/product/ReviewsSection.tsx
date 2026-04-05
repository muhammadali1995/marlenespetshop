"use client";

import Image from "next/image";
import { useState } from "react";
import StarRating from "@/components/ui/StarRating";
import { product, reviews } from "@/lib/data";

const PAGE_SIZE = 6;

export default function ReviewsSection() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = reviews.filter(
    (r) =>
      r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section id="reviews" className="py-16 px-6">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-4xl font-bold text-brand-dark mb-8">
          Read The Reviews
        </h2>

        {/* Summary row */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="font-bold text-brand-dark text-5xl">{product.rating}</span>
          <StarRating rating={product.rating} size="lg" />
          <span className="text-brand-dark/60">
            ({product.reviewCount} reviews)
          </span>
          <button className="ml-auto rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-brand-dark hover:brightness-95 transition-all">
            Write a review
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-8">
          <button className="w-9 h-9 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:border-brand-dark transition-colors">
            🔍
          </button>
          <button className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm text-brand-dark hover:border-brand-dark transition-colors flex items-center gap-1.5">
            <span>≡</span> Rating
          </button>
          <button className="rounded-full border border-brand-dark/20 px-4 py-2 text-sm text-brand-dark hover:border-brand-dark transition-colors flex items-center gap-1.5">
            <span>⊟</span> Photo first
          </button>
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visible.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-brand-dark/10 rounded-2xl overflow-hidden flex"
            >
              {/* Photo — left column */}
              {review.photo && (
                <div className="relative w-[43%] flex-shrink-0">
                  <Image src={review.photo} alt="Review photo" fill className="object-cover" />
                </div>
              )}

              {/* Details — right column */}
              <div className="flex-1 p-5 flex flex-col gap-1.5 min-w-0">
                <StarRating rating={review.rating} size="sm" />
                {/* Name + flag + verified LEFT, date RIGHT — same row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="font-semibold text-brand-dark text-sm truncate">{review.name}</span>
                    <span className="text-sm shrink-0">{review.flag}</span>
                    {review.verified && (
                      <span className="text-xs text-green-600 shrink-0">✓ Verified</span>
                    )}
                  </div>
                  <span className="text-xs text-brand-dark/40 shrink-0">{review.date}</span>
                </div>
                <p className="text-brand-dark/70 text-sm leading-relaxed">{review.text}</p>
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
            <span className="text-sm text-brand-dark/60">
              {page} / {totalPages}
            </span>
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
    </section>
  );
}
