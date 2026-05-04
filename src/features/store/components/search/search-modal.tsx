"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { Input } from "@/features/store/components/ui/input"
import { Button } from "@/features/store/components/ui/button"
import { Link } from "@/i18n/navigation"
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const recentSearches = ["Designer bags", "Vintage watches", "Handmade jewelry"]

const popularSearches = [
  "Summer collection",
  "Home decor",
  "Artisan crafts",
  "Tech accessories",
  "Beauty essentials",
]

const quickResults = [
  {
    id: "1",
    name: "Premium Leather Bag",
    price: 299,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop",
    seller: "Luxe Leather Co.",
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 189,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    seller: "TimeKeeper",
  },
  {
    id: "3",
    name: "Handcrafted Earrings",
    price: 79,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop",
    seller: "Artisan Gems",
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[5%] left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl bg-background shadow-2xl"
          >
            {/* Search Input */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  autoFocus
                  type="text"
                  placeholder="Search for products, sellers, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg border-0 bg-muted focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {query.length === 0 ? (
                <>
                  {/* Recent Searches */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Trending Now
                    </h3>
                    <div className="space-y-1">
                      {popularSearches.map((search, index) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <span className="store-accent-text text-sm font-medium">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Quick Results */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Quick Results
                    </h3>
                    <div className="space-y-2">
                      {quickResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/store/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.seller}</p>
                          </div>
                          <p className="font-semibold">${product.price}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* View All Results */}
                  <div className="mt-4 pt-2">
                    <Link
                      href={`/store/marketplace?search=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="store-accent-text flex items-center justify-center gap-2 py-3 transition-colors hover:opacity-80"
                    >
                      View all results for &quot;{query}&quot;
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

