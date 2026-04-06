"use client";

import Image from "next/image";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
      <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StepperButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-dark/5 transition-colors shrink-0"
      aria-label={label}
    >
      {children}
    </button>
  );
}

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <>
      {/* ── Mobile card ──────────────────────────────────────── */}
      <div className="md:hidden relative rounded-2xl border border-gray-200 shadow-sm bg-white flex py-4 pr-4">
        {/* Image — bleeds past left border */}
        <div className="relative w-[130px] h-[130px] shrink-0 rounded-xl overflow-hidden -ml-3 mr-4 self-center">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>

        {/* Remove — absolute top right */}
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="absolute top-3 right-3 text-brand-dark/40 hover:text-brand-dark transition-colors"
          aria-label={`Remove ${item.name}`}
        >
          <RemoveIcon />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-3 flex-1 pr-5">
          <a
            href="/products/kitty-kurlz"
            className="font-bold text-brand-dark text-sm leading-snug hover:underline underline-offset-2"
          >
            {item.name}
          </a>

          {/* Stepper */}
          <div className="flex items-center gap-3">
            <StepperButton onClick={() => updateQuantity(item.id, item.quantity - 1)} label="Decrease quantity">
              <MinusIcon />
            </StepperButton>
            <span className="text-brand-dark text-base w-5 text-center">{item.quantity}</span>
            <StepperButton onClick={() => updateQuantity(item.id, item.quantity + 1)} label="Increase quantity">
              <PlusIcon />
            </StepperButton>
          </div>

          {/* Prices */}
          <div>
            <p className="font-bold text-xl text-brand-dark leading-tight">
              {formatPrice(item.price * item.quantity)}
            </p>
            <p className="text-sm text-brand-dark/40 line-through mt-0.5">
              {formatPrice(item.originalPrice * item.quantity)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop row ───────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[80px_1fr_auto_auto] items-center gap-6 py-6">
        {/* Image */}
        <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden bg-brand-grey-card shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>

        {/* Name */}
        <a
          href="/products/kitty-kurlz"
          className="hover:underline underline-offset-2"
          style={{ fontSize: "20px", color: "#0D0A0BBF" }}
        >
          {item.name}
        </a>

        {/* Stepper + remove */}
        <div className="flex items-center gap-3">
          <StepperButton onClick={() => updateQuantity(item.id, item.quantity - 1)} label="Decrease quantity">
            <MinusIcon />
          </StepperButton>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="text-center text-[14px] text-brand-dark border-x border-brand-dark/10 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ width: "46px", height: "24.5px", padding: "0 6.25px" }}
            aria-label={`Quantity for ${item.name}`}
          />
          <StepperButton onClick={() => updateQuantity(item.id, item.quantity + 1)} label="Increase quantity">
            <PlusIcon />
          </StepperButton>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="ml-1 text-brand-dark/40 hover:text-brand-dark transition-colors flex items-center justify-center shrink-0"
            aria-label={`Remove ${item.name}`}
          >
            <RemoveIcon />
          </button>
        </div>

        {/* Prices */}
        <div className="text-right min-w-[9rem]">
          <p className="text-sm text-brand-dark/50 line-through whitespace-nowrap">
            {formatPrice(item.originalPrice * item.quantity)}
          </p>
          <p className="font-bold whitespace-nowrap" style={{ fontSize: "20px", color: "#0D0A0B" }}>
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </>
  );
}
