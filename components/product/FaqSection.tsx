import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/lib/data";

export default function FaqSection() {
  return (
    <section className="py-16 bg-white overflow-hidden">

      {/* Heading */}
      <div className="mx-auto max-w-[1440px] px-6 mb-8">
        <h2 className="text-4xl font-black text-brand-dark">
          Frequently Asked
        </h2>
      </div>

      {/* Stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row lg:items-center">

        {/* Video — full width on mobile, half on desktop with D-shape right */}
        <div
          className="relative shrink-0 w-full lg:w-1/2 overflow-hidden bg-brand-grey-card cursor-pointer
                     rounded-2xl mx-6 lg:mx-0 lg:rounded-l-none lg:rounded-r-[9999px]"
          style={{ aspectRatio: "2/1" }}
        >
          <video
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient for controls */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/70 to-transparent" />

          {/* Controls bar */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-3">
            <div className="shrink-0 w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center shadow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand-dark ml-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="flex-1 h-0.75 rounded-full bg-white/30">
              <div className="h-full w-1/3 rounded-full bg-white" />
            </div>
            <div className="shrink-0 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex-1 px-6 lg:px-12 pt-8 lg:pt-0">
          <Accordion items={faqItems} />
        </div>

      </div>
    </section>
  );
}
