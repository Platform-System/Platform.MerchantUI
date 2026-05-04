"use client"

import { useState, useLayoutEffect } from "react"
import { Store } from "lucide-react"
import { FilterBar } from "@/features/store/components/ui/filter-bar"
import { SellerCard } from "@/features/store/components/seller/seller-card"
import { popularSellers } from "@/features/store/lib/data"

const categories = ["Tất cả", "Thời trang", "Nhà cửa", "Điện tử", "Trang sức"]

export function SellersListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tất cả")

  useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const filteredSellers = popularSellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "Tất cả" || 
                           seller.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <span className="store-muted-text text-sm font-medium uppercase tracking-widest">
            Danh sách đã xác minh
          </span>
          <h1 className="mt-3 mb-4 text-balance font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Khám phá nhà bán hàng nổi bật
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tìm các gian hàng uy tín, thương hiệu thủ công và nhà bán hàng chất lượng từ nhiều nơi.
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
            searchPlaceholder="Tìm nhà bán hàng theo tên hoặc địa điểm..."
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
          <div className="store-surface-panel rounded-2xl py-24 text-center shadow-[0_18px_32px_rgb(15_23_42/0.1)]">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">Không tìm thấy nhà bán hàng</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Chưa tìm thấy nhà bán hàng phù hợp với điều kiện hiện tại. Thử đổi từ khóa tìm kiếm hoặc bộ lọc nhẹ hơn.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
