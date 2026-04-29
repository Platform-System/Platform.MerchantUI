"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useWishlist } from "@/features/store/context/WishlistContext"
import { useCart } from "@/features/store/context/CartContext"
import { Button } from "@/features/store/components/ui/button"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/features/store/components/ui/empty"

export function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart, setIsOpen: setIsCartOpen } = useCart()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    setIsCartOpen(true)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-transparent pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-wide flex items-center gap-3">
                <Heart className="h-8 w-8 text-gold fill-gold/20" />
                Danh Sách Yêu Thích
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 mb-10">
          <div>
            <Link href="/store/marketplace" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              Quay lại cửa hàng
            </Link>
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-wide flex items-center gap-3">
              <Heart className="h-8 w-8 text-gold fill-gold/20" />
              Danh Sách Yêu Thích
            </h1>
            <p className="text-white/40 text-sm mt-2">
              Lưu trữ những sản phẩm bạn yêu thích và muốn sở hữu nhất.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="border-none text-white/60 hover:text-destructive hover:bg-white/5 rounded-full transition-all self-start md:self-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa tất cả
            </Button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        <AnimatePresence mode="popLayout">
          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center text-center py-20 bg-[#121214]/50 backdrop-blur-md rounded-3xl p-8 shadow-[0_16px_48px_rgba(0,0,0,0.2)] max-w-2xl mx-auto"
            >
              <Empty className="bg-transparent border-none p-0 md:p-0 gap-4 flex flex-col items-center">
                <EmptyMedia variant="icon" className="bg-white/5 text-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.2)] h-20 w-20 rounded-full flex items-center justify-center">
                  <Heart className="h-10 w-10" />
                </EmptyMedia>
                <EmptyTitle className="text-xl font-semibold text-white">Danh sách đang trống</EmptyTitle>
                <EmptyDescription className="text-white/40 max-w-sm mb-4">
                  Khám phá hàng ngàn sản phẩm cao cấp và thêm chúng vào danh sách yêu thích của bạn.
                </EmptyDescription>
              </Empty>
              <Button asChild className="bg-gold text-charcoal hover:bg-gold/90 font-semibold rounded-full px-8 h-12 shadow-[0_10px_20px_rgba(212,175,55,0.2)] transition-all">
                <Link href="/store/marketplace">Khám phá ngay</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlistItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-[#121214]/80 backdrop-blur-lg rounded-2xl overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all flex flex-col"
                >
                  {/* Image Wrapper */}
                  <div className="relative aspect-square w-full overflow-hidden bg-white/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white/70 hover:text-destructive hover:bg-black/80 transition-all flex items-center justify-center shadow-md z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content Wrapper */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {item.category && (
                        <span className="text-[10px] font-semibold text-gold uppercase tracking-widest block mb-1">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-base font-medium text-white line-clamp-2 group-hover:text-gold transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-white hover:bg-gold text-charcoal hover:text-charcoal font-semibold rounded-full transition-all h-10 shadow-sm flex items-center justify-center gap-2 group/btn"
                      >
                        <ShoppingBag className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
