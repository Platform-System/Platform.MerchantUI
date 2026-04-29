"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { RatingStars } from "@/features/store/components/ui/rating-stars"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Fashion Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Nyxoris has completely changed how I shop. The quality of products and the seller verification gives me confidence in every purchase.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Home Decor Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "The curated selection and premium quality make this marketplace stand out. I have found unique pieces I could not find anywhere else.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Art Collector",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "As an art collector, I appreciate the authentication and quality assurance Nyxoris provides. It is my go-to for unique finds.",
    rating: 5,
  },
]

const logos = [
  { name: "Forbes", width: 80 },
  { name: "Vogue", width: 70 },
  { name: "TechCrunch", width: 100 },
  { name: "Business Insider", width: 90 },
  { name: "Elle", width: 50 },
]

export function TrustSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 mb-4 text-balance">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-gold/30 mb-4" />

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Rating */}
              <RatingStars rating={testimonial.rating} className="mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "4.9/5", label: "Customer Rating" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Customer Support" },
            { value: "100%", label: "Secure Checkout" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
