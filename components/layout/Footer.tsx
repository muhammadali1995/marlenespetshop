import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-yellow mt-16">
      <div className="mx-auto max-w-[1440px] px-6 py-12 pb-28">

        {/* Social icons — mobile only, shown at top */}
        <div className="flex gap-3 mb-10 sm:hidden">
          <Link
            href="#"
            className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Facebook"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </Link>
        </div>

        {/* Desktop 4-col / Mobile stacked */}
        <div className="grid grid-cols-1 text-[18px] sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Info */}
          <div>
            <h3 className="font-bold text-brand-dark mb-4">Info</h3>
            <ul className="space-y-2 text-brand-dark">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="#" className="hover:underline">Marlene&apos;s Selection</Link></li>
              <li><Link href="#" className="hover:underline">Ask Marlene</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-brand-dark mb-4">Legal</h3>
            <ul className="space-y-2 text-brand-dark">
              <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="#" className="hover:underline">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-brand-dark mb-4">Social Media</h3>
            <ul className="space-y-2 text-brand-dark">
              <li><Link href="#" className="hover:underline">Facebook</Link></li>
              <li><Link href="#" className="hover:underline">Instagram</Link></li>
            </ul>
          </div>

          {/* Join to us — desktop only (icons shown at top on mobile) */}
          <div className="hidden sm:block">
            <h3 className="font-bold text-brand-dark mb-4">Join to us!</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

       <hr  className="border-t border-brand-dark/20 mt-20"/>
      </div>
    </footer>
  );
}
