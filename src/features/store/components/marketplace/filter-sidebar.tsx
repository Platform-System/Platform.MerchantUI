"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X, Star } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { Checkbox } from "@/features/store/components/ui/checkbox"
import { Slider } from "@/features/store/components/ui/slider"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/features/store/components/ui/accordion"
import { cn } from "@/features/store/lib/utils"
import { Sheet, SheetContent, SheetTitle } from "@/features/store/components/ui/sheet"
import { categories } from "@/features/store/lib/data"
import { RatingStars } from "@/features/store/components/ui/rating-stars"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedCategories: string[]
  onSelectedCategoriesChange: (categories: string[]) => void
  selectedRating: number | null
  onSelectedRatingChange: (rating: number | null) => void
  selectedSellers: string[]
  onSelectedSellersChange: (sellers: string[]) => void
  verifiedOnly: boolean
  onVerifiedOnlyChange: (verifiedOnly: boolean) => void
  onClearAll: () => void
}

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500+", min: 500, max: 10000 },
]

const ratings = [5, 4, 3, 2, 1]

const sellers = [
  { id: "luxe-leather", name: "Luxe Leather Co.", productCount: 156 },
  { id: "nordic-home", name: "Nordic Home", productCount: 234 },
  { id: "techvault", name: "TechVault", productCount: 89 },
  { id: "artisan-gems", name: "Artisan Gems", productCount: 78 },
]



export function FilterSidebar({
  isOpen,
  onClose,
  isMobile,
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onSelectedCategoriesChange,
  selectedRating,
  onSelectedRatingChange,
  selectedSellers,
  onSelectedSellersChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  onClearAll,
}: FilterSidebarProps) {

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange)

  useEffect(() => {
    setLocalPriceRange(priceRange)
  }, [priceRange])

  const toggleCategory = (id: string) => {
    const nextCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id]

    onSelectedCategoriesChange(nextCategories)
  }

  const toggleSeller = (id: string) => {
    const nextSellers = selectedSellers.includes(id)
      ? selectedSellers.filter((sellerId) => sellerId !== id)
      : [...selectedSellers, id]

    onSelectedSellersChange(nextSellers)
  }

  const filterContent = (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 shrink-0">
        <h2 className="font-semibold text-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll} 
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-xl"
            >
              <X className="h-5 w-5" />
            </Button>
          )}

        </div>
      </div>

      {/* Filters */}
        <div className="overflow-y-auto p-4 no-scrollbar max-h-[calc(100vh-220px)] overscroll-contain">
        <Accordion type="multiple" defaultValue={["categories", "price", "rating"]} className="w-full">
          {/* Categories */}
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-4 text-foreground">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox checked={selectedCategories.includes(category.id)} onCheckedChange={() => toggleCategory(category.id)} />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({category.productCount})
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-4 text-foreground">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider
                  value={localPriceRange}
                  onValueChange={(value) => setLocalPriceRange([value[0] ?? 0, value[1] ?? 1000])}
                  onValueCommit={(value) => onPriceRangeChange([value[0] ?? 0, value[1] ?? 1000])}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">${localPriceRange[0]}</span>
                  <span className="text-muted-foreground">${localPriceRange[1]}+</span>
                </div>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox checked={priceRange[0] === range.min && priceRange[1] === range.max} onCheckedChange={() => onPriceRangeChange([range.min, range.max])} />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating */}
          <AccordionItem value="rating" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-4 text-foreground">Customer Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {ratings.map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    onClick={() => onSelectedRatingChange(selectedRating === rating ? null : rating)}
                    className={cn("flex items-center justify-start gap-2 w-full py-2 px-3 rounded-xl h-auto font-normal text-muted-foreground hover:text-foreground hover:bg-white/6 transition-colors", selectedRating === rating && "bg-white/10 text-foreground hover:bg-white/10")}
                  >
                    <div className="flex items-center">
                      <RatingStars rating={rating} size="sm" />
                    </div>
                    <span className="text-sm">{rating === 5 ? "5 stars" : `${rating}+ stars`}</span>
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Sellers */}
          <AccordionItem value="sellers" className="border-b-0">
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-4 text-foreground">Sellers</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox checked={verifiedOnly} onCheckedChange={() => onVerifiedOnlyChange(!verifiedOnly)} />
                  <span className="text-sm font-medium text-foreground">Verified Sellers Only</span>
                </label>
                {sellers.map((seller) => (
                  <label key={seller.id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox checked={selectedSellers.includes(seller.id)} onCheckedChange={() => toggleSeller(seller.id)} />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {seller.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({seller.productCount})
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <div className="p-4">
          <Button onClick={onClose} className="w-full bg-white hover:bg-zinc-200 text-black shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40 top-[var(--store-header-height,64px)]"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed left-0 top-[var(--store-header-height,64px)] bottom-0 w-full max-w-sm bg-[rgba(34,34,40,0.98)] z-50 shadow-[0_24px_48px_rgba(0,0,0,0.35)] flex flex-col"
            >
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div className="w-full rounded-2xl bg-[rgba(34,34,40,0.94)] backdrop-blur-xl max-h-[calc(100vh-120px)] flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.28)] overscroll-contain overflow-hidden">
      <div className="flex flex-col min-h-0 overscroll-contain">
        {filterContent}
      </div>
    </div>
  )
}

