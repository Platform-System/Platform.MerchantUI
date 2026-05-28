"use client"

import { HeroSection } from "../components/hero-section"
import { CategoriesSection } from "../components/categories-section"
import { FeaturedProductsSection } from "../components/featured-products-section"
import { PopularSellersSection } from "../components/popular-sellers-section"
import { SellerCtaSection } from "../components/seller-cta-section"

/**
 * HomeScreen: The premium narrative landing experience for the store.
 * Combines all high-end sections into a single smooth flow.
 */
export function HomeScreen() {
  return (
    <div className="relative" style={{ position: "relative" }}>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <PopularSellersSection />
      <SellerCtaSection />
    </div>
  )
}

