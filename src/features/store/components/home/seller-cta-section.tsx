"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Store, TrendingUp, Users, Shield } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { sellerStats } from "@/features/store/lib/data"

const benefits = [
  {
    icon: Store,
    title: "Your Own Storefront",
    description: "Create a branded store with custom designs and showcase your products beautifully.",
  },
  {
    icon: TrendingUp,
    title: "Powerful Analytics",
    description: "Track sales, customer behavior, and growth with detailed insights.",
  },
  {
    icon: Users,
    title: "Global Reach",
    description: "Access millions of potential customers from around the world.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Get paid safely and on time with our trusted payment system.",
  },
]

export function SellerCtaSection() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Join Our Marketplace
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-warm-white mt-3 mb-4 text-balance">
            Start Selling on Nyxoris
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Join thousands of successful sellers and turn your passion into profit.
            We provide all the tools you need to grow your business.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {sellerStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all"
            >
              <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4 group-hover:bg-gold/20 transition-colors">
                <benefit.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-semibold text-warm-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/50">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gold hover:bg-gold/90 text-charcoal px-10 h-14 text-base font-semibold"
          >
            <Link href="/store/become-seller" scroll={false}>
              Become a Seller
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-white/40 mt-4">
            Free to join. No monthly fees. Pay only when you sell.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

