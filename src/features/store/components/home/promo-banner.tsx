"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"

export function PromoBanner() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Large Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-charcoal group cursor-pointer"
          >
            <Link href="/store/marketplace?filter=summer-sale" scroll={false} className="absolute inset-0 z-20" aria-label="Mua ngay ưu đãi" />
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
                alt="Bộ sưu tập mùa hè"
                fill
                className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
            </div>
            
            <div className="relative p-8 sm:p-12 min-h-[400px] flex flex-col justify-center z-10">
              <span className="store-accent-subtitle inline-flex items-center gap-2 text-sm font-medium mb-4">
                <Clock className="h-4 w-4" />
                Ưu đãi có hạn
              </span>
              <h3 className="mb-4 max-w-sm font-serif text-3xl font-semibold text-white sm:text-4xl">
                Khuyến mãi bộ sưu tập hè
              </h3>
              <p className="mb-6 max-w-md text-white/72">
                Giảm đến 50% cho các sản phẩm chọn lọc trong bộ sưu tập mùa hè cao cấp.
                Mua ngay trước khi hết hàng.
              </p>
              <Button
                asChild
                className="store-accent-button relative z-30 w-fit"
              >
                <Link href="/store/marketplace?filter=summer-sale" scroll={false}>
                  Mua ưu đãi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Small Banners */}
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            className="store-surface-panel relative cursor-pointer overflow-hidden rounded-3xl group"
            >
              <Link href="/store/marketplace?category=beauty" scroll={false} className="absolute inset-0 z-20" aria-label="Tinh chọn làm đẹp" />
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=300&fit=crop"
                  alt="Làm đẹp"
                  fill
                  className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="relative p-8 flex items-center justify-between z-10">
                <div>
                  <span className="store-accent-subtitle text-sm font-medium">Mới về</span>
                  <h3 className="mt-2 mb-2 font-serif text-2xl font-semibold text-foreground">
                    Tinh chọn làm đẹp
                  </h3>
                  <p className="store-muted-text text-sm">Chăm sóc da và trang điểm cao cấp</p>
                </div>
                <Button
                  asChild
                  size="icon"
                  className="store-surface-soft relative z-30 h-12 w-12 shrink-0 rounded-full text-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.12)]"
                >
                  <Link href="/store/marketplace?category=beauty" scroll={false}>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-charcoal group cursor-pointer"
            >
              <Link href="/store/marketplace?category=home" scroll={false} className="absolute inset-0 z-20" aria-label="Nhà cửa & Đời sống" />
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=300&fit=crop"
                  alt="Nhà cửa"
                  fill
                  className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="relative p-8 flex items-center justify-between z-10">
                <div>
                  <span className="store-accent-subtitle text-sm font-medium">Đang thịnh hành</span>
                  <h3 className="mt-2 mb-2 font-serif text-2xl font-semibold text-white">
                    Nhà cửa & Đời sống
                  </h3>
                  <p className="text-sm text-white/72">Làm mới không gian sống</p>
                </div>
                <Button
                  asChild
                  size="icon"
                  className="store-accent-button relative z-30 h-12 w-12 shrink-0 rounded-full"
                >
                  <Link href="/store/marketplace?category=home" scroll={false}>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

