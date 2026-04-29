"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown } from "lucide-react"
import { ProductCard } from "@/features/store/components/product/product-card"
import { FilterSidebar } from "@/features/store/components/marketplace/filter-sidebar"
import { Button } from "@/features/store/components/ui/button"
import { Input } from "@/features/store/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/store/components/ui/dropdown-menu"
import { featuredProducts, trendingProducts, newArrivals } from "@/features/store/lib/data"
import { cn } from "@/features/store/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/features/store/components/ui/pagination"

const allProducts = [...featuredProducts, ...trendingProducts, ...newArrivals]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
]

export function Marketplace() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchParam = searchParams.get("search") ?? ""

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParam])

  useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [gridCols, setGridCols] = useState<2 | 3 | 4 | 5 | 6>(4)
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState(searchParam)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedSellers, setSelectedSellers] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = gridCols === 6 ? 24 : 16

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, priceRange, selectedRating, selectedSellers, verifiedOnly, sortBy, gridCols])

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSelectedRating(null)
    setSelectedSellers([])
    setVerifiedOnly(false)
  }

  const filteredProducts = allProducts.filter((product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedCategories.length > 0 && (!product.category || !selectedCategories.includes(product.category))) {
      return false
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }
    if (selectedRating !== null && product.rating < selectedRating) {
      return false
    }
    if (selectedSellers.length > 0) {
      const sellerSlug = product.seller.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
      if (!selectedSellers.includes(sellerSlug)) {
        return false
      }
    }
    if (verifiedOnly && !product.seller.verified) {
      return false
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return 0 // In real app, sort by date
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-transparent">

      {/* Hero Banner */}
      <section className="pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/12 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4 text-white tracking-[0.18em] drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
              MARKETPLACE
            </h1>
            <p className="text-white/55 max-w-2xl mx-auto">
              Discover thousands of unique products from verified sellers worldwide.
              Quality guaranteed, satisfaction promised.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/45" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-full !border-0 bg-white/6 text-base text-white placeholder:text-white/40 shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
              />
            </div>
          </motion.div>


        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="flex gap-10">
            {/* Filter Sidebar (Desktop) */}
            <div className="hidden lg:block w-64 shrink-0 sticky top-18 h-fit">
              <FilterSidebar
                isOpen={true}
                onClose={() => { }}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedCategories={selectedCategories}
                onSelectedCategoriesChange={setSelectedCategories}
                selectedRating={selectedRating}
                onSelectedRatingChange={setSelectedRating}
                selectedSellers={selectedSellers}
                onSelectedSellersChange={setSelectedSellers}
                verifiedOnly={verifiedOnly}
                onVerifiedOnlyChange={setVerifiedOnly}
                onClearAll={clearAllFilters}
              />
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{sortedProducts.length}</span> products
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Grid Toggle (Desktop) */}
                  <div className="hidden md:flex items-center gap-1 p-1 bg-muted rounded-lg">
                    <button
                      onClick={() => setGridCols(6)}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        gridCols === 6 ? "bg-background shadow-sm" : "hover:bg-background/50"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(4)}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        gridCols === 4 ? "bg-background shadow-sm" : "hover:bg-background/50"
                      )}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[160px] justify-between">
                        {sortOptions.find((o) => o.value === sortBy)?.label}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      {sortOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={cn(sortBy === option.value && "bg-muted")}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Products Grid */}
              {paginatedProducts.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-4 sm:gap-6",
                    gridCols === 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                    gridCols === 6 && "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearAllFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {paginatedProducts.length > 0 && totalPages > 1 && (
                <Pagination className="mt-12 select-none">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={cn(
                          "cursor-pointer border-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200",
                          currentPage === 1 && "pointer-events-none opacity-30"
                        )}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className={cn(
                              "cursor-pointer rounded-xl transition-all duration-200",
                              currentPage === page 
                                ? "bg-gold text-charcoal hover:bg-gold/90 border-none font-semibold" 
                                : "border-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={cn(
                          "cursor-pointer border-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200",
                          currentPage === totalPages && "pointer-events-none opacity-30"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        isMobile
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={setSelectedCategories}
        selectedRating={selectedRating}
        onSelectedRatingChange={setSelectedRating}
        selectedSellers={selectedSellers}
        onSelectedSellersChange={setSelectedSellers}
        verifiedOnly={verifiedOnly}
        onVerifiedOnlyChange={setVerifiedOnly}
        onClearAll={clearAllFilters}
      />

    </div>
  )
}
