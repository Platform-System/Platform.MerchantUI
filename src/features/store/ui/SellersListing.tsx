"use client"

import { useState, useLayoutEffect } from "react"
import { motion } from "framer-motion"
import { Store } from "lucide-react"
import { FilterBar } from "@/features/store/components/ui/filter-bar"
import { SellerCard } from "@/features/store/components/seller/seller-card"
import { popularSellers } from "@/features/store/lib/data"
import { cn } from "@/features/store/lib/utils"

const categories = ["All", "Fashion", "Home Decor", "Electronics", "Jewelry"]

export function SellersListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const filteredSellers = popularSellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || 
                           seller.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Verified Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 mb-4 text-balance text-white">
            Discover Elite Sellers
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse premium artisan boutiques, luxury creators, and verified merchants from across the globe.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            searchPlaceholder="Search sellers by name or location..."
          />
        </div>

        {/* Results Grid */}
        {filteredSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-2xl border border-border">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-xl mb-2 text-white">No sellers found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find any verified sellers matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
