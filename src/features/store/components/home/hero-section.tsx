"use client"

import { useRef } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, Sparkles, BadgeCheck } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent z-10" />
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-zinc-800/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-20 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm text-white font-medium uppercase tracking-widest">Premium Marketplace</span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-warm-white leading-[1.1] mb-6"
              >
                Discover{" "}
                <span className="relative inline-block">
                  <span style={{ color: '#ffffff' }} className="border-b-2 border-white/30 pb-1">Unique</span>
                </span>
                <br />
                Products from
                <br />
                Curated Sellers
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8"
              >
                Shop from thousands of verified sellers worldwide. Experience premium shopping
                with exclusive collections you won&apos;t find anywhere else.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-zinc-200 text-black px-8 h-14 text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <Link href="/store/marketplace" scroll={false}>
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-warm-white hover:bg-white/10 px-8 h-14 text-base"
                >
                  <Link href="/store/become-seller" scroll={false}>
                    <Play className="mr-2 h-5 w-5" />
                    Start Selling
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
              >
                {[
                  { value: "15K+", label: "Sellers" },
                  { value: "250K+", label: "Products" },
                  { value: "500K+", label: "Customers" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="font-serif text-2xl sm:text-3xl font-semibold text-white"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Main Featured Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop"
                    alt="Featured Collection"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  
                  {/* Floating Product Card */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop"
                          alt="Product"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-warm-white text-sm">Premium Leather Bag</p>
                        <p className="text-xs text-white/60">by Luxe Leather Co.</p>
                      </div>
                      <div className="text-white font-semibold">$299</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-8 z-0 w-32 aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/10"
              >
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
                  alt="Watch"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 z-20 w-40 aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/10"
              >
                <Image
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop"
                  alt="Jewelry"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Verified Badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-0 z-30 bg-white text-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <BadgeCheck className="h-4 w-4 text-black" />
                <span className="text-sm font-semibold">Verified Sellers</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

