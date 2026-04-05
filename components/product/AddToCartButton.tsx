"use client";

import { useCartStore } from "@/store/cartStore";
import { useCart } from "@/components/cart/CartProvider";
import { product } from "@/lib/data";

interface AddToCartButtonProps {
  bundle: string;
}

export default function AddToCartButton({ bundle }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { openCart } = useCart();

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

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAddToCart}
        className="w-full rounded-full bg-brand-yellow py-4 font-bold text-brand-dark text-lg hover:brightness-95 active:scale-[0.98] transition-all"
      >
        Add to cart
      </button>
      {/* Shopify Pay button */}
      <button className="w-full rounded-full bg-[#5a31f4] py-4 font-bold text-white text-lg hover:bg-[#4a28d4] transition-all flex items-center justify-center gap-2">
        Buy with
        <span className="font-black tracking-tight">shop</span>
      </button>
      <button className="text-sm text-brand-dark/60 underline text-center hover:text-brand-dark">
        More payment options
      </button>
    </div>
  );
}
