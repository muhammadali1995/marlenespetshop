import Image from "next/image";
import { benefitCards, socialProofPhotos } from "@/lib/data";

export default function SocialProof() {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-[1440px]">
        {/* Circular cat photos — overlapping */}
        <div className="flex items-center mb-8">
          {socialProofPhotos.map((src, i) => (
            <div
              key={i}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md -ml-3 first:ml-0 bg-brand-grey-card"
              style={{ zIndex: socialProofPhotos.length - i }}
            >
              <Image src={src} alt={`Happy cat ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-12">
          <h2 className="text-4xl font-black text-brand-dark shrink-0">
            +7500 Units Sold
          </h2>
          <p className="text-brand-dark/60 sm:max-w-xs leading-relaxed sm:text-right ml-auto">
            Pet-Parents love the all-in-one design. A scratcher, ball track,
            shape-shifter and even a cozy bed.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefitCards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col rounded-2xl overflow-hidden border border-brand-dark/10"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] bg-brand-grey-card">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-brand-dark">{card.icon}</span>
                  <span className="font-bold text-brand-dark text-sm">{card.label}</span>
                </div>
                <p className="text-brand-dark/60 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
