"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "marlenes-popup-dismissed";

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4"
      onClick={dismiss}
    >
      <div
        className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-brand-dark/50 hover:text-brand-dark text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center">
          <p className="font-bold text-2xl text-brand-dark mb-1">Marlene&apos;s</p>
          <h2 className="text-3xl font-bold text-brand-dark mt-4">
            You&apos;ve Got 5% OFF!
          </h2>
          <p className="text-brand-dark/60 mt-2 mb-6">
            Claim this limited time offer
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-full border border-brand-dark/20 px-5 py-3 text-brand-dark outline-none focus:border-brand-yellow"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-brand-yellow py-3 font-bold text-brand-dark hover:brightness-95 transition-all"
            >
              Claim 5% OFF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
