"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, selectSubtotal, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

function TrashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const [expanded, setExpanded] = useState(false);
  const removeItem = useCartStore((s) => s.removeItem);

  const unitCount = item.quantity * (item.bundle === "buy1get1" ? 2 : 4);
  const bundleLabel = item.bundle === "buy1get1" ? "BUY 1 And\nGET 1 FREE" : "BUY 2 And\nGET 2 FREE";
  const badge = item.bundle === "buy1get1" ? "2x" : "4x";

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden flex bg-white" style={{ minHeight: 160 }}>
      {/* Image side */}
      <div className="relative flex-shrink-0 w-[160px] self-stretch bg-gray-100">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-start justify-start p-2.5 pointer-events-none">
          <span className="text-white font-extrabold text-[11px] leading-tight whitespace-pre-line drop-shadow-md">
            {bundleLabel}
          </span>
        </div>
        {/* Badge */}
        <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center">
          <span className="text-brand-dark font-extrabold text-[13px] leading-none">{badge}</span>
        </div>
      </div>

      {/* Content side */}
      <div className="flex-1 flex flex-col p-4 min-w-0">
        {/* Name + price row */}
        <div className="flex items-start gap-2 justify-between">
          <p className="font-bold text-brand-dark text-[15px] leading-snug flex-1">{item.name}</p>
          {/* Prices */}
          <div className="text-right shrink-0 ml-2">
            <p className="font-bold text-brand-dark text-[15px] leading-tight">
              {formatPrice(item.price * item.quantity)}
            </p>
            <p className="text-brand-dark/40 text-xs line-through mt-0.5">
              {formatPrice(item.originalPrice * item.quantity)}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[13px] text-brand-dark/60 mt-2 flex items-center gap-1 hover:text-brand-dark transition-colors self-start"
        >
          {expanded ? `Hide ${unitCount} items ∧` : `Show ${unitCount} items ∨`}
        </button>

        {/* Expanded sub-items */}
        {expanded && (
          <div className="mt-2 flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              <Image src={item.image} alt="Kitty Kurlz" fill className="object-cover" />
            </div>
            <span className="text-[13px] text-brand-dark/70">
              {unitCount} × Kitty Kurlz™
            </span>
          </div>
        )}

        {/* Spacer + trash */}
        <div className="flex-1" />
        <div className="flex justify-end mt-3">
          <button
            onClick={() => removeItem(item.id)}
            className="text-brand-dark/40 hover:text-brand-dark transition-colors"
            aria-label="Remove"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/30" onClick={onClose} />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[calc(100vw-32px)] max-w-[480px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-2xl font-bold text-brand-dark">Your cart</h2>
          <button
            onClick={onClose}
            className="text-brand-dark hover:opacity-60 transition-opacity"
            aria-label="Close cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-3">
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

        {/* Checkout button */}
        {items.length > 0 && (
          <div className="px-5 py-5 flex justify-center">
            <button
              onClick={() => { onClose(); router.push("/checkout"); }}
              className="rounded-full bg-brand-yellow px-10 py-4 font-bold text-brand-dark text-base hover:brightness-95 transition-all flex items-center gap-4"
            >
              <span className="text-[18px]">Checkout</span>
              <span className="text-[18px] font-extrabold">{formatPrice(subtotal)}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
