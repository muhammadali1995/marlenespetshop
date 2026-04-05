"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore, selectSubtotal, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function CartItemRow({ item }: { item: CartItem }) {
  const [expanded, setExpanded] = useState(false);
  const removeItem = useCartStore((s) => s.removeItem);

  const unitCount = item.quantity * (item.bundle === "buy1get1" ? 2 : 4);

  return (
    <div className="rounded-2xl border border-brand-dark/10 p-4 flex gap-3">
      {/* Bundle image */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-brand-grey-card">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-brand-dark text-sm leading-tight">{item.name}</p>
          {/* Prices */}
          <div className="text-right shrink-0">
            <p className="font-bold text-brand-dark text-sm">
              {formatPrice(item.price * item.quantity)}
            </p>
            <p className="text-brand-dark/40 text-xs line-through">
              {formatPrice(item.originalPrice * item.quantity)}
            </p>
          </div>
        </div>

        {/* Expand items */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-brand-dark/60 mt-1 flex items-center gap-1 hover:text-brand-dark"
        >
          {expanded ? `Hide ${unitCount} items ∧` : `Show ${unitCount} items ∨`}
        </button>

        {expanded && (
          <div className="mt-2 flex items-center gap-2">
            <div className="relative w-8 h-8 rounded overflow-hidden bg-brand-grey-card flex-shrink-0">
              <Image src={item.image} alt="Kitty Kurlz" fill className="object-cover" />
            </div>
            <span className="text-xs text-brand-dark/70">
              {unitCount} × Kitty Kurlz™
            </span>
          </div>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={() => removeItem(item.id)}
        className="self-end text-brand-dark/40 hover:text-brand-dark transition-colors p-1"
        aria-label="Remove"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  );
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[calc(100vw-32px)] max-w-[480px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-dark/10">
          <h2 className="text-2xl font-bold text-brand-dark">Your cart</h2>
          <button
            onClick={onClose}
            className="text-brand-dark/50 hover:text-brand-dark text-2xl leading-none"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-lg font-semibold text-brand-dark/60">Your cart is empty</p>
              <button
                onClick={onClose}
                className="rounded-full border-2 border-brand-yellow px-6 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-yellow transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          )}
        </div>

        {/* Footer — Checkout button */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-dark/10">
            <button className="w-full rounded-full bg-brand-yellow py-4 font-bold text-brand-dark text-base hover:brightness-95 transition-all flex items-center justify-center gap-3">
              <span>Checkout</span>
              <span>{formatPrice(subtotal)}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
