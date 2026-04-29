"use client"

import { HeroSection } from "@/features/store/components/home/hero-section"
import { CategoriesSection } from "@/features/store/components/home/categories-section"
import { FeaturedProductsSection } from "@/features/store/components/home/featured-products-section"
import { PopularSellersSection } from "@/features/store/components/home/popular-sellers-section"
import { PromoBanner } from "@/features/store/components/home/promo-banner"
import { SellerCtaSection } from "@/features/store/components/home/seller-cta-section"
import { TrustSection } from "@/features/store/components/home/trust-section"

/**
 * StoreShowcase: The premium narrative landing experience for the store.
 * Combines all high-end sections into a single smooth flow.
 */
export function Store() {
  return (
    <div className="relative">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <PromoBanner />
      <PopularSellersSection />
      <SellerCtaSection />
      <TrustSection />
    </div>
  )
}
