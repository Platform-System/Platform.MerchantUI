"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Eye, Minus, Plus, Share2, ChevronLeft, ChevronRight, Check, BadgeCheck } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { cn } from "@/features/store/lib/utils"
import { useCart } from "@/features/store/context/CartContext"
import { useWishlist } from "@/features/store/context/WishlistContext"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/features/store/components/ui/dialog"
import { QuickViewDialog } from "./quick-view-dialog"
import { Badge } from "@/features/store/components/ui/badge"
import { RatingStars } from "@/features/store/components/ui/rating-stars"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  seller: {
    name: string
    verified: boolean
  }
  badge?: "new" | "sale" | "bestseller"
  category?: string
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(Number(product.id))



  return (
    <motion.div
      className={cn("group relative", className)}
      onMouseLeave={() => {
        setCurrentImage(0)
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <Link href={`/store/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted/70">
          {/* Main Image */}
            <Image
              src={product.images?.[currentImage] || product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.2]"
            />

          {/* Image Navigation Dots */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setCurrentImage(index)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    currentImage === index ? "bg-white w-4" : "bg-white/45 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <Badge
              className={cn(
                "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border-none",
                product.badge === "new" && "bg-white text-black hover:bg-white",
                product.badge === "sale" && "bg-zinc-200 text-black hover:bg-zinc-200",
                product.badge === "bestseller" && "bg-charcoal/90 text-white border border-white/10 hover:bg-charcoal/90"
              )}
            >
              {product.badge.toUpperCase()}
            </Badge>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={false}
            className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
          >
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/92 hover:bg-white backdrop-blur-sm shadow-md"
              onClick={(e) => {
                e.preventDefault()
                if (isWishlisted) {
                  removeFromWishlist(Number(product.id))
                } else {
                  addToWishlist({
                    id: Number(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    rating: product.rating,
                    reviews: product.reviewCount,
                    category: product.category,
                  })
                }
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isWishlisted ? "fill-destructive text-destructive" : "text-charcoal"
                )}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/92 hover:bg-white backdrop-blur-sm shadow-md"
              onClick={(e) => {
                e.preventDefault()
                setIsQuickViewOpen(true)
              }}
            >
              <Eye className="h-4 w-4 text-charcoal" />
            </Button>
          </motion.div>

          {/* Add to Cart - Bottom */}
          <motion.div
            initial={false}
            className="absolute bottom-0 inset-x-0 p-3 opacity-100 translate-y-0 transition-all md:opacity-0 md:translate-y-5 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <Button
              className="w-full bg-white hover:bg-zinc-200 text-black rounded-lg font-medium shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart({
                  id: Number(product.id),
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  color: "Black",
                  size: "Small"
                })
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-2.5">
        {/* Seller */}
        <Link
          href={`/store/seller/${product.seller.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
        >
          {product.seller.name}
          {product.seller.verified && (
            <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </Link>

        {/* Name */}
        <Link href={`/store/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 hover:text-white transition-colors tracking-[-0.01em]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <RatingStars rating={product.rating} size="sm" />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-[15px]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
      {/* Quick View Modal */}
      <QuickViewDialog 
        product={product} 
        isOpen={isQuickViewOpen} 
        onOpenChange={setIsQuickViewOpen} 
      />
    </motion.div>
  )
}

