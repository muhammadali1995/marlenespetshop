"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, selectSubtotal, selectTotalItems } from "@/store/cartStore";

// ─── Icons ────────────────────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg width="24" height="22" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 7H19.0604C20.3225 7 21.2691 8.15465 21.0216 9.39223L19.8216 15.3922C19.6346 16.3271 18.8138 17 17.8604 17H8.11683C7.17376 17 6.35883 16.3412 6.16123 15.4191L3.66939 3.79047C3.57059 3.3294 3.16312 3 2.69158 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7.5" cy="20" r="1" fill="currentColor" />
      <circle cx="18.5" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function ChevronDown({ color = "#333" }: { color?: string }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5l5 5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp({ color = "#005bd1" }: { color?: string }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 6.5l5-5 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <rect x="1" y="7.5" width="14" height="10" rx="2" stroke="#999" strokeWidth="1.4" />
      <path d="M4 7.5V5a4 4 0 0 1 8 0v2.5" stroke="#999" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#999" strokeWidth="1.2" />
      <path d="M7 7c0-1.105.895-2 2-2s2 .895 2 2c0 .768-.432 1.435-1.065 1.775C9.36 11.053 9 11.448 9 12" stroke="#999" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="14" r="0.75" fill="#999" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#707070" strokeWidth="1.2" />
      <path d="M8 7v5" stroke="#707070" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="#707070" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.5 1.5H13.5V6.5L8.207 11.793a1 1 0 0 1-1.414 0L2.207 7.207a1 1 0 0 1 0-1.414L7.5 1.5z" stroke="#333" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="11.5" cy="4.5" r="0.75" fill="#333" />
    </svg>
  );
}

// ─── Payment Logos ────────────────────────────────────────────────────────────

function ShopPayButtonContent() {
  return (
    <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
      <text fontFamily="-apple-system, Helvetica Neue, Arial, sans-serif" fontWeight="900" fontSize="14" fill="white" y="12" x="0" letterSpacing="0.2">shop</text>
    </svg>
  );
}

function GooglePayButtonContent() {
  return (
    <div className="flex items-center gap-[5px]">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.566 2.684-3.874 2.684-6.615z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
      </svg>
      <span className="text-white font-medium text-[15px]">Pay</span>
    </div>
  );
}

function VisaIcon() {
  return (
    <div className="w-[38px] h-6 bg-white border border-[#e0e0e0] rounded flex items-center justify-center">
      <svg width="30" height="10" viewBox="0 0 30 10">
        <text x="0" y="9" fontFamily="Arial" fontWeight="900" fontSize="10" fill="#1a1f71" letterSpacing="1">VISA</text>
      </svg>
    </div>
  );
}

function MastercardIcon() {
  return (
    <div className="w-[38px] h-6 bg-white border border-[#e0e0e0] rounded flex items-center justify-center overflow-hidden">
      <svg width="30" height="18" viewBox="0 0 30 18">
        <circle cx="11" cy="9" r="8" fill="#EB001B" />
        <circle cx="19" cy="9" r="8" fill="#F79E1B" fillOpacity="0.9" />
        <path d="M15 3.527a8 8 0 0 1 0 10.946A8 8 0 0 1 15 3.527z" fill="#FF5F00" />
      </svg>
    </div>
  );
}

function AmexIcon() {
  return (
    <div className="w-[38px] h-6 bg-[#016FD0] border border-[#016FD0] rounded flex items-center justify-center">
      <svg width="28" height="9" viewBox="0 0 28 9">
        <text x="0" y="8" fontFamily="Arial" fontWeight="900" fontSize="8" fill="white" letterSpacing="0.6">AMEX</text>
      </svg>
    </div>
  );
}

function ShopPayTextLogo() {
  return <span className="font-black text-[#5a31f4] text-[15px] tracking-tight">shop</span>;
}

function KlarnaLogo() {
  return (
    <div className="bg-[#FFB3C7] rounded px-2 py-[3px] inline-flex items-center">
      <span className="font-bold text-[11px] text-[#17120E]">Klarna</span>
    </div>
  );
}

function AffirmLogo() {
  return (
    <svg width="52" height="16" viewBox="0 0 52 16" fill="none">
      <text x="0" y="13" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="400" fontSize="14" fill="#060809">affirm</text>
      <line x1="0" y1="15.5" x2="52" y2="15.5" stroke="#00CFBE" strokeWidth="1.5" />
    </svg>
  );
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div className={`w-[18px] h-[18px] rounded-full flex-shrink-0 bg-white box-border ${
      selected ? "border-[5.5px] border-[#005bd1]" : "border-[1.5px] border-[#c8c8c8]"
    }`} />
  );
}

