"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import { useCart } from "@/components/cart/CartProvider";

/* ─── Data ──────────────────────────────────────────────────── */

const CURRENCIES = [
  { code: "USD", name: "United States dollar", symbol: "USD $", flag: "https://flagcdn.com/w40/us.png" },
  { code: "CAD", name: "Canadian Dollar",      symbol: "CAD $", flag: "https://flagcdn.com/w40/ca.png" },
  { code: "GBP", name: "United Kingdom",       symbol: "GBP £", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "AUD", name: "Australian dollar",    symbol: "AUD $", flag: "https://flagcdn.com/w40/au.png" },
  { code: "EUR", name: "Europe",               symbol: "EUR €", flag: "https://flagcdn.com/w40/eu.png" },
  { code: "NZD", name: "New Zealand",          symbol: "NZD $", flag: "https://flagcdn.com/w40/nz.png" },
  { code: "CHF", name: "Swiss franc",          symbol: "CHF",   flag: "https://flagcdn.com/w40/ch.png" },
  { code: "JPY", name: "Japanese yen",         symbol: "JPY ¥", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "UZS", name: "Uzbekistan som",       symbol: "UZS",   flag: "https://flagcdn.com/w40/uz.png" },
];

const LANGUAGES = [
  { code: "en", label: "English",   flag: "https://flagcdn.com/w40/us.png" },
  { code: "ru", label: "Русский",   flag: "https://flagcdn.com/w40/ru.png" },
  { code: "uz", label: "O'zbekcha", flag: "https://flagcdn.com/w40/uz.png" },
  { code: "de", label: "Deutsch",   flag: "https://flagcdn.com/w40/de.png" },
  { code: "fr", label: "Français",  flag: "https://flagcdn.com/w40/fr.png" },
];

const PANEL_WIDTH = 400;

/* ─── Icons ─────────────────────────────────────────────────── */

function CartIcon() {
  return (
    <svg width="24" height="22" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 7H19.0604C20.3225 7 21.2691 8.15465 21.0216 9.39223L19.8216 15.3922C19.6346 16.3271 18.8138 17 17.8604 17H8.11683C7.17376 17 6.35883 16.3412 6.16123 15.4191L3.66939 3.79047C3.57059 3.3294 3.16312 3 2.69158 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7.5" cy="20" r="1" fill="currentColor" />
      <circle cx="18.5" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 19L17 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
      <path d="M5 6L0 1L0.7 0.3L5 4.6L9.3 0.3L10 1L5 6Z" />
    </svg>
  );
}

function DrawerCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M6 6h15l-1.5 9h-11L6 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ─── Nav ────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Marlene's Selection", href: "/collections/marlenes-top-picks-2024" },
  { label: "Ask Marlene", href: "/pages/contact" },
  { label: "Track Your Package", href: "/pages/track-package" },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const totalItems = useCartStore(selectTotalItems);
  const { openCart } = useCart();

  const [currency, setCurrency] = useState(CURRENCIES[4]); // EUR
  const [language, setLanguage] = useState(LANGUAGES[0]);  // English
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const currencyBtnRef = useRef<HTMLButtonElement>(null);
  const languageBtnRef = useRef<HTMLButtonElement>(null);
  const [currencyPanelStyle, setCurrencyPanelStyle] = useState<React.CSSProperties>({});
  const [languagePanelStyle, setLanguagePanelStyle] = useState<React.CSSProperties>({});

  const [drawerCurrencyOpen, setDrawerCurrencyOpen] = useState(false);
  const [drawerLanguageOpen, setDrawerLanguageOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  function computePanelPos(ref: React.RefObject<HTMLButtonElement | null>, alignRight = false): React.CSSProperties {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return {};
    const style: React.CSSProperties = { top: rect.bottom + 8, width: PANEL_WIDTH };
    if (alignRight) style.right = window.innerWidth - rect.right;
    else style.left = rect.left;
    return style;
  }

  return (
    <>
      {/* ── Mobile Drawer backdrop ────────────────────────────── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[1000] transition-[opacity,visibility] duration-300 ${drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* ── Mobile Drawer panel ───────────────────────────────── */}
      <div className={`fixed inset-y-0 left-0 w-full bg-white z-[1001] flex flex-col transition-transform duration-200 overflow-y-auto font-[Gilroy] ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#f0f0f0] shrink-0 w-full">
          <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="flex items-center justify-center w-[42px] h-[42px] rounded-full text-[#333] border border-[#e5e5e5] hover:border-[#ccc] hover:bg-[#fafafa] transition-all duration-200 shrink-0">
            <CloseIcon />
          </button>
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center shrink-0 ml-1">
            <Image src="/images/marleneslogo.svg" alt="Marlene's" width={132} height={28} />
          </Link>
          <div className="flex-1 min-w-[50px]" />
          <button onClick={() => { setDrawerOpen(false); openCart(); }} aria-label="Cart" className="relative flex items-center justify-center text-[#333] shrink-0 p-2 ml-auto">
            <DrawerCartIcon />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-brand-yellow text-[#333] text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          <nav className="px-4 py-4 shrink-0">
            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setDrawerOpen(false)} className={`flex items-center gap-4 px-[15.625px] py-[12.5px] text-[16.875px] font-bold rounded-[14px] transition-all duration-200 ${isActive ? "bg-[#FFF8E7] text-brand-yellow" : "text-[#333] hover:bg-[#FFF8E7] hover:text-brand-yellow"}`}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-4 flex-1 flex flex-col overflow-hidden relative">
            {/* Mobile language & currency pills */}
            <div className="flex items-center justify-between gap-3 w-full">
              {/* Language */}
              <div className="relative flex-1">
                <button onClick={() => { setDrawerLanguageOpen(v => !v); setDrawerCurrencyOpen(false); }} className="w-full flex items-center gap-2 bg-white px-3 py-2 rounded-full text-[13px] font-medium text-[#333] border border-[#e5e5e5] hover:border-[#ccc] transition-all">
                  <img src={language.flag} alt={language.label} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                  <span className="truncate">{language.label}</span>
                  <span className="text-[#999] ml-auto shrink-0"><ChevronDown /></span>
                </button>
                {drawerLanguageOpen && (
                  <div className="absolute left-0 top-full mt-1 z-50 bg-white rounded-2xl overflow-hidden" style={{ width: PANEL_WIDTH, maxWidth: "calc(100vw - 32px)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                    {LANGUAGES.map(l => (
                      <button key={l.code} onClick={() => { setLanguage(l); setDrawerLanguageOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3.5 transition-colors text-left ${language.code === l.code ? "bg-brand-yellow" : "hover:bg-gray-50"}`} style={{ color: "#0D0A0B", fontSize: 16 }}>
                        <img src={l.flag} alt={l.code} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                        <span className="flex-1">{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency */}
              <div className="relative flex-1">
                <button onClick={() => { setDrawerCurrencyOpen(v => !v); setDrawerLanguageOpen(false); }} className="w-full flex items-center gap-2 bg-white px-3 py-2 rounded-full text-[13px] font-medium text-[#333] border border-[#e5e5e5] hover:border-[#ccc] transition-all">
                  <img src={currency.flag} alt={currency.code} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                  <span className="truncate">{currency.symbol}</span>
                  <span className="text-[#999] ml-auto shrink-0"><ChevronDown /></span>
                </button>
                {drawerCurrencyOpen && (
                  <div className="absolute left-0 top-full mt-1 z-50 bg-white rounded-2xl overflow-hidden" style={{ width: PANEL_WIDTH, maxWidth: "calc(100vw - 32px)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                    {CURRENCIES.map(c => (
                      <button key={c.code} onClick={() => { setCurrency(c); setDrawerCurrencyOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3.5 transition-colors text-left ${currency.code === c.code ? "bg-brand-yellow" : "hover:bg-gray-50"}`} style={{ color: "#0D0A0B", fontSize: 16 }}>
                        <img src={c.flag} alt={c.code} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                        <span className="flex-1">{c.name}</span>
                        <span className="font-bold">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-1 min-h-[40px]" />

            <div className="flex items-center justify-center gap-4 mb-4">
              <a href="https://facebook.com/marlenespetshop" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 rounded-[14px] border border-[#e5e5e5] flex items-center justify-center text-brand-yellow hover:scale-105 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" /></svg>
              </a>
              <a href="https://instagram.com/marlenespetshop" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-[14px] border border-[#e5e5e5] flex items-center justify-center text-brand-yellow hover:scale-105 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-[0.95rem] text-[#333] mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="text-brand-yellow shrink-0">
                <path d="M3 18V12a9 9 0 1 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
                <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
              </svg>
              <a href="mailto:help@marlenespetshop.com" className="text-[#333333] text-[11.875px] no-underline">help@marlenespetshop.com</a>
            </div>

            <div className="text-center text-[0.85rem] text-brand-yellow font-medium mb-2">© 2026 Marlene&apos;s Pet Shop</div>

            <div className="w-full flex justify-center overflow-hidden">
              <Image src="/images/drawer-cat.png" alt="" width={320} height={160} className="w-full max-w-[320px] object-contain object-bottom" aria-hidden />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 bg-white border-b border-[#e5e5e5] transition-[transform,box-shadow] duration-300 ${scrolled ? "shadow-sm" : ""} ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="relative mx-auto max-w-[1500px] py-3.5 pl-2 pr-4 min-[990px]:px-[25px] min-[990px]:py-[17px] flex items-center gap-4 min-[990px]:grid min-[990px]:items-center min-[990px]:gap-x-[25px] font-[Gilroy] text-[18px] text-[#0D0A0BBF]"
          style={{ gridTemplateAreas: '"heading navigation icons"', gridTemplateColumns: "auto 1fr auto" }}>

          <button onClick={() => setDrawerOpen(true)} className="min-[990px]:hidden flex items-center justify-center -ml-2 p-2 text-[#0D0A0BBF] hover:opacity-70 transition-opacity shrink-0" aria-label="Menu">
            <HamburgerIcon />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 min-[990px]:static min-[990px]:translate-x-0 shrink-0 flex items-center" style={{ gridArea: "heading" }}>
            <Image src="/images/marleneslogo.svg" alt="Marlene's Pet Shop" width={130} height={27} priority />
          </Link>

          <nav className="hidden min-[990px]:block text-center" style={{ gridArea: "navigation" }}>
            <ul className="inline-flex list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`flex items-center text-lg px-[15px] py-[15px] tracking-[0.75px] font-normal whitespace-nowrap transition-all duration-200 ${pathname === link.href ? "text-brand-yellow" : "hover:text-brand-yellow"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-[40px] shrink-0 ml-auto min-[990px]:ml-0 min-[990px]:justify-self-end" style={{ gridArea: "icons" }}>
            <div className="hidden min-[990px]:flex items-center gap-8">
              <button ref={currencyBtnRef} onClick={() => { setCurrencyPanelStyle(computePanelPos(currencyBtnRef, false)); setCurrencyOpen(v => !v); setLanguageOpen(false); }} className="flex font-semibold px-3 py-2.5 gap-2 items-center tracking-[0.5px] hover:opacity-70 transition-opacity">
                <GlobeIcon />
                <span>{currency.symbol}</span>
                <ChevronDown />
              </button>
              <button ref={languageBtnRef} onClick={() => { setLanguagePanelStyle(computePanelPos(languageBtnRef, true)); setLanguageOpen(v => !v); setCurrencyOpen(false); }} className="flex px-3 font-semibold py-2.5 gap-2 items-center tracking-[0.5px] hover:opacity-70 transition-opacity">
                <img src={language.flag} alt={language.label} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                <span>{language.label}</span>
                <ChevronDown />
              </button>
            </div>

            <button onClick={openCart} className="relative flex items-center hover:opacity-70 transition-opacity [&_svg]:w-[30px] [&_svg]:h-[30px]" aria-label="Open cart">
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-yellow text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Currency modal ───────────────────────────────────── */}
      {currencyOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[9990]" style={{ background: "rgba(0,0,0,0.45)" }} onClick={() => setCurrencyOpen(false)} />
          <div className="fixed z-[9991] bg-white rounded-2xl overflow-hidden font-[Gilroy]" style={{ ...currencyPanelStyle, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
            {CURRENCIES.map(c => (
              <button key={c.code} onClick={() => { setCurrency(c); setCurrencyOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3.5 transition-colors text-left ${currency.code === c.code ? "bg-brand-yellow" : "hover:bg-gray-50"}`} style={{ color: "#0D0A0B", fontSize: 18 }}>
                <img src={c.flag} alt={c.code} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                <span className="flex-1">{c.name}</span>
                <span className="font-bold">{c.symbol}</span>
              </button>
            ))}
          </div>
        </>,
        document.body
      )}

      {/* ── Language modal ───────────────────────────────────── */}
      {languageOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[9990]" style={{ background: "rgba(0,0,0,0.45)" }} onClick={() => setLanguageOpen(false)} />
          <div className="fixed z-[9991] bg-white rounded-2xl overflow-hidden font-[Gilroy]" style={{ ...languagePanelStyle, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLanguage(l); setLanguageOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3.5 transition-colors text-left ${language.code === l.code ? "bg-brand-yellow" : "hover:bg-gray-50"}`} style={{ color: "#0D0A0B", fontSize: 18 }}>
                <img src={l.flag} alt={l.code} width={26} height={26} className="rounded-full object-cover shrink-0" style={{ width: 26, height: 26 }} />
                <span className="flex-1">{l.label}</span>
              </button>
            ))}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
