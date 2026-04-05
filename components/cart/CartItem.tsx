"use client";

import Image from "next/image";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-start gap-4 py-5 border-b border-brand-dark/10">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-grey-card flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-brand-dark">{item.name}</p>
        <p className="text-sm text-brand-dark/50 capitalize">{item.bundle}</p>

        {/* Qty stepper */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-brand-dark/20 rounded-full overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1.5 hover:bg-brand-grey-card transition-colors text-brand-dark font-bold"
            >
              −
            </button>
            <span className="px-3 text-sm font-semibold text-brand-dark">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1.5 hover:bg-brand-grey-card transition-colors text-brand-dark font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-brand-dark">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-brand-dark/40 hover:text-brand-dark text-sm"
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