// ─── Shared classes ───────────────────────────────────────────────────────────

const fieldCls = "border border-[#dedede] rounded-lg bg-white focus-within:border-[#005bd1]";
const inputCls = "w-full px-[11px] py-[13.5px] text-[14px] border-none rounded-lg outline-none bg-transparent placeholder:text-[#767676] text-black";

const SF = `-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function MobileProductRow({
  thumbSize = 60,
  showToggle = true,
  displayItems,
  displaySub,
  mobileShowItems,
  setMobileShowItems,
  fmt,
}: {
  thumbSize?: number;
  showToggle?: boolean;
  displayItems: number;
  displaySub: number;
  mobileShowItems: boolean;
  setMobileShowItems: (v: boolean) => void;
  fmt: (n: number) => string;
}) {
  return (
    <>
      <div className="flex items-start gap-[14px]">
        <div className="relative flex-shrink-0">
          <Image
            src="/images/bundle-1.jpg"
            alt="Kitty Kurlz™"
            width={thumbSize}
            height={thumbSize}
            className="rounded-lg border border-[#e0e0e0] block object-cover bg-white"
          />
          <span
            className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full bg-[#333] text-white text-[11px] font-bold flex items-center justify-center"
          >
            {displayItems}
          </span>
        </div>
        <div className="flex-1 pt-[2px]">
          <div className="text-[14px] leading-snug">Kitty Kurlz™ [BUY 1 GET 1 FREE]</div>
          {showToggle && (
            <button
              onClick={() => setMobileShowItems(!mobileShowItems)}
              className="text-[13px] text-[#005bd1] bg-transparent border-none p-0 pt-[2px] cursor-pointer flex items-center gap-1"
            >
              {mobileShowItems ? "Hide 12 items" : "Show 12 items"}
              {mobileShowItems ? <ChevronUp /> : <ChevronDown color="#005bd1" />}
            </button>
          )}
        </div>
        <div className="text-[14px] whitespace-nowrap pt-[2px]">{fmt(displaySub)}</div>
      </div>
      {showToggle && mobileShowItems && (
        <div className="flex items-center gap-3 mt-3 pl-[74px]">
          <Image
            src="/images/bundle-1.jpg"
            alt="Kitty Kurlz™"
            width={38}
            height={38}
            className="rounded-md border border-[#e0e0e0] object-cover bg-white"
          />
          <span className="text-[14px]">12 × Kitty Kurlz™</span>
        </div>
      )}
    </>
  );
}

function MobileOrderDetails({
  discountValue,
  setDiscountValue,
  displaySub,
  displayTotal,
  shipping,
  fmt,
}: {
  discountValue: string;
  setDiscountValue: (v: string) => void;
  displaySub: number;
  displayTotal: number;
  shipping: number;
  fmt: (n: number) => string;
}) {
  return (
    <>
      {/* Discount code */}
      <div className="flex gap-[10px] mb-4">
        <div className={`flex-1 ${fieldCls}`}>
          <input
            value={discountValue}
            onChange={e => setDiscountValue(e.target.value)}
            placeholder="Discount code"
            className="w-full px-[11px] py-[13.5px] text-[14px] border-none rounded-lg outline-none bg-transparent placeholder:text-[#767676]"
          />
        </div>
        <button className="px-4 bg-[#ededed] hover:bg-[#e0e0e0] rounded-lg border border-[#dedede] text-[14px] font-medium cursor-pointer whitespace-nowrap text-[#333] transition-colors duration-150">
          Apply
        </button>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between mb-2 text-[14px]">
        <span>Subtotal</span>
        <span>{fmt(displaySub)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center mb-4 text-[14px]">
        <span className="flex items-center gap-[5px]">
          Shipping
          <span title="Calculated at checkout" className="inline-flex cursor-help">
            <InfoIcon />
          </span>
        </span>
        <span>{fmt(shipping)}</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e0e0e0] mb-4" />

      {/* Total */}
      <div className="flex justify-between items-baseline">
        <span className="text-[16px] font-bold">Total</span>
        <span className="text-[20px] font-bold">{fmt(displayTotal)}</span>
      </div>
    </>
  );
}

const SHIPPING = 49_000;
const footerLinks = ["Refund policy", "Shipping", "Privacy policy", "Terms of service", "Cancellations", "Contact"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const subtotal   = useCartStore(selectSubtotal);
  const totalItems = useCartStore(selectTotalItems);

  const [emailOffers,        setEmailOffers]        = useState(true);
  const [textOffers,         setTextOffers]         = useState(false);
  const [billingAddressSame, setBillingAddressSame] = useState(true);
  const [paymentMethod,      setPaymentMethod]      = useState<"credit" | "shopPay" | "klarna" | "affirm">("credit");
  const [discountCode,       setDiscountCode]       = useState("");
  const [mobileSummaryOpen,  setMobileSummaryOpen]  = useState(false);
  const [mobileBottomOpen,   setMobileBottomOpen]   = useState(false);
  const [mobileShowItems,    setMobileShowItems]    = useState(true);
  const [showItems,          setShowItems]          = useState(true);

  const displaySub   = subtotal   > 0 ? subtotal   : 2_226_000;
  const displayItems = totalItems > 0 ? totalItems : 6;
  const displayTotal = displaySub + SHIPPING;

  const fmt = (n: number) => `UZS ${n.toLocaleString("en-US")}.00`;

  return (
    <>
      <style>{`
        .co-page { font-family: ${SF}; }
        .co-page input::placeholder { color: #767676; }
        .co-page select { color: #000; }
      `}</style>

      <div className="co-page flex flex-col min-h-screen bg-white text-[14px] text-black">

        {/* ── HEADER ── */}
        <header className="h-[75px] bg-white border-b border-[#dedede] flex items-center justify-center sticky top-0 z-50 flex-shrink-0">
          <div className="w-full max-w-[1200px] flex items-center px-6">
            <div className="flex-1" />
            <Link href="/" className="flex items-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0592/0194/5677/files/Untitled_design_-_2024-10-18T102851.555_x320.png?v=1729258141"
                alt="Marlene's Pet Shop"
                width={150}
                height={32}
                className="block"
              />
            </Link>
            <div className="flex-1 flex justify-end">
              <a href="/cart" aria-label="Cart" className="text-[#333] flex items-center p-2">
                <CartIcon />
              </a>
            </div>
          </div>
        </header>

        {/* ── MOBILE: Top "Order summary" sticky bar ── */}
        <div className="md:hidden sticky top-[75px] z-40 bg-[#f5f5f5] border-b border-[#e0e0e0]">
          {/* Collapsed bar */}
          <button
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full flex items-center justify-between px-5 py-[14px] bg-transparent border-none cursor-pointer"
          >
            <span className="flex items-center gap-[6px] text-[#005bd1] text-[14px] font-medium">
              Order summary
              {mobileSummaryOpen ? <ChevronUp color="#005bd1" /> : <ChevronDown color="#005bd1" />}
            </span>
            <span className="text-[17px] font-bold text-black">{fmt(displayTotal)}</span>
          </button>

          {/* Expanded panel */}
          {mobileSummaryOpen && (
            <div className="px-5 pb-5 bg-[#f5f5f5]">
              {/* Product row */}
              <div className="mb-4">
                <MobileProductRow thumbSize={60} showToggle={true} displayItems={displayItems} displaySub={displaySub} mobileShowItems={mobileShowItems} setMobileShowItems={setMobileShowItems} fmt={fmt} />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e0e0e0] mb-4" />

              {/* Order details */}
              <MobileOrderDetails discountValue={discountCode} setDiscountValue={setDiscountCode} displaySub={displaySub} displayTotal={displayTotal} shipping={SHIPPING} fmt={fmt} />
            </div>
          )}
        </div>

        {/* ── MOBILE FORM (md:hidden) ── */}
        <div className="md:hidden flex-1 bg-white">
          <div className="px-5 pt-6 pb-0">

            {/* Express checkout */}
            <div className="mb-7">
              <p className="text-[13px] text-[#707070] text-center mb-3">Express checkout</p>
              <div className="flex gap-[10px]">
                <button aria-label="Shop Pay" className="flex-1 h-12 bg-[#5a31f4] rounded-lg flex items-center justify-center gap-[3px] border-none cursor-pointer">
                  <ShopPayButtonContent />
                  <span className="text-white font-semibold text-[15px]">Pay</span>
                </button>
                <button aria-label="Google Pay" className="flex-1 h-12 bg-black rounded-lg flex items-center justify-center border-none cursor-pointer">
                  <GooglePayButtonContent />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-[#e0e0e0]" />
                <span className="text-[13px] text-[#707070] whitespace-nowrap">Or continue with card</span>
                <div className="flex-1 h-px bg-[#e0e0e0]" />
              </div>
            </div>

            {/* ── CONTACT ── */}
            <section className="mb-5">
              <h2 className="text-[21px] font-semibold mb-4 leading-snug">Contact</h2>
              <div className={`${fieldCls} mb-[10px]`}>
                <input type="email" placeholder="Email" className={inputCls} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={emailOffers} onChange={e => setEmailOffers(e.target.checked)}
                  className="w-[18px] h-[18px] accent-[#005bd1] cursor-pointer flex-shrink-0" />
                <span>Email me with news and offers</span>
              </label>
            </section>

            {/* ── DELIVERY ── */}
            <section className="mb-5">
              <h2 className="text-[21px] font-semibold mb-4 leading-snug">Delivery</h2>

              <div className={`${fieldCls} relative mb-[10px]`}>
                <label className="absolute top-[7px] left-[11px] text-[11px] text-[#707070] pointer-events-none">Country/Region</label>
                <select className={`${inputCls} pt-[22px] pb-[6px] appearance-none cursor-pointer pr-8`}>
                  <option>Uzbekistan</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Russia</option>
                  <option>Kazakhstan</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex">
                  <ChevronDown />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
                <div className={fieldCls}><input placeholder="First name (optional)" className={inputCls} /></div>
                <div className={fieldCls}><input placeholder="Last name" className={inputCls} /></div>
              </div>

              <div className={`${fieldCls} mb-[10px]`}>
                <input placeholder="Address" className={inputCls} />
              </div>

              <div className={`${fieldCls} mb-[10px]`}>
                <input placeholder="Apartment, suite, etc. (optional)" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
                <div className={fieldCls}><input placeholder="City" className={inputCls} /></div>
                <div className={fieldCls}><input placeholder="Postal code (optional)" className={inputCls} /></div>
              </div>

              <div className={`${fieldCls} relative mb-[10px]`}>
                <input placeholder="Phone" className={`${inputCls} pr-[42px]`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex pointer-events-none">
                  <QuestionIcon />
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={textOffers} onChange={e => setTextOffers(e.target.checked)}
                  className="w-[18px] h-[18px] accent-[#005bd1] cursor-pointer flex-shrink-0" />
                <span>Text me with news and offers</span>
              </label>
            </section>

            {/* ── SHIPPING METHOD ── */}
            <section className="mb-5">
              <h2 className="text-[16px] font-semibold mb-3 leading-snug">Shipping method</h2>
              <div className="border border-[#005bd1] rounded-lg bg-white px-4 py-[14px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-[1px]"><RadioDot selected={true} /></div>
                    <div>
                      <div className="text-[14px] leading-snug">🌍 Worldwide Shipping (5-9 Days)</div>
                      <div className="text-[12px] text-[#707070] mt-[2px]">Tracking number provided</div>
                    </div>
                  </div>
                  <div className="text-[14px] font-bold whitespace-nowrap pt-[1px]">{fmt(SHIPPING)}</div>
                </div>
              </div>
            </section>

            {/* ── PAYMENT ── */}
            <section className="mb-6">
              <h2 className="text-[21px] font-semibold mb-1 leading-snug">Payment</h2>
              <p className="text-[13px] text-[#707070] mb-[14px]">We do not store your credit card data, and every payment is encrypted.</p>

              <div className="border border-[#dedede] rounded-lg overflow-hidden">
                <div className="border-b border-[#dedede]">
                  <button type="button" onClick={() => setPaymentMethod("credit")}
                    className="w-full text-left px-4 py-4 flex justify-between items-center cursor-pointer hover:bg-[#fafafa]">
                    <div className="flex items-center gap-[10px]">
                      <RadioDot selected={paymentMethod === "credit"} />
                      <span className="text-[14px] font-medium">Credit card</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <VisaIcon /><MastercardIcon /><AmexIcon />
                      <div className="text-[11px] bg-[#f4f4f4] border border-[#e0e0e0] px-[6px] py-[2px] rounded text-[#555] font-medium">+5</div>
                    </div>
                  </button>
                  {paymentMethod === "credit" && (
                    <div className="px-4 pb-4">
                      <div className={`${fieldCls} relative mb-[10px]`}>
                        <input placeholder="Card number" className={`${inputCls} pr-[44px]`} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex pointer-events-none"><LockIcon /></span>
                      </div>
                      <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
                        <div className={fieldCls}><input placeholder="Expiration date (MM / YY)" className={inputCls} /></div>
                        <div className={`${fieldCls} relative`}>
                          <input placeholder="Security code" className={`${inputCls} pr-[44px]`} />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex pointer-events-none"><QuestionIcon /></span>
                        </div>
                      </div>
                      <div className={`${fieldCls} mb-3`}>
                        <input placeholder="Name on card" className={inputCls} />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={billingAddressSame} onChange={e => setBillingAddressSame(e.target.checked)}
                          className="w-[18px] h-[18px] accent-[#005bd1] cursor-pointer flex-shrink-0" />
                        <span className="text-[14px]">Use shipping address as billing address</span>
                      </label>
                    </div>
                  )}
                </div>

                <button type="button" onClick={() => setPaymentMethod("shopPay")}
                  className="w-full text-left px-4 py-[14px] border-b border-[#dedede] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] bg-white">
                  <div className="flex items-center gap-[10px]">
                    <RadioDot selected={paymentMethod === "shopPay"} />
                    <span className="text-[14px]">Shop Pay <span className="text-[#686b6e]">· Pay in full or in installments</span></span>
                  </div>
                  <ShopPayTextLogo />
                </button>

                <button type="button" onClick={() => setPaymentMethod("klarna")}
                  className="w-full text-left px-4 py-[14px] border-b border-[#dedede] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] bg-white">
                  <div className="flex items-center gap-[10px]">
                    <RadioDot selected={paymentMethod === "klarna"} />
                    <span className="text-[14px]">Klarna: flexible payment options</span>
                  </div>
                  <KlarnaLogo />
                </button>

                <button type="button" onClick={() => setPaymentMethod("affirm")}
                  className="w-full text-left px-4 py-[14px] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] bg-white">
                  <div className="flex items-center gap-[10px]">
                    <RadioDot selected={paymentMethod === "affirm"} />
                    <span className="text-[14px]">Affirm: Buy now, pay later</span>
                  </div>
                  <AffirmLogo />
                </button>
              </div>
            </section>

            {/* ── SAVE INFO ── */}
            <section className="mb-6">
              <p className="text-[14px] mb-3">Save my information for a faster checkout</p>
              <div className={`${fieldCls} flex items-center gap-[10px] p-[10px_11px] mb-[10px]`}>
                <span className="text-[20px] leading-none flex-shrink-0">📱</span>
                <div className="flex-1">
                  <div className="text-[11px] text-[#707070] mb-[2px]">Mobile phone (optional)</div>
                  <input placeholder="+998" className="border-none outline-none text-[14px] w-full p-0 bg-transparent placeholder:text-[#767676]" />
                </div>
              </div>
              <p className="text-[13px] text-[#686b6e] leading-relaxed">
                By providing your phone number, you agree to create a Shop account subject to Shop&apos;s{" "}
                <a href="#" className="text-[#005bd1] hover:underline">Terms</a>{" "}and{" "}
                <a href="#" className="text-[#005bd1] hover:underline">Privacy Policy</a>.
              </p>
            </section>
          </div>

          {/* ── MOBILE BOTTOM SECTION ── */}
          <div className="bg-[#f5f5f5] border-t border-[#e0e0e0] px-5 pt-5 pb-6">

            {/* Collapsed state */}
            {!mobileBottomOpen && (
              <>
                {/* Add discount button */}
                <button
                  onClick={() => setMobileBottomOpen(true)}
                  className="w-full flex items-center gap-[8px] border border-[#dedede] rounded-lg bg-white px-4 py-[13px] mb-4 cursor-pointer text-[14px] text-[#333]"
                >
                  <TagIcon />
                  <span>Add discount</span>
                </button>

                {/* Total row */}
                <button
                  onClick={() => setMobileBottomOpen(true)}
                  className="w-full flex items-center gap-3 mb-5 bg-transparent border-none cursor-pointer p-0 text-left"
                >
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src="/images/bundle-1.jpg"
                      alt="Kitty Kurlz™"
                      width={40}
                      height={40}
                      className="rounded-lg border border-[#e0e0e0] block object-cover bg-white"
                    />
                    <span className="absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full bg-[#333] text-white text-[10px] font-bold flex items-center justify-center">
                      {displayItems}
                    </span>
                  </div>
                  {/* Left side */}
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-black">Total</div>
                    <div className="text-[12px] text-[#707070]">{displayItems} items</div>
                  </div>
                  {/* Right side */}
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold text-black">{fmt(displayTotal)}</span>
                    <ChevronDown color="#333" />
                  </div>
                </button>
              </>
            )}

            {/* Expanded state */}
            {mobileBottomOpen && (
              <div className="mb-5">
                {/* Order summary heading */}
                <button
                  onClick={() => setMobileBottomOpen(false)}
                  className="w-full flex items-center justify-between mb-5 bg-transparent border-none cursor-pointer p-0"
                >
                  <span className="text-[18px] font-bold text-black">Order summary</span>
                  <ChevronUp color="#333" />
                </button>

                {/* Product row */}
                <div className="mb-4">
                  <MobileProductRow thumbSize={60} showToggle={true} displayItems={displayItems} displaySub={displaySub} mobileShowItems={mobileShowItems} setMobileShowItems={setMobileShowItems} fmt={fmt} />
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e0e0e0] mb-4" />

                {/* Order details */}
                <MobileOrderDetails discountValue={discountCode} setDiscountValue={setDiscountCode} displaySub={displaySub} displayTotal={displayTotal} shipping={SHIPPING} fmt={fmt} />
              </div>
            )}

            {/* Pay now button — always shown */}
            <button className="w-full h-[52px] bg-[#005bd1] hover:bg-[#004bb5] text-white border-none rounded-lg text-[14px] font-semibold cursor-pointer mb-5 transition-colors duration-150">
              Pay now
            </button>

            {/* Footer links */}
            <div className="flex flex-wrap gap-x-[14px] gap-y-[6px] text-[13px]">
              {footerLinks.map(link => (
                <a key={link} href="#" className="text-[#005bd1] no-underline hover:underline">{link}</a>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
        <div className="hidden md:block relative flex-1">
          {/* Full-width split background */}
          <div className="absolute inset-0 flex pointer-events-none">
            <div className="flex-[0_0_54.17%] bg-white" />
            <div className="flex-1 bg-[#f5f5f5]" />
          </div>

          {/* Centered content, capped at 1200px */}
          <div className="relative flex max-w-[1200px] mx-auto min-h-full">

            {/* ── LEFT PANEL ── */}
            <div className="flex-1 flex justify-end min-w-0">
              <div className="w-full max-w-[580px] p-[38px]">

                {/* Express checkout */}
                <div className="mb-7">
                  <p className="text-[13px] text-[#707070] text-center mb-3">Express checkout</p>
                  <div className="flex gap-[10px]">
                    <button aria-label="Shop Pay" className="flex-1 h-12 bg-[#5a31f4] rounded-lg flex items-center justify-center gap-[3px] border-none cursor-pointer">
                      <ShopPayButtonContent />
                      <span className="text-white font-semibold text-[15px]">Pay</span>
                    </button>
                    <button aria-label="Google Pay" className="flex-1 h-12 bg-black rounded-lg flex items-center justify-center border-none cursor-pointer">
                      <GooglePayButtonContent />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                    <span className="text-[13px] text-[#707070] whitespace-nowrap">Or continue to pay with your credit/debit card below</span>
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                  </div>
                </div>

                {/* ── CONTACT ── */}
                <section className="mb-5">
                  <h2 className="text-[21px] font-semibold mb-4 leading-snug">Contact</h2>
                  <div className={`${fieldCls} mb-[10px]`}>
                    <input type="email" placeholder="Email" className={inputCls} />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={emailOffers} onChange={e => setEmailOffers(e.target.checked)}
                      className="w-[18px] h-[18px] accent-[#005bd1] cursor-pointer flex-shrink-0" />
                    <span>Email me with news and offers</span>
                  </label>
                </section>

                {/* ── DELIVERY ── */}
                <section className="mb-5">
                  <h2 className="text-[21px] font-semibold mb-4 leading-snug">Delivery</h2>

                  {/* Country */}
                  <div className={`${fieldCls} relative mb-[10px]`}>
                    <label className="absolute top-[7px] left-[11px] text-[11px] text-[#707070] pointer-events-none">Country/Region</label>
                    <select className={`${inputCls} pt-[22px] pb-[6px] appearance-none cursor-pointer pr-8`}>
                      <option>Uzbekistan</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Russia</option>
                      <option>Kazakhstan</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex">
                      <ChevronDown />
                    </div>
                  </div>

                  {/* First / Last name */}
                  <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
                    <div className={fieldCls}><input placeholder="First name (optional)" className={inputCls} /></div>
                    <div className={fieldCls}><input placeholder="Last name" className={inputCls} /></div>
                  </div>

                  {/* Address */}
                  <div className={`${fieldCls} mb-[10px]`}>
                    <input placeholder="Address" className={inputCls} />
                  </div>

                  {/* Apartment */}
                  <div className={`${fieldCls} mb-[10px]`}>
                    <input placeholder="Apartment, suite, etc. (optional)" className={inputCls} />
                  </div>

                  {/* City / Postal */}
                  <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
                    <div className={fieldCls}><input placeholder="City" className={inputCls} /></div>
                    <div className={fieldCls}><input placeholder="Postal code (optional)" className={inputCls} /></div>
                  </div>

                  {/* Phone */}
                  <div className={`${fieldCls} relative mb-[10px]`}>
                    <input placeholder="Phone" className={`${inputCls} pr-[42px]`} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex pointer-events-none">
                      <QuestionIcon />
                    </span>
                  </div>

                  {/* Text me */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={textOffers} onChange={e => setTextOffers(e.target.checked)}
                      className="w-[18px] h-[18px] accent-[#005bd1] cursor-pointer flex-shrink-0" />
                    <span>Text me with news and offers</span>
                  </label>
                </section>

                {/* ── SHIPPING METHOD ── */}
                <section className="mb-5">
                  <h2 className="text-[16px] font-semibold mb-3 leading-snug">Shipping method</h2>
                  <div className="border border-[#005bd1] rounded-lg bg-white px-4 py-[14px]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-[1px]"><RadioDot selected={true} /></div>
                        <div>
                          <div className="text-[14px] leading-snug">🌍 Worldwide Shipping (5-9 Days)</div>
                          <div className="text-[12px] text-[#707070] mt-[2px]">Tracking number provided</div>
                        </div>
                      </div>
                      <div className="text-[14px] font-bold whitespace-nowrap pt-[1px]">{fmt(SHIPPING)}</div>
                    </div>
                  </div>
                </section>

                {/* ── PAYMENT ── */}
                <section className="mb-6">
                  <h2 className="text-[21px] font-semibold mb-1 leading-snug">Payment</h2>
                  <p className="text-[13px] text-[#707070] mb-[14px]">We do not store your credit card data, and every payment is encrypted.</p>

                  <div className="border border-[#dedede] rounded-lg overflow-hidden">
                    {/* Credit card */}
                    <div className="border-b border-[#dedede]">
                      <button type="button" onClick={() => setPaymentMethod("credit")}
                        className="w-full text-left px-4 py-4 flex justify-between items-center cursor-pointer hover:bg-[#fafafa]">
                        <div className="flex items-center gap-[10px]">
                          <RadioDot selected={paymentMethod === "credit"} />
                          <span className="text-[14px] font-medium">Credit card</span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <VisaIcon /><MastercardIcon /><AmexIcon />
                          <div className="text-[11px] bg-[#f4f4f4] border border-[#e0e0e0] px-[6px] py-[2px] rounded text-[#555] font-medium">+5</div>
                        </div>
                      </button>
                      {paymentMethod === "credit" && (
                        <div className="px-4 pb-4">
                          <div className={`${fieldCls} relative mb-[10px]`}>
                            <input placeholder="Card number" className={`${inputCls} pr-[44px]`} />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex pointer-events-none"><LockIcon /></span>
                          </div>
                          <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
                            <div className={fieldCls}><input placeholder="Expiration date (MM / YY)" className={inputCls} /></div>
                            <div className={`${fieldCls} relative`}>
                              <input placeholder="Security code" className={`${inputCls} pr-[44px]`} />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex pointer-events-none"><QuestionIcon /></span>
                            </div>
                          </div>
                          <div className={`${fieldCls} mb-3`}>
                            <input placeholder="Name on card" className={inputCls} />
                          </div>
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input type="checkbox" checked={billingAddressSame} onChange={e => setBillingAddressSame(e.target.checked)}
                              className="w-[18px] h-[18px] accent-[#005bd1] cursor-pointer flex-shrink-0" />
                            <span className="text-[14px]">Use shipping address as billing address</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Shop Pay */}
                    <button type="button" onClick={() => setPaymentMethod("shopPay")}
                      className="w-full text-left px-4 py-[14px] border-b border-[#dedede] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] bg-white">
                      <div className="flex items-center gap-[10px]">
                        <RadioDot selected={paymentMethod === "shopPay"} />
                        <span className="text-[14px]">Shop Pay <span className="text-[#686b6e]">· Pay in full or in installments</span></span>
                      </div>
                      <ShopPayTextLogo />
                    </button>

                    {/* Klarna */}
                    <button type="button" onClick={() => setPaymentMethod("klarna")}
                      className="w-full text-left px-4 py-[14px] border-b border-[#dedede] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] bg-white">
                      <div className="flex items-center gap-[10px]">
                        <RadioDot selected={paymentMethod === "klarna"} />
                        <span className="text-[14px]">Klarna: flexible payment options</span>
                      </div>
                      <KlarnaLogo />
                    </button>

                    {/* Affirm */}
                    <button type="button" onClick={() => setPaymentMethod("affirm")}
                      className="w-full text-left px-4 py-[14px] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] bg-white">
                      <div className="flex items-center gap-[10px]">
                        <RadioDot selected={paymentMethod === "affirm"} />
                        <span className="text-[14px]">Affirm: Buy now, pay later</span>
                      </div>
                      <AffirmLogo />
                    </button>
                  </div>
                </section>

                {/* ── SAVE INFO ── */}
                <section className="mb-6">
                  <p className="text-[14px] mb-3">Save my information for a faster checkout</p>
                  <div className={`${fieldCls} flex items-center gap-[10px] p-[10px_11px] mb-[10px]`}>
                    <span className="text-[20px] leading-none flex-shrink-0">📱</span>
                    <div className="flex-1">
                      <div className="text-[11px] text-[#707070] mb-[2px]">Mobile phone (optional)</div>
                      <input placeholder="+998" className="border-none outline-none text-[14px] w-full p-0 bg-transparent placeholder:text-[#767676]" />
                    </div>
                  </div>
                  <p className="text-[13px] text-[#686b6e] leading-relaxed">
                    By providing your phone number, you agree to create a Shop account subject to Shop&apos;s{" "}
                    <a href="#" className="text-[#005bd1] hover:underline">Terms</a>{" "}and{" "}
                    <a href="#" className="text-[#005bd1] hover:underline">Privacy Policy</a>.
                  </p>
                </section>

                {/* ── PAY NOW (desktop) ── */}
                <button className="w-full h-[52px] bg-[#005bd1] hover:bg-[#004bb5] text-white border-none rounded-lg text-[14px] font-semibold cursor-pointer mb-7 transition-colors duration-150">
                  Pay now
                </button>

                {/* ── FOOTER LINKS (desktop) ── */}
                <div className="flex flex-wrap gap-x-[14px] gap-y-[6px] text-[13px]">
                  {footerLinks.map(link => (
                    <a key={link} href="#" className="text-[#005bd1] no-underline hover:underline">{link}</a>
                  ))}
                </div>
                <div className="h-12" />
              </div>
            </div>

            {/* ── RIGHT PANEL (desktop only) ── */}
            <div className="w-[550px] bg-[#f5f5f5] flex-shrink-0">
              <div className="p-[38px] sticky top-[75px]">

                {/* Product row */}
                <div className="mb-5">
                  <div className="flex items-start gap-[14px]">
                    {/* Thumbnail + badge */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src="/images/bundle-1.jpg"
                        alt="Kitty Kurlz™ [BUY 1 GET 1 FREE]"
                        width={60}
                        height={60}
                        className="rounded-lg border border-[#e0e0e0] block object-cover bg-white"
                      />
                      <span className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full bg-[#333] text-white text-[11px] font-bold flex items-center justify-center">
                        {displayItems}
                      </span>
                    </div>
                    {/* Name + toggle */}
                    <div className="flex-1 pt-[2px]">
                      <div className="text-[14px] leading-snug">Kitty Kurlz™ [BUY 1 GET 1 FREE]</div>
                      <button onClick={() => setShowItems(!showItems)}
                        className="text-[13px] text-[#005bd1] bg-transparent border-none p-0 pt-[2px] cursor-pointer flex items-center gap-1">
                        {showItems ? "Hide 12 items" : "Show 12 items"}
                        {showItems ? <ChevronUp /> : <ChevronDown color="#005bd1" />}
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-[14px] whitespace-nowrap pt-[2px]">{fmt(displaySub)}</div>
                  </div>

                  {/* Expanded child item */}
                  {showItems && (
                    <div className="flex items-center gap-3 mt-3 pl-[74px]">
                      <Image
                        src="/images/bundle-1.jpg"
                        alt="Kitty Kurlz™"
                        width={38}
                        height={38}
                        className="rounded-md border border-[#e0e0e0] object-cover bg-white"
                      />
                      <span className="text-[14px]">12 × Kitty Kurlz™</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e0e0e0] mb-5" />

                {/* Discount code */}
                <div className="flex gap-[10px] mb-5">
                  <div className={`flex-1 ${fieldCls}`}>
                    <input value={discountCode} onChange={e => setDiscountCode(e.target.value)}
                      placeholder="Discount code"
                      className="w-full px-[11px] py-[13.5px] text-[14px] border-none rounded-lg outline-none bg-transparent placeholder:text-[#767676]" />
                  </div>
                  <button className="px-4 bg-[#ededed] hover:bg-[#e0e0e0] rounded-lg border border-[#dedede] text-[14px] font-medium cursor-pointer whitespace-nowrap text-[#333] transition-colors duration-150">
                    Apply
                  </button>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between mb-2 text-[14px]">
                  <span>Subtotal</span>
                  <span>{fmt(displaySub)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center mb-4 text-[14px]">
                  <span className="flex items-center gap-[5px]">
                    Shipping
                    <span title="Calculated at checkout" className="inline-flex cursor-help">
                      <InfoIcon />
                    </span>
                  </span>
                  <span>{fmt(SHIPPING)}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e0e0e0] mb-4" />

                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <span className="text-[16px] font-bold">Total</span>
                  <span className="text-[20px] font-bold">{fmt(displayTotal)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
