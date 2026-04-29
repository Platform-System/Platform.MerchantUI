"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { Star, MapPin, Package, Check } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { Badge } from "@/features/store/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/features/store/components/ui/avatar"

export interface Seller {
  id: string
  name: string
  slug: string
  avatar: string
  coverImage: string
  rating: number
  reviewCount: number
  productCount: number
  location: string
  verified: boolean
  categories: string[]
  description?: string
  tagline?: string
  responseTime?: string
  policies?: {
    shipping: string
    returns: string
    warranty: string
  }
}

interface SellerCardProps {
  seller: Seller
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col"
    >
      {/* Link Overlay */}
      <Link href={`/store/seller/${seller.slug}`} scroll={false} className="absolute inset-0 z-20" aria-label={`Visit ${seller.name}`} />

      {/* Cover Image */}
      <div className="relative h-24 overflow-hidden">
        <Image
          src={seller.coverImage}
          alt={`${seller.name} cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="relative -mt-8 flex justify-center">
        <Avatar className="h-16 w-16 border-4 border-card bg-muted">
          <AvatarImage src={seller.avatar} alt={seller.name} className="object-cover" />
          <AvatarFallback>{seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {seller.verified && (
          <div className="absolute bottom-0 right-1/2 translate-x-8 bg-gold rounded-full p-1 flex items-center justify-center">
            <Check className="h-3 w-3 text-charcoal" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 pt-3 text-center flex flex-col flex-grow">
        <Link href={`/store/seller/${seller.slug}`} scroll={false}>
          <h3 className="font-semibold hover:text-gold transition-colors">{seller.name}</h3>
        </Link>

        <div className="flex items-center justify-center gap-1 mt-1.5 text-muted-foreground text-sm">
          <MapPin className="h-3.5 w-3.5" />
          {seller.location}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" style={{ fill: 'var(--color-star)', color: 'var(--color-star)' }} />
            <span className="font-medium">{seller.rating}</span>
            <span className="text-muted-foreground">({seller.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="h-4 w-4" />
            {seller.productCount} products
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center content-start gap-2 mt-3 h-[60px] overflow-hidden">
          {seller.categories.slice(0, 4).map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="px-2.5 py-1 rounded-full text-xs text-muted-foreground border-none hover:bg-muted/80"
            >
              {category}
            </Badge>
          ))}
          {seller.categories.length > 4 && (
            <Badge
              variant="secondary"
              className="px-2.5 py-1 rounded-full text-xs text-muted-foreground border-none hover:bg-muted/80"
            >
              ...
            </Badge>
          )}
        </div>

        {/* CTA */}
        <Button asChild variant="outline" className="w-full mt-5 border-white/20 text-warm-white hover:!bg-white hover:!text-black hover:!border-white group-hover:!bg-white group-hover:!text-black group-hover:!border-white transition-all duration-300 relative z-30">
          <Link href={`/store/seller/${seller.slug}`} scroll={false}>Visit Store</Link>
        </Button>
      </div>
    </motion.div>
  )
}

