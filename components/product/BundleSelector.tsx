"use client";

import { useState } from "react";
import Image from "next/image";
import { bundles } from "@/lib/data";
import WhatsIncludedModal from "./WhatsIncludedModal";

interface BundleSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

export default function BundleSelector({ selected, onChange }: BundleSelectorProps) {
  const [modalBundle, setModalBundle] = useState<typeof bundles[0] | null>(null);

  return (
    <>
      <div className="flex gap-3 justify-center">
        {bundles.map((bundle) => {
          const isSelected = selected === bundle.id;
          return (
            <button
              key={bundle.id}
              onClick={() => onChange(bundle.id)}
              className="relative w-[130px] lg:w-[140px] h-[200px] rounded-2xl overflow-hidden transition-all"
            >
              {/* Bundle image — fills entire card */}
              <Image
                src={'/images/bundle-1.jpg'}
                alt={bundle.label}
                fill
                className={`object-cover object-top transition-all ${!isSelected ? "brightness-75 saturate-0" : ""}`}
              />

              {/* What's included — overlaid at bottom */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center">
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalBundle(bundle);
                  }}
                  className="flex items-center gap-1.5 bg-white/12 text-white border border-white backdrop-blur-[10px] rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <span className="flex items-center justify-center w-4 h-4 rounded-full border border-white text-[9px] font-bold shrink-0">?</span>
                  What&apos;s Included?
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {modalBundle && (
        <WhatsIncludedModal bundle={modalBundle} onClose={() => setModalBundle(null)} />
      )}
    </>
  );
}
