"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCart } from "@/components/cart/CartProvider";
import { product } from "@/lib/data";
import { formatPrice } from "@/lib/format";

interface StickyBarProps {
  bundle: string;
  onBundleChange: (id: string) => void;
}

export default function StickyBar({ bundle, onBundleChange }: StickyBarProps) {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      // Show after scrolling ~500px (past the hero CTA)
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-navy text-white shadow-2xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Product image + label */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-0 left-0 right-0 bg-brand-yellow text-brand-dark text-[9px] font-bold text-center py-0.5">
            GET 1 FREE
          </span>
        </div>

        {/* Name + prices */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">
            {product.name} [{bundle === "buy1get1" ? "BUY 1 GET 1 FREE" : "BUY 2 GET 2 FREE"}]
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="line-through text-white/50">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="font-bold text-brand-yellow">
              {formatPrice(product.salePrice)}
            </span>
          </div>
        </div>

        {/* Bundles dropdown */}
        <select
          value={bundle}
          onChange={(e) => onBundleChange(e.target.value)}
          className="hidden sm:block bg-transparent border border-white/30 text-white text-sm rounded-full px-3 py-2 cursor-pointer"
        >
          <option value="buy1get1" className="text-brand-dark bg-white">BUY 1 GET 1 FREE</option>
          <option value="buy2get2" className="text-brand-dark bg-white">BUY 2 GET 2 FREE</option>
        </select>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="flex-shrink-0 bg-brand-yellow text-brand-dark font-bold rounded-full px-5 py-2.5 text-sm hover:brightness-95 transition-all flex items-center gap-2"
        >
          Add to cart 🛒
        </button>
      </div>
    </div>
  );
}
