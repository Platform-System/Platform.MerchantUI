"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { SellerCard } from "@/features/store/components/seller/seller-card"
import { popularSellers } from "@/features/store/lib/data"

import { SectionHeader, SectionFooter } from "./section-header"

export function PopularSellersSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subtitle="Trusted Partners"
          title="Popular Sellers"
          description="Discover top-rated sellers with exceptional products and outstanding customer service. Each verified seller meets our quality standards."
        />

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>

        {/* View All */}
        <SectionFooter href="/store/sellers" label="Browse All Sellers" />
      </div>
    </section>
  )
}

