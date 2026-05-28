"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchAllCategories, categoryQueryKeys } from "@/shared/lib/category-queries"

import { SectionHeader, SectionFooter } from "./section-header"

export function CategoriesSection() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: fetchAllCategories,
    staleTime: 10 * 60 * 1000,
  })

  return (
    <section className="relative py-24 bg-background" style={{ position: "relative" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề section */}
        <SectionHeader
          subtitle="Danh mục"
          title="Mua sắm theo ngành hàng"
          description="Khám phá các nhóm sản phẩm được chọn lọc kỹ càng, quy tụ từ những nhà bán hàng đã xác minh trên khắp nơi."
        />

        {/* Lưới danh mục */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted/30 animate-pulse">
                <div className="absolute inset-x-0 bottom-0 p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/marketplace?category=${category.id}`} className="group block" scroll={false}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Nội dung */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:store-accent-text">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/72">
                        {(category.productCount ?? 0).toLocaleString('vi-VN')} sản phẩm
                      </p>
                    </div>

                    {/* Mũi tên khi hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 0 }}
                      className="ds-glass-panel absolute right-4 top-4 rounded-full p-2 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <ArrowRight className="h-4 w-4 text-foreground" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Link xem tất cả */}
        <SectionFooter href="/marketplace" label="Xem tất cả danh mục" />
      </div>
    </section>
  )
}

