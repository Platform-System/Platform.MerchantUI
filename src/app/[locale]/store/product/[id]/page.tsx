"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { featuredProducts, trendingProducts, newArrivals } from "@/features/store/lib/data"
import { RatingStars } from "@/features/store/components/ui/rating-stars"
import { Button } from "@/features/store/components/ui/button"
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, BadgeCheck, ArrowLeft } from "lucide-react"
import { useCart } from "@/features/store/context/CartContext"
import { useWishlist } from "@/features/store/context/WishlistContext"
import { Link, useRouter } from "@/i18n/navigation"
import { cn } from "@/features/store/lib/utils"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  // Combine all products to find the one we want
  const allProducts = [...featuredProducts, ...trendingProducts, ...newArrivals]
  const product = allProducts.find((p) => p.id === id) || featuredProducts[0]
  const isWishlisted = isInWishlist(Number(product.id))

  const [activeImage, setActiveImage] = React.useState(product.image)
  const [quantity, setQuantity] = React.useState(1)

  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image)
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      color: "Default",
      size: "Standard"
    })
  }

  const handleWishlist = () => {
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
  }

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-24 text-white relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8 bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Product Images - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnail list */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {[product.image, ...product.images].map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative size-20 rounded-2xl overflow-hidden border bg-white/[0.02] backdrop-blur-sm transition-all duration-300 shrink-0",
                      activeImage === img ? "border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${index}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl">
            {/* Badge & Seller */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-white text-black shadow-sm">
                  {product.badge.toUpperCase()}
                </span>
              )}
              <Link
                href={`/store/seller/${product.seller.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-gold hover:underline transition-all flex items-center gap-1.5 font-medium"
              >
                {product.seller.name}
                {product.seller.verified && <BadgeCheck className="h-4 w-4 fill-charcoal text-gold" />}
              </Link>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4 pb-6 border-b border-white/5">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-muted-foreground font-medium">
                {product.rating} ({product.reviewCount} verified reviews)
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-4 mt-6">
              <span className="text-4xl font-semibold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through font-light">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-2xl bg-white/[0.04] p-1 backdrop-blur-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="size-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >-</button>
                  <span className="w-10 text-center text-sm font-semibold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="size-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >+</button>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-white hover:bg-zinc-200 text-black font-semibold rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </Button>

                <Button 
                  onClick={handleWishlist}
                  variant="outline" 
                  className={cn(
                    "size-12 rounded-2xl border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all backdrop-blur-md",
                    isWishlisted && "border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-gold")} />
                </Button>
              </div>
            </div>

            {/* Key Info Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/5 text-sm text-muted-foreground">
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                <Truck className="h-6 w-6 text-gold shrink-0" />
                <div>
                  <strong className="block text-white/90 font-medium">Free Delivery</strong>
                  <span className="text-xs text-muted-foreground">Orders over $100</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                <RotateCcw className="h-6 w-6 text-gold shrink-0" />
                <div>
                  <strong className="block text-white/90 font-medium">30-Day Returns</strong>
                  <span className="text-xs text-muted-foreground">Hassle-free exchange</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                <ShieldCheck className="h-6 w-6 text-gold shrink-0" />
                <div>
                  <strong className="block text-white/90 font-medium">Secure Checkout</strong>
                  <span className="text-xs text-muted-foreground">SSL encrypted</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
