"use client";

import { useState } from "react";
import { useCartStore, selectSubtotal } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

export default function CartSummary() {
  const [coupon, setCoupon] = useState("");
  const subtotal = useCartStore(selectSubtotal);

  return (
    <div className="bg-white border border-brand-dark/10 rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-bold text-lg text-brand-dark">Order Summary</h2>

      {/* Discount code */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Discount code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 border border-brand-dark/20 rounded-full px-4 py-2 text-sm outline-none focus:border-brand-yellow text-brand-dark"
        />
        <button className="rounded-full border-2 border-brand-dark px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
          Apply
        </button>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between text-brand-dark">
        <span>Subtotal</span>
        <span className="font-semibold">{formatPrice(subtotal)}</span>
      </div>

      <div className="border-t border-brand-dark/10 pt-4 flex justify-between text-brand-dark">
        <span className="font-bold text-lg">Total</span>
        <span className="font-bold text-lg">{formatPrice(subtotal)}</span>
      </div>

      <button className="w-full rounded-full bg-brand-yellow py-4 font-bold text-brand-dark text-lg hover:brightness-95 transition-all">
        Check out
      </button>
    </div>
  );
}
