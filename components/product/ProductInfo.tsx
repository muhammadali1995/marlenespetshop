import StarRating from "@/components/ui/StarRating";
import { product, trustBadges } from "@/lib/data";
import { formatPrice } from "@/lib/format";

const badgeIcons: Record<string, React.ReactNode> = {
  shipping: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  refund: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  buyer: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  quality: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

export default function ProductInfo() {
  return (
    <div className="flex flex-col">
      {/* Title + Price on same row */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[28px] sm:text-[40px] font-bold text-brand-dark">
          {product.name}
        </h1>
        <div className="text-right shrink-0">
          <div className="text-[20px] sm:text-[30px] font-bold text-brand-dark leading-tight">
            {formatPrice(product.salePrice)}
          </div>
          <div className="text-[13px] sm:text-[20px] text-brand-dark/50 line-through leading-tight">
            {formatPrice(product.originalPrice)}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-3">
        <StarRating rating={product.rating} size="lg" />
        <span className="font-semibold text-brand-dark">{product.rating}</span>
        <a href="#reviews" className="text-brand-dark/60 hover:underline text-sm">
          ({product.reviewCount.toLocaleString()} reviews)
        </a>
      </div>

      {/* Voted badge */}
      <p className="text-xl my-3">{product.votedBadge}<sup>[1]</sup></p>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-3">
        {trustBadges.map((badge) => (
          <div
            key={badge.text}
            className="flex items-start gap-2 py-1"
          >
            <span className="text-brand-dark/60 shrink-0">
              {badgeIcons[badge.icon]}
            </span>
            <span className="text-[11px] font-semibold text-brand-dark/70 uppercase leading-tight">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
