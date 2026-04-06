"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import BundleSelector from "@/components/product/BundleSelector";
import AddToCartButton from "@/components/product/AddToCartButton";
import StickyBar from "@/components/product/StickyBar";
import LifestyleStrip from "@/components/product/LifestyleStrip";
import FeaturesSection from "@/components/product/FeaturesSection";
import SocialProof from "@/components/product/SocialProof";
import FaqSection from "@/components/product/FaqSection";
import ReviewsSection from "@/components/product/ReviewsSection";
import EmailPopup from "@/components/ui/EmailPopup";
import AosInit from "@/components/ui/FadeIn";
import { product } from "@/lib/data";

export default function KittyKurlzPage() {
  const [bundle, setBundle] = useState<"buy1get1" | "buy2get2">("buy1get1");

  return (
    <>
      <AosInit />
      <Header />

      <main>
        {/* Hero — 2-column grid */}
        <section className="mx-auto max-w-[1440px] lg:px-0 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
            <ImageGallery images={product.images} />
            <div data-aos="fade-up" className="flex flex-col gap-6 px-6 lg:pl-0 lg:pr-[90px]">
              <ProductInfo />
              <BundleSelector selected={bundle} onChange={setBundle} />
              <AddToCartButton bundle={bundle} />
            </div>
          </div>
        </section>

        <LifestyleStrip photos={product.lifestylePhotos} />

        <div data-aos="fade-up">
          <FeaturesSection />
        </div>

        <div data-aos="fade-up">
          <SocialProof />
        </div>

        <div data-aos="fade-up">
          <FaqSection />
        </div>

        <div data-aos="fade-up">
          <ReviewsSection />
        </div>
      </main>

      <Footer />

      {/* Sticky bar */}
      <StickyBar bundle={bundle} onBundleChange={setBundle} />

      {/* Email popup */}
      <EmailPopup />
    </>
  );
}
