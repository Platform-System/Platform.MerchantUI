"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Heart, ShoppingBag, Star, Minus, Plus, Share2, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { cn } from "@/features/store/lib/utils"
import { useCart } from "@/features/store/context/CartContext"
import { useWishlist } from "@/features/store/context/WishlistContext"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/features/store/components/ui/dialog"
import { Product } from "./product-card"
import { popularSellers } from "@/features/store/lib/data"
import { Badge } from "@/features/store/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/features/store/components/ui/avatar"
import { RatingStars } from "@/features/store/components/ui/rating-stars"

interface QuickViewDialogProps {
  product: Product
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickViewDialog({ product, isOpen, onOpenChange }: QuickViewDialogProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(Number(product.id))

  const sellerAvatar = popularSellers.find(s => s.name === product.seller?.name)?.avatar 
    || `https://api.dicebear.com/7.x/adventurer/svg?seed=${product.seller?.name}`

  const fullProduct = {
    ...product,
    stock: 12,
    images: product.images ?? [product.image],
    variants: 
      product.category?.toLowerCase() === "fashion"
        ? { colors: [{ name: "Black", value: "#1a1a1a" }, { name: "Brown", value: "#8B4513" }, { name: "Tan", value: "#D2B48C" }, { name: "Navy", value: "#000080" }], sizes: ["Small", "Medium", "Large"] }
        : product.category?.toLowerCase() === "beauty"
          ? { colors: [{ name: "Original", value: "#ffffff" }], sizes: ["50ml", "100ml", "200ml"] }
          : product.category?.toLowerCase() === "electronics"
            ? { colors: [{ name: "Black", value: "#1a1a1a" }, { name: "Silver", value: "#c0c0c0" }], sizes: ["Regular", "Large"] }
            : { colors: [{ name: "Black", value: "#1a1a1a" }, { name: "Gray", value: "#808080" }], sizes: ["Regular", "Large"] }
  }

  const [selectedColor, setSelectedColor] = useState(fullProduct.variants.colors[0])
  const [selectedSize, setSelectedSize] = useState(fullProduct.variants.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [currentModalImage, setCurrentModalImage] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setSelectedColor(fullProduct.variants.colors[0])
      setSelectedSize(fullProduct.variants.sizes[0])
      setQuantity(1)
      setCurrentModalImage(0)
    }
  }, [isOpen])

  const discount = fullProduct.originalPrice 
    ? Math.round(((fullProduct.originalPrice - fullProduct.price) / fullProduct.originalPrice) * 100)
    : 0

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl md:max-w-5xl max-h-[90vh] md:max-h-[660px] p-0 bg-[#18181b]/95 backdrop-blur-xl border-white/10 text-white overflow-hidden rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-0 h-full overflow-hidden flex-1">
          
          {/* Left Column - Image Gallery */}
          <div className="p-6 flex flex-col justify-center bg-zinc-900/50 border-r border-white/5 h-full">
            {/* Main Image */}
            <div className="relative aspect-square max-h-[380px] w-full rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center mb-4 group/modal mx-auto">
              <Image
                src={fullProduct.images[currentModalImage]}
                alt={fullProduct.name}
                fill
                className="object-cover"
              />
              
              {/* Navigation Arrows */}
              {fullProduct.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentModalImage((prev) => (prev - 1 + fullProduct.images.length) % fullProduct.images.length)
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors text-zinc-900"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentModalImage((prev) => (prev + 1) % fullProduct.images.length)
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors text-zinc-900"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-destructive text-white text-xs font-semibold">
                  -{discount}%
                </div>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-charcoal/70 text-white text-[10px]">
                {currentModalImage + 1} / {fullProduct.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {fullProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {fullProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentModalImage(index)
                    }}
                    className={cn(
                      "relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border-2 transition-colors",
                      currentModalImage === index ? "border-gold" : "border-transparent hover:border-white/20"
                    )}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="p-6 pt-8 flex flex-col justify-between relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            <div>
              {/* Seller info */}
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={sellerAvatar} alt={fullProduct.seller.name} className="object-cover" />
                  <AvatarFallback>{fullProduct.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  {fullProduct.seller.name}
                  {fullProduct.seller.verified && (
                    <Badge variant="outline" className="px-1.5 py-0 bg-gold/10 text-gold text-[10px] font-semibold border-none leading-normal hover:bg-gold/15">
                      Verified
                    </Badge>
                  )}
                </span>
              </div>

              <DialogTitle className="font-serif text-[1.5rem] sm:text-[1.65rem] font-semibold mb-1 leading-tight tracking-wide text-white">
                {fullProduct.name}
              </DialogTitle>

              {/* Rating */}
              <div className="flex items-center gap-2.5 mb-2">
                <RatingStars rating={fullProduct.rating} size="sm" />
                <span className="text-xs font-medium">{fullProduct.rating}</span>
                <span className="text-xs text-zinc-400">
                  ({fullProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="text-2xl font-semibold text-white">${fullProduct.price}</span>
                {fullProduct.originalPrice && (
                  <>
                    <span className="text-sm text-zinc-500 line-through">
                      ${fullProduct.originalPrice}
                    </span>
                    <Badge variant="destructive" className="px-2 py-0.5 text-xs font-medium border-none">
                      Save ${fullProduct.originalPrice - fullProduct.price}
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <DialogDescription className="text-sm text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                {`Premium ${fullProduct.name} designed for exceptional quality and outstanding performance. Elevate your daily experience with the finest attention to detail.`}
              </DialogDescription>

              {/* Color Selection */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-zinc-300 mb-2.5 flex items-center gap-1">
                  Color: <span className="text-zinc-400 font-normal">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-2.5">
                  {fullProduct.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedColor(color)
                      }}
                      className={cn(
                        "relative h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center",
                        selectedColor?.name === color.name
                          ? "border-gold scale-105"
                          : "border-transparent hover:scale-105"
                      )}
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColor?.name === color.name && (
                        <Check
                          className={cn(
                            "h-4 w-4",
                            color.name === "Black" || color.name === "Navy"
                              ? "text-white"
                              : "text-charcoal"
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-zinc-300 mb-1">Size</p>
                <div className="flex gap-2">
                  {fullProduct.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedSize(size)
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                        selectedSize === size
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <p className="text-xs font-semibold text-zinc-300 mb-1">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-900/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setQuantity(Math.max(1, quantity - 1))
                      }}
                      className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-4 font-semibold text-xs text-white">{quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setQuantity(Math.min(fullProduct.stock, quantity + 1))
                      }}
                      className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {fullProduct.stock} items available
                  </span>
                </div>
              </div>
              {/* View Details Button */}
              <div className="mt-2 mb-4">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full h-10 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 border border-zinc-500/20 hover:border-zinc-500/40 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Link href={`/store/product/${fullProduct.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex gap-2.5 mt-4 border-t border-white/5 pt-4">
              <Button
                className="flex-1 h-10 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-xl flex items-center justify-center gap-2 text-xs font-medium shadow-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart({
                    id: Number(fullProduct.id),
                    name: fullProduct.name,
                    price: fullProduct.price,
                    image: fullProduct.images[0],
                    color: selectedColor?.name,
                    size: selectedSize,
                  })
                  onOpenChange(false)
                }}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </Button>

              <Button
                className="flex-1 h-10 bg-white hover:bg-white/90 text-zinc-950 rounded-xl flex items-center justify-center text-xs font-semibold shadow-md transition-all"
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart({
                    id: Number(fullProduct.id),
                    name: fullProduct.name,
                    price: fullProduct.price,
                    image: fullProduct.images[0],
                    color: selectedColor?.name,
                    size: selectedSize,
                  })
                  onOpenChange(false)
                }}
              >
                Buy Now
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-xl bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:text-white",
                  isWishlisted && "border-destructive/50 text-destructive"
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  if (isWishlisted) {
                    removeFromWishlist(Number(fullProduct.id))
                  } else {
                    addToWishlist({
                      id: Number(fullProduct.id),
                      name: fullProduct.name,
                      price: fullProduct.price,
                      image: fullProduct.images[0],
                      rating: fullProduct.rating,
                      reviews: fullProduct.reviewCount,
                      category: fullProduct.category,
                    })
                  }
                }}
              >
                <Heart className={cn("h-3.5 w-3.5", isWishlisted && "fill-destructive")} />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(`${window.location.origin}/store/product/${fullProduct.id}`)
                }}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
