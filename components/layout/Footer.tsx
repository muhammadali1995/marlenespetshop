import Link from "next/link";

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-yellow mt-16">
      <div className="mx-auto max-w-[1440px] px-6 py-[36px]">

        {/* ── Mobile: social icons at top ── */}
        <div className="flex gap-4 mb-10 lg:hidden">
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-[44px] h-[44px] rounded-full bg-brand-navy flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            >
              {s.icon}
            </Link>
          ))}
        </div>

        {/* ── Grid: 1-col mobile → 2-col sm → 4-col lg ── */}
        <div className="grid grid-cols-1 text-[20px] sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Info */}
          <div>
            <h3 className="font-bold text-brand-dark mb-4">Info</h3>
            <ul className="space-y-5 sm:space-y-2">
              <li><Link href="/" className="hover:underline text-[#0d0a0bbf]">Home</Link></li>
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Marlene&apos;s Selection</Link></li>
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Ask Marlene</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-brand-dark mb-4">Legal</h3>
            <ul className="space-y-5 sm:space-y-2">
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Terms of Service</Link></li>
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-brand-dark mb-4">Social Media</h3>
            <ul className="space-y-5 sm:space-y-2">
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Facebook</Link></li>
              <li><Link href="#" className="hover:underline text-[#0d0a0bbf]">Instagram</Link></li>
            </ul>
          </div>

          {/* Join us — desktop only (icons shown at top on mobile) */}
          <div className="hidden lg:block">
            <h3 className="font-bold text-brand-dark mb-4">Join to us!</h3>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-[44px] h-[44px] rounded-full bg-brand-navy flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-brand-dark/20 mt-20" />

        {/* ── Copyright bar ── */}
        <div className="pt-6 flex items-center justify-between">
          <p className="text-[#0d0a0bbf] text-[20px] lg:hidden">All rights reserved.</p>

          <div className="flex items-center gap-3 lg:hidden">
            <svg width="44" height="44" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.447266" width="32" height="32" rx="16" fill="#0D0A0B"/>
              <path d="M9.63603 22.8114L13.1716 19.2759M9.63603 22.8114H8.22181M9.63603 22.8114V24.2256M19.5355 15.7403L22.3639 18.5688L23.0711 9.37638L13.8787 10.0835L18.1213 14.3261L16 16.4475M16 16.4475H11.7573M16 16.4475L13.1716 19.2759M13.1716 19.2759H8.92892" stroke="#FEFEFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.2322 21.0433L14.2321 24.5788M17.0606 18.2149L17.0606 21.7504" stroke="#FEFEFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20.2426" cy="12.2046" r="1" transform="rotate(-45 20.2426 12.2046)" fill="#FEFEFE"/>
            </svg>
            <span className="font-bold text-brand-dark text-[20px]">Marlene&apos;s</span>
          </div>

          <p className="hidden lg:block text-[#0d0a0bbf] text-[20px] ml-auto">
            © 2026 Marlene&apos;s Pet Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
