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
                className="underline underline-offset-2 decoration-1"
                style={{ fontSize: "20px", color: "#0D0A0BD9" }}
              >
                Continue shopping
              </Link>
            </div>

            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[80px_1fr_220px_200px] gap-6 pb-4 border-b border-brand-dark/10 text-xs font-normal uppercase text-brand-dark/70 tracking-wide">
              <div className="col-span-2">Product</div>
              <div>Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {/* Cart items */}
            <div className="flex flex-col gap-3 md:gap-0 md:divide-y md:divide-brand-dark/8 border-b border-brand-dark/10 mb-16 pt-4 md:pt-0">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Footer — right-aligned block */}
            <div className="ml-auto max-w-[435px] pb-16">
              {/* Estimated total */}
              <div className="flex items-baseline justify-center gap-4 mb-5">
                <h2 className="text-base font-bold text-brand-dark">
                  Estimated total
                </h2>
                <p className="font-[Gilroy]" style={{ fontSize: "24px", color: "#0D0A0BBF" }}>
                  {formatPrice(subtotal)}
                </p>
              </div>

              {/* Tax note */}
              <p className="text-sm text-brand-dark/60 mb-6">
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
              <Link
                href="/checkout"
                className="flex items-center justify-center w-full rounded-full bg-brand-yellow font-bold text-brand-dark text-lg hover:brightness-95 transition-all"
                style={{ height: "68px" }}
              >
                Checkout
              </Link>

              {/* Dynamic checkout buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="flex-1 rounded-full font-bold text-white text-[0.85rem] tracking-wide flex items-center justify-center"
                  style={{ background: "#5a31f4", height: "50px" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="22" viewBox="0 -2 206 81" aria-label="Shop Pay" role="img">
                    <path fill="#fff" d="M29.514 35.18c-7.934-1.697-11.469-2.36-11.469-5.374 0-2.834 2.392-4.246 7.176-4.246 4.207 0 7.283 1.813 9.546 5.363.171.274.524.369.812.222l8.927-4.447a.616.616 0 0 0 .256-.864c-3.705-6.332-10.55-9.798-19.562-9.798-11.843 0-19.2 5.752-19.2 14.898 0 9.714 8.96 12.169 16.904 13.865 7.944 1.697 11.49 2.36 11.49 5.373 0 3.014-2.584 4.436-7.742 4.436-4.763 0-8.297-2.15-10.433-6.321a.63.63 0 0 0-.843-.274L6.47 52.364a.623.623 0 0 0-.278.843c3.535 7.006 10.785 10.947 20.47 10.947 12.334 0 19.787-5.658 19.787-15.088s-9.001-12.169-16.935-13.865v-.021ZM77.353 16.036c-5.062 0-9.536 1.77-12.75 4.92-.203.19-.534.053-.534-.221V.622a.62.62 0 0 0-.63-.622h-11.17a.62.62 0 0 0-.63.622v62.426a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-5.289 4.11-9.345 9.653-9.345 5.542 0 9.557 3.972 9.557 9.345v27.384a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-11.505-7.646-19.618-18.356-19.618v-.01ZM118.389 14.255c-6.065 0-11.767 1.823-15.847 4.467a.618.618 0 0 0-.202.833l4.922 8.292c.182.295.566.4.865.22a19.82 19.82 0 0 1 10.262-2.78c9.749 0 16.914 6.785 16.914 15.75 0 7.64-5.734 13.297-13.006 13.297-5.926 0-10.037-3.403-10.037-8.207 0-2.75 1.185-5.005 4.271-6.596a.607.607 0 0 0 .246-.864l-4.645-7.754a.632.632 0 0 0-.759-.264c-6.225 2.276-10.593 7.755-10.593 15.109 0 11.126 8.981 19.428 21.507 19.428 14.629 0 25.147-9.998 25.147-24.338 0-15.372-12.237-26.603-29.066-26.603l.021.01ZM180.098 15.951c-5.649 0-10.689 2.055-14.373 5.68a.313.313 0 0 1-.534-.222v-4.362a.62.62 0 0 0-.63-.621H153.68a.62.62 0 0 0-.63.621v62.331a.62.62 0 0 0 .63.622h11.169a.62.62 0 0 0 .631-.622v-20.44c0-.274.331-.41.533-.231 3.674 3.371 8.532 5.342 14.096 5.342 13.102 0 23.321-10.463 23.321-24.054 0-13.592-10.23-24.054-23.321-24.054l-.011.01Zm-2.103 37.54c-7.454 0-13.103-5.847-13.103-13.58 0-7.734 5.638-13.582 13.103-13.582 7.464 0 13.091 5.753 13.091 13.581 0 7.829-5.553 13.581-13.102 13.581h.011Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-black text-white text-[0.85rem] tracking-wide flex items-center justify-center gap-1.5"
                  style={{ height: "50px" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="font-bold">Pay</span>
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
