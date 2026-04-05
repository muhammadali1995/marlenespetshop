"use client";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, size = "md" }: StarRatingProps) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

  return (
    <span className={`inline-flex gap-0.5 ${sizes[size]}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block text-brand-grey-card">
            ★
            <span
              className="absolute inset-0 overflow-hidden text-star-gold"
              style={{ width: filled ? "100%" : half ? "50%" : "0%" }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}
