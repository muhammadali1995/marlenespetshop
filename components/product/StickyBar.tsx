"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCart } from "@/components/cart/CartProvider";
import { product, bundles } from "@/lib/data";
import { formatPrice } from "@/lib/format";

interface StickyBarProps {
  bundle: string;
  onBundleChange: (id: string) => void;
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 7H19.0604C20.3225 7 21.2691 8.15465 21.0216 9.39223L19.8216 15.3922C19.6346 16.3271 18.8138 17 17.8604 17H8.11683C7.17376 17 6.35883 16.3412 6.16123 15.4191L3.66939 3.79047C3.57059 3.3294 3.16312 3 2.69158 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="20" r="1" fill="currentColor" />
      <circle cx="18.5" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

export default function StickyBar({ bundle, onBundleChange }: StickyBarProps) {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAddToCart() {
    addItem({
      id: `kitty-kurlz-${bundle}`,
      name: `${product.name} [${bundle === "buy1get1" ? "BUY 1 GET 1 FREE" : "BUY 2 GET 2 FREE"}]`,
      image: "/images/bundle-1.png",
      price: product.salePrice,
      originalPrice: product.originalPrice,
      bundle: bundle as "buy1get1" | "buy2get2",
    });
    openCart();
  }

  const activeBundle = bundles.find((b) => b.id === bundle) ?? bundles[0];

  if (!visible) return null;

  return (
    <div className="sticky-bar fixed bottom-0 left-0 right-0 z-50 text-white">
      {/* ── Mobile layout (stacked) ── */}
      <div className="sm:hidden px-4 pt-4 pb-3 flex flex-col gap-3">
        {/* Info row */}
        <div className="flex items-center gap-3">
          {/* Thumbnail with badge */}
          <div className="relative flex-shrink-0 w-[72px] h-[72px] rounded-[13px] overflow-hidden bg-white/10">
            <Image
              src={activeBundle.image}
              alt={product.name}
              fill
              className="object-cover rounded-xl"
            />
            <span className="absolute top-1 left-1 w-6 h-6 rounded-full bg-brand-yellow text-brand-dark text-[10px] font-black flex items-center justify-center leading-none">
              {activeBundle.badge}
            </span>
          </div>

          {/* Name + prices */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold leading-snug">
              {product.name} [
              {bundle === "buy1get1" ? "BUY 1 GET 1 FREE" : "BUY 2 GET 2 FREE"}]
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-[14px]">
              <span className="line-through text-white/50">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="font-bold">
                {formatPrice(product.salePrice)}
              </span>
            </div>
          </div>

          {/* Bundles dropdown */}
          <div className="relative flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-[#e8e8e8] text-brand-dark font-bold text-[13px] rounded-xl px-3 py-2 whitespace-nowrap pointer-events-none select-none">
              BUNDLES
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <select
              value={bundle}
              onChange={(e) => onBundleChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            >
              <option value="buy1get1">BUY 1 GET 1 FREE</option>
              <option value="buy2get2">BUY 2 GET 2 FREE</option>
            </select>
          </div>
        </div>

        {/* Full-width Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-brand-yellow text-brand-dark font-bold rounded-full h-[40px] text-[18px] hover:brightness-95 transition-all flex items-center justify-center gap-2"
        >
          Add to cart <CartIcon />
        </button>
      </div>

      {/* ── Desktop layout (single row) ── */}
      <div className="hidden sm:flex mx-auto w-full max-w-[1160px] h-[80px] px-6 md:px-10 lg:px-16 xl:px-6 items-center gap-4">
        {/* Thumbnail with badge */}
        <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
          <Image
            src={activeBundle.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <span className="absolute top-1 left-1 w-6 h-6 rounded-full bg-brand-yellow text-brand-dark text-[10px] font-black flex items-center justify-center leading-none">
            {activeBundle.badge}
          </span>
        </div>

        {/* Name + prices */}
        <div className="flex-1 min-w-0">
          <p className="text-lg truncate">
            {product.name} [
            {bundle === "buy1get1" ? "BUY 1 GET 1 FREE" : "BUY 2 GET 2 FREE"}]
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="line-through text-white/50">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="font-bold">{formatPrice(product.salePrice)}</span>
          </div>
        </div>

        {/* Bundles dropdown */}
        <div className="relative flex-shrink-0">
          <div className="flex items-center gap-2 bg-[#e8e8e8] text-brand-dark font-bold text-sm rounded-xl px-4 py-2 whitespace-nowrap pointer-events-none select-none">
            BUNDLES
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1L5 5L9 1"
                stroke="#333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <select
            value={bundle}
            onChange={(e) => onBundleChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          >
            <option value="buy1get1">BUY 1 GET 1 FREE</option>
            <option value="buy2get2">BUY 2 GET 2 FREE</option>
          </select>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="bg-brand-yellow text-brand-dark font-bold rounded-full px-8 py-3 text-base hover:brightness-95 transition-all 
          flex items-center gap-2 grow justify-center"
        >
          Add to cart <CartIcon />
        </button>
      </div>
    </div>
  );
}
