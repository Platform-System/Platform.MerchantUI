"use client"

import { useState } from "react"
import { Link } from "@/i18n/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { ProductCard } from "@/features/store/components/product/product-card"
import { featuredProducts, trendingProducts, newArrivals } from "@/features/store/lib/data"
import { cn } from "@/features/store/lib/utils"

const tabs = [
  { id: "featured", label: "Featured", products: featuredProducts },
  { id: "trending", label: "Trending", products: trendingProducts },
  { id: "new", label: "New Arrivals", products: newArrivals },
]

import { SectionFooter } from "./section-header"

export function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState("featured")
  const currentProducts = tabs.find((t) => t.id === activeTab)?.products || featuredProducts

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-gold uppercase tracking-widest">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-balance">
              Explore Our Products
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors",
                  activeTab === tab.id
                    ? "text-charcoal font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {currentProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <SectionFooter href="/store/marketplace" label="View All Products" />
      </div>
    </section>
  )
}

