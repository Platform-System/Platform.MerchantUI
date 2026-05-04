"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { Input } from "@/features/store/components/ui/input"
import { Button } from "@/features/store/components/ui/button"
import { Link } from "@/i18n/navigation"
import { featuredProducts, newArrivals, trendingProducts } from "@/features/store/lib/data"
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const recentSearches = ["Túi thiết kế", "Đồng hồ cổ điển", "Trang sức thủ công"]

const popularSearches = [
  "Bộ sưu tập mùa hè",
  "Trang trí nhà cửa",
  "Đồ thủ công mỹ nghệ",
  "Phụ kiện công nghệ",
  "Mỹ phẩm thiết yếu",
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const allProducts = [...featuredProducts, ...trendingProducts, ...newArrivals]
  const quickResults = allProducts
    .filter((product) => {
      if (!normalizedQuery) return true

      return [product.name, product.seller.name, product.category ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    })
    .slice(0, 4)

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
            className="fixed inset-0 z-50 bg-[rgb(var(--store-ink-rgb)/0.32)] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="store-surface-panel-strong fixed top-[5%] left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Search Input */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  autoFocus
                  type="text"
                  placeholder="Tìm kiếm sản phẩm, nhà bán hàng, danh mục..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 border-0 bg-[rgb(var(--store-surface-rgb)/0.74)] pr-12 pl-12 text-lg focus-visible:ring-0"
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
                      Tìm kiếm gần đây
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="store-surface-soft rounded-full px-4 py-2 text-sm transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
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
                      Tìm kiếm hàng đầu
                    </h3>
                    <div className="space-y-1">
                      {popularSearches.map((search, index) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
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
                      Kết quả nhanh
                    </h3>
                    <div className="space-y-2">
                      {quickResults.length > 0 ? (
                        quickResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/store/product/${product.id}`}
                            onClick={onClose}
                            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
                          >
                            <div className="store-surface-soft relative h-14 w-14 overflow-hidden rounded-lg">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.seller.name}</p>
                            </div>
                            <p className="font-semibold">${product.price}</p>
                          </Link>
                        ))
                      ) : (
                        <div className="store-surface-soft rounded-2xl px-4 py-5 text-sm text-muted-foreground">
                          Không tìm thấy kết quả nhanh phù hợp. Bạn có thể thử từ khóa khác hoặc xem toàn bộ kết quả.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View All Results */}
                  <div className="mt-4 pt-2">
                    <Link
                      href={`/store/marketplace?search=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="store-accent-text flex items-center justify-center gap-2 py-3 transition-colors hover:opacity-80"
                    >
                      Xem tất cả kết quả cho &quot;{query}&quot;
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

