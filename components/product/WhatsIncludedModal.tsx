"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Bundle {
  label: string;
  sublabel: string;
  bonus: string;
  badge: string;
  image: string;
  modalDescription: string;
  bundleList: string[];
}

interface WhatsIncludedModalProps {
  bundle: Bundle;
  onClose: () => void;
}

export default function WhatsIncludedModal({ bundle, onClose }: WhatsIncludedModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[681px] max-w-[calc(100vw-32px)] p-5 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-base"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-0">
          {bundle.label} <span style={{ color: "#f5a623" }}>{bundle.bonus}</span>
        </h2>

        {/* Description */}
        <p
          className="text-center text-[16px] sm:text-[20px]"
          style={{ color: "#0D0A0BBF", margin: "16px 0 20px" }}
        >
          {bundle.modalDescription}
        </p>

        {/* Content row */}
        <div className="flex gap-4 sm:gap-6 items-start mb-5 sm:mb-7">
          {/* Bundle image — proportionally scaled: desktop 291×416, mobile 155×222 */}
          <div
            className="relative rounded-2xl overflow-hidden flex-shrink-0 w-[155px] h-[222px] sm:w-[291px] sm:h-[416px]"
            style={{ background: "#f0ede8" }}
          >
            <Image src={bundle.image} alt={bundle.label} fill className="object-cover object-top" />
          </div>

          {/* Bundle list */}
          <div>
            <p className="font-bold text-gray-800 text-base sm:text-lg mb-2 sm:mb-3">Bundle List:</p>
            <ul className="space-y-1 sm:space-y-2">
              {bundle.bundleList.map((item) => (
                <li key={item} className="text-gray-700 text-sm sm:text-base">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Awesome button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 sm:py-4 rounded-full font-bold text-black text-base sm:text-lg transition-opacity hover:opacity-90"
          style={{ background: "#f5a623" }}
        >
          Awesome!
        </button>
      </div>
    </div>,
    document.body
  );
}
