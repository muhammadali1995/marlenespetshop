import StarRating from "@/components/ui/StarRating";
import { product, trustBadges } from "@/lib/data";
import { formatPrice } from "@/lib/format";

const badgeIcons: Record<string, React.ReactNode> = {
  shipping: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="20" width="20">
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M10.0014 11.6667H10.8348C11.7514 11.6667 12.5014 10.9167 12.5014 10.0001V1.66675H5.00143C3.75143 1.66675 2.65978 2.3584 2.09311 3.37507"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M1.66666 14.1665C1.66666 15.5498 2.78332 16.6665 4.16666 16.6665H4.99999C4.99999 15.7498 5.74999 14.9998 6.66666 14.9998C7.58332 14.9998 8.33332 15.7498 8.33332 16.6665H11.6667C11.6667 15.7498 12.4167 14.9998 13.3333 14.9998C14.25 14.9998 15 15.7498 15 16.6665H15.8333C17.2167 16.6665 18.3333 15.5498 18.3333 14.1665V11.6665H15.8333C15.375 11.6665 15 11.2915 15 10.8332V8.33317C15 7.87484 15.375 7.49984 15.8333 7.49984H16.9083L15.4833 5.00818C15.1833 4.49151 14.6333 4.1665 14.0333 4.1665H12.5V9.99984C12.5 10.9165 11.75 11.6665 10.8333 11.6665H9.99999"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M13.3334 18.3333C14.2538 18.3333 15 17.5871 15 16.6667C15 15.7462 14.2538 15 13.3334 15C12.4129 15 11.6667 15.7462 11.6667 16.6667C11.6667 17.5871 12.4129 18.3333 13.3334 18.3333Z"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M18.3333 10V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.3333 10Z"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M1.66666 6.66675H6.66666"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M1.66666 9.16675H4.99999"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M1.66666 11.6665H3.33332"></path>
</svg>

  ),
  refund: (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="20" width="20">
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M5.58267 7.47437L9.99933 9.95275L14.3827 7.49051"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M9.99918 14.3438V9.94409"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M8.96525 5.077L6.29858 6.51397C5.69858 6.83689 5.19857 7.65225 5.19857 8.32231V11.059C5.19857 11.7291 5.69024 12.5444 6.29858 12.8674L8.96525 14.3043C9.53192 14.6111 10.4652 14.6111 11.0402 14.3043L13.7069 12.8674C14.3069 12.5444 14.8069 11.7291 14.8069 11.059V8.31424C14.8069 7.64419 14.3153 6.82882 13.7069 6.5059L11.0402 5.06892C10.4652 4.76215 9.53192 4.76215 8.96525 5.077Z"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M18.3293 12.1084C18.3293 15.2326 15.7209 17.7594 12.4959 17.7594L13.3709 16.3467"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#818181" d="M1.66341 7.26481C1.66341 4.14059 4.27175 1.61377 7.49675 1.61377L6.62176 3.02653"></path>
</svg>

  ),
  buyer: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
<path strokeMiterlimit="10" strokeWidth="1.5" stroke="#292D32" d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#292D32" d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z"></path>
</svg>

  ),
  quality: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
<path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.5" stroke="#292D32" d="M22 17.2C22 18.1 21.75 18.95 21.3 19.67C20.47 21.06 18.95 22 17.2 22C15.45 22 13.92 21.06 13.1 19.67C12.66 18.95 12.4 18.1 12.4 17.2C12.4 14.55 14.55 12.4 17.2 12.4C19.85 12.4 22 14.55 22 17.2Z"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#292D32" d="M15.3301 17.2L16.5101 18.38L19.0701 16.02"></path>
<path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#292D32" d="M22 8.69C22 10.66 21.49 12.4 20.69 13.91C19.81 12.98 18.57 12.4 17.2 12.4C14.55 12.4 12.4 14.55 12.4 17.2C12.4 18.43 12.87 19.55 13.63 20.4C13.26 20.57 12.92 20.71 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.09998 7.56 3.09998C9.37 3.09998 10.99 3.98002 12 5.33002C13.01 3.98002 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.6 22 8.69Z"></path>
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
            className="flex items-center gap-2 py-1"
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
