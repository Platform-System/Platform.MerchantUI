"use client"

import { SellerCard } from "@/features/store/components/seller/seller-card"
import { popularSellers } from "@/features/store/lib/data"

import { SectionHeader, SectionFooter } from "./section-header"

export function PopularSellersSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subtitle="Đối tác tin cậy"
          title="Nhà bán hàng nổi bật"
          description="Khám phá những nhà bán hàng được đánh giá cao với sản phẩm chất lượng và dịch vụ tận tâm. Mỗi gian hàng đều được xác thực theo tiêu chuẩn của chúng tôi."
        />

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>

        {/* View All */}
        <SectionFooter href="/store/sellers" label="Xem tất cả nhà bán hàng" />
      </div>
    </section>
  )
}

