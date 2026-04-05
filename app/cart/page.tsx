"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItemRow from "@/components/cart/CartItem";
import { useCartStore, selectSubtotal } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const isEmpty = items.length === 0;

  return (
    <>
      <Header />

      <main>
        {/* ── Empty state ── */}
        {isEmpty && (
          <div className="text-center py-20 px-6">
            <h1 className="text-[3.2rem] font-normal text-brand-dark mb-8">
              Your cart is empty
            </h1>
            <Link
              href="/products/kitty-kurlz"
              className="inline-block rounded-full bg-brand-yellow px-10 py-4 font-bold text-brand-dark text-base hover:brightness-95 transition-all"
            >
              Continue shopping
            </Link>
          </div>
        )}

        {/* ── Filled state ── */}
        {!isEmpty && (
          <div className="mx-auto max-w-[1500px] px-6">
            {/* Title row */}
            <div className="flex items-center justify-between pt-10 pb-4">
              <h1 className="text-[2.4rem] font-bold text-brand-dark">
                Your cart
              </h1>
              <Link
                href="/products/kitty-kurlz"
                className="text-brand-dark underline underline-offset-2 decoration-1 text-sm"
              >
                Continue shopping
              </Link>
            </div>

            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[100px_1fr_auto_auto] gap-6 pb-4 border-b border-brand-dark/10 text-xs font-normal uppercase text-brand-dark/70 tracking-wide">
              <div className="col-span-2">Product</div>
              <div className="pl-10">Quantity</div>
              <div className="text-right min-w-[9rem]">Total</div>
            </div>

            {/* Cart items */}
            <form action="/cart" method="post" id="cart">
              <div className="divide-y divide-brand-dark/8 border-b border-brand-dark/10 mb-8">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </form>

            {/* Footer — right-aligned block */}
            <div className="ml-auto max-w-[38rem] pb-16">
              {/* Estimated total */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-normal text-brand-dark">
                  Estimated total
                </h2>
                <p className="text-base font-normal text-brand-dark">
                  {formatPrice(subtotal)}
                </p>
              </div>

              {/* Tax note */}
              <p className="text-xs text-brand-dark/60 text-right mb-1">
                Taxes, discounts and{" "}
                <Link
                  href="/policies/shipping-policy"
                  className="underline underline-offset-1"
                >
                  shipping
                </Link>{" "}
                calculated at checkout.
              </p>

              {/* Checkout button */}
              <button
                type="submit"
                form="cart"
                className="w-full rounded-full bg-brand-yellow py-4 font-bold text-brand-dark text-base mt-3 hover:brightness-95 transition-all cursor-pointer"
              >
                Checkout
              </button>

              {/* Dynamic checkout buttons */}
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className="flex-1 rounded-full py-[0.85rem] font-bold text-white text-[0.85rem] tracking-wide"
                  style={{ background: "#5a31f4" }}
                >
                  shop
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full py-[0.85rem] font-bold text-white text-[0.85rem] bg-black tracking-wide"
                >
                  G Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
