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
import { product } from "@/lib/data";

export default function KittyKurlzPage() {
  const [bundle, setBundle] = useState("buy1get1");

  return (
    <>
      <Header />

      <main className="pb-24">
        {/* Hero — 2-column grid */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-0 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <ImageGallery images={product.images} />

            {/* Right: Product Info + Bundle + CTA */}
            <div className="flex flex-col gap-6">
              <ProductInfo />
              <BundleSelector selected={bundle} onChange={setBundle} />
              <AddToCartButton bundle={bundle} />
            </div>
          </div>
        </section>

        {/* Lifestyle strip */}
        <LifestyleStrip photos={product.lifestylePhotos} />

        {/* Features */}
        <FeaturesSection />

        {/* Social proof */}
        <SocialProof />

        {/* FAQ */}
        <FaqSection />

        {/* Reviews */}
        <ReviewsSection />
      </main>

      <Footer />

      {/* Sticky bar */}
      <StickyBar bundle={bundle} onBundleChange={setBundle} />

      {/* Email popup */}
      <EmailPopup />
    </>
  );
}
