import Image from "next/image";
import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/lib/data";

export default function FaqSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Video — left */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-brand-grey-card group cursor-pointer">
            <Image
              src="/images/video-thumb.jpg"
              alt="Product demo video"
              fill
              className="object-cover"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-brand-dark ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Accordion — right */}
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-6">
              Frequently Asked
            </h2>
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
