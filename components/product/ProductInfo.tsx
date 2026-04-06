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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  quality: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function ProductInfo() {
  return (
    <div className="flex flex-col">
      {/* Title + Price on same row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <h1 className="text-[38px] font-bold text-brand-dark">
          {product.name}
        </h1>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-brand-dark">
            {formatPrice(product.salePrice)}
          </div>
          <div className="text-base text-brand-dark/50 line-through">
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
