"use client";

import Image from "next/image";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
      <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  const bundleLabel =
    item.bundle === "buy1get1" ? "BUY 1 GET 1 FREE" : "BUY 2 GET 2 FREE";

  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[100px_1fr_auto_auto] items-center gap-4 md:gap-6 py-6">
      {/* Image */}
      <div className="w-24 h-24 md:w-[100px] md:h-[100px] rounded-xl overflow-hidden flex-shrink-0 bg-brand-grey-card relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Name */}
      <div>
        <a
          href="/products/kitty-kurlz"
          className="text-base font-normal text-brand-dark hover:underline underline-offset-2"
        >
          {item.name} [{bundleLabel}]
        </a>
      </div>

      {/* Quantity + remove */}
      <div className="col-start-2 md:col-start-auto flex items-center gap-3 pl-0 md:pl-10">
        <span className="sr-only">Quantity</span>
        <div className="flex items-center border border-brand-dark/20 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-9 h-9 flex items-center justify-center text-brand-dark hover:bg-brand-dark/5 transition-colors flex-shrink-0"
            aria-label={`Decrease quantity for ${item.name}`}
          >
            <MinusIcon />
          </button>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="w-9 h-9 text-center text-sm text-brand-dark border-x border-brand-dark/10 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            aria-label={`Quantity for ${item.name}`}
          />
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-9 h-9 flex items-center justify-center text-brand-dark hover:bg-brand-dark/5 transition-colors flex-shrink-0"
            aria-label={`Increase quantity for ${item.name}`}
          >
            <PlusIcon />
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-brand-dark/40 hover:text-brand-dark transition-colors flex items-center justify-center w-8 h-8 flex-shrink-0"
          aria-label={`Remove ${item.name}`}
        >
          <RemoveIcon />
        </button>
      </div>

      {/* Prices */}
      <div className="hidden md:block text-right min-w-[9rem]">
        <p className="text-sm text-brand-dark/60 line-through whitespace-nowrap">
          {formatPrice(item.originalPrice * item.quantity)}
        </p>
        <p className="text-base text-brand-dark whitespace-nowrap">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
