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
            <Link href="/store/marketplace?filter=summer-sale" scroll={false} className="absolute inset-0 z-20" aria-label="Shop the Sale" />
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
                alt="Summer Collection"
                fill
                className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
            </div>
            
            <div className="relative p-8 sm:p-12 min-h-[400px] flex flex-col justify-center z-10">
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-4">
                <Clock className="h-4 w-4" />
                Limited Time Offer
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-warm-white mb-4 max-w-sm">
                Summer Collection Sale
              </h3>
              <p className="text-white/60 mb-6 max-w-md">
                Up to 50% off on selected items from our premium summer collection.
                Shop now before they&apos;re gone.
              </p>
              <Button
                asChild
                className="w-fit bg-gold hover:bg-gold/90 text-charcoal relative z-30"
              >
                <Link href="/store/marketplace?filter=summer-sale" scroll={false}>
                  Shop the Sale
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
              className="relative rounded-3xl overflow-hidden bg-soft-beige group cursor-pointer"
            >
              <Link href="/store/marketplace?category=beauty" scroll={false} className="absolute inset-0 z-20" aria-label="Beauty Essentials" />
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=300&fit=crop"
                  alt="Beauty"
                  fill
                  className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="relative p-8 flex items-center justify-between z-10">
                <div>
                  <span className="text-gold text-sm font-medium">New Arrivals</span>
                  <h3 className="font-serif text-2xl font-semibold text-charcoal mt-2 mb-2">
                    Beauty Essentials
                  </h3>
                  <p className="text-graphite text-sm">Premium skincare & makeup</p>
                </div>
                <Button
                  asChild
                  size="icon"
                  className="shrink-0 bg-charcoal hover:bg-charcoal/90 text-warm-white rounded-full h-12 w-12 relative z-30"
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
              <Link href="/store/marketplace?category=home" scroll={false} className="absolute inset-0 z-20" aria-label="Home & Living" />
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=300&fit=crop"
                  alt="Home"
                  fill
                  className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="relative p-8 flex items-center justify-between z-10">
                <div>
                  <span className="text-gold text-sm font-medium">Trending Now</span>
                  <h3 className="font-serif text-2xl font-semibold text-warm-white mt-2 mb-2">
                    Home & Living
                  </h3>
                  <p className="text-white/60 text-sm">Transform your space</p>
                </div>
                <Button
                  asChild
                  size="icon"
                  className="shrink-0 bg-gold hover:bg-gold/90 text-charcoal rounded-full h-12 w-12 relative z-30"
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

