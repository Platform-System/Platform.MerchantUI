"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { popularSellers, featuredProducts } from "@/features/store/lib/data"
import { RatingStars } from "@/features/store/components/ui/rating-stars"
import { ProductCard } from "@/features/store/components/product/product-card"
import { MapPin, BadgeCheck, Calendar, ShoppingBag, ArrowLeft } from "lucide-react"
import { useRouter } from "@/i18n/navigation"

export default function SellerStorefrontPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const seller = popularSellers.find((s) => s.slug === slug) || popularSellers[0]

  if (!seller) return null

  return (
    <div className="min-h-screen bg-transparent text-white pt-24 pb-24 relative z-10">
      
      {/* Cover Image Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 relative">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-6 left-10 z-30 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white bg-black/30 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 hover:bg-black/40 transition-all shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image src={seller.coverImage} alt={`${seller.name} cover`} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>
      </div>

      {/* Store Header Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Avatar */}
          <div className="relative -mt-16 sm:-mt-24 size-36 rounded-3xl overflow-hidden border-4 border-charcoal bg-muted shadow-2xl">
            <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">{seller.name}</h1>
              {seller.verified && <BadgeCheck className="h-7 w-7 text-gold fill-charcoal" />}
            </div>
            <p className="text-gold font-medium mt-2 text-lg tracking-wide">{seller.tagline}</p>
            
            <div className="flex flex-wrap gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/5 px-3 py-1.5 rounded-full">
                <MapPin className="h-4 w-4 text-gold" />
                <span>{seller.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/5 px-3 py-1.5 rounded-full">
                <ShoppingBag className="h-4 w-4 text-gold" />
                <span>{seller.productCount} Products</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/5 px-3 py-1.5 rounded-full">
                <Calendar className="h-4 w-4 text-gold" />
                <span>{seller.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="flex flex-col items-end gap-2 shrink-0 bg-white/[0.04] backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-lg w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">{seller.rating}</span>
              <RatingStars rating={seller.rating} size="md" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">From {seller.reviewCount} verified reviews</span>
          </div>
        </div>
      </div>

      {/* Store About & Products Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar - 4 Cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-white">About Our Store</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{seller.description}</p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-white">Store Policies</h3>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                <div className="pb-3 border-b border-white/5">
                  <strong className="block text-white font-medium mb-1">Shipping</strong>
                  {seller.policies.shipping}
                </div>
                <div className="pb-3 border-b border-white/5">
                  <strong className="block text-white font-medium mb-1">Returns</strong>
                  {seller.policies.returns}
                </div>
                <div>
                  <strong className="block text-white font-medium mb-1">Warranty</strong>
                  {seller.policies.warranty}
                </div>
              </div>
            </div>
          </div>

          {/* Main Product Area - 8 Cols */}
          <div className="lg:col-span-8 flex flex-col">
            <h3 className="font-serif text-3xl font-semibold mb-8 text-white">Explore Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
