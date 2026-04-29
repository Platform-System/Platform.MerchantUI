"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { categories } from "@/features/store/lib/data"

import { SectionHeader, SectionFooter } from "./section-header"

export function CategoriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subtitle="Explore"
          title="Shop by Category"
          description="Browse through our diverse collection of categories, each featuring handpicked products from verified sellers around the world."
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/store/marketplace?category=${category.id}`} className="group block" scroll={false}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-semibold text-warm-white text-lg group-hover:text-gold transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {category.productCount.toLocaleString('en-US')} products
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 0 }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="h-4 w-4 text-warm-white" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <SectionFooter href="/store/marketplace" label="View All Categories" />
      </div>
    </section>
  )
}
