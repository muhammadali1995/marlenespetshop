"use client";

import Image from "next/image";
import { bundles } from "@/lib/data";

interface BundleSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

export default function BundleSelector({ selected, onChange }: BundleSelectorProps) {
  return (
    <div className="flex gap-3 justify-center">
      {bundles.map((bundle) => {
        const isSelected = selected === bundle.id;
        return (
          <button
            key={bundle.id}
            onClick={() => onChange(bundle.id)}
            className={`relative w-[110px] h-[160px] sm:w-[140px] sm:h-[200px] rounded-2xl border-2 overflow-hidden transition-all ${
              isSelected
                ? "border-brand-yellow shadow-md"
                : "border-brand-grey-card opacity-70 hover:opacity-90"
            }`}
          >
            {/* Bundle image — fills entire card */}
            <Image
              src={bundle.image}
              alt={bundle.label}
              fill
              className="object-cover object-top"
            />

            {/* What's included — overlaid at bottom */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center">
              <span className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-[11px] font-semibold text-brand-dark shadow-sm">
                <span className="flex items-center justify-center w-4 h-4 rounded-full border border-brand-dark text-[9px] font-bold shrink-0">?</span>
                What&apos;s Included?
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
