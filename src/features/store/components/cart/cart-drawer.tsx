"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/features/store/context/CartContext"
import { Button } from "@/features/store/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/store/components/ui/select"
import { Sheet, SheetContent, SheetTitle } from "@/features/store/components/ui/sheet"
import { Empty, EmptyTitle, EmptyDescription, EmptyMedia } from "@/features/store/components/ui/empty"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/features/store/components/ui/alert-dialog"

const cartColorOptions = ["Black", "Brown", "Tan", "Navy"]
const cartSizeOptions = ["Small", "Medium", "Large"]

export function CartDrawer() {
  const { isOpen, setIsOpen, cartItems, removeFromCart, updateQuantity, updateItemVariant, cartTotal, cartCount, clearCart } = useCart()
  const [headerBottom, setHeaderBottom] = useState(64)
  const drawerTop = Math.max(0, Math.ceil(headerBottom) - 1)

  useEffect(() => {
    if (!isOpen) return

    const updatePosition = () => {
      const headerEl = document.querySelector('#store-header')
      if (headerEl) {
        setHeaderBottom(headerEl.getBoundingClientRect().bottom)
      }
    }

    updatePosition()

    const scrollContainer = document.getElementById('store-scroll-container')
    scrollContainer?.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)

    return () => {
      scrollContainer?.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent 
        side="right" 
        className="w-full max-w-[392px] bg-[#121214] text-white shadow-2xl z-[1000] flex flex-col border-l border-white/10 p-0 gap-0 [&>button]:hidden"
        style={{ 
          top: `${drawerTop}px`, 
          height: `calc(100vh - ${drawerTop}px)` 
        }}
      >
        <SheetTitle className="sr-only">Giỏ hàng</SheetTitle>
            {/* Header */}
            <div className="px-4 pt-4 pb-2 flex items-center justify-between bg-transparent border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h2 className="text-xs text-white">Giỏ Hàng ({cartCount})</h2>
              </div>
              <div className="flex items-center gap-3">
                {cartItems.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-white/80 hover:text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-1.5 mr-1 h-8 px-3 rounded-full bg-white/5 font-normal"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Xóa tất cả
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#18181b] border-white/10 text-white rounded-2xl max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white font-serif text-lg">Xác nhận xóa?</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/60 text-sm">
                          Bạn có chắc chắn muốn làm trống toàn bộ sản phẩm trong giỏ hàng chứ? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 flex gap-2">
                        <AlertDialogCancel className="flex-1 border-white/10 bg-transparent hover:bg-white/5 text-white rounded-full h-10 text-xs">
                          Hủy bỏ
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={clearCart}
                          className="flex-1 bg-destructive text-white hover:bg-destructive/90 rounded-full h-10 text-xs font-semibold"
                        >
                          Xóa ngay
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 text-white rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 space-y-6 bg-[#121214] no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <Empty className="bg-transparent border-none">
                    <EmptyMedia variant="icon" className="bg-white/5 text-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.2)] h-16 w-16 rounded-full">
                      <ShoppingBag className="h-8 w-8" />
                    </EmptyMedia>
                    <EmptyTitle className="text-white/70 font-medium text-sm">Giỏ hàng của bạn đang trống</EmptyTitle>
                  </Empty>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-gold text-charcoal hover:bg-gold/80 rounded-full px-6 font-medium transition-all"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 pb-6 border-b border-white/5 last:border-none items-center">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-20">
                      <div>
                        <h3 className="font-medium text-sm text-white line-clamp-1 tracking-wide">{item.name}</h3>
                        <div className="mt-1 flex gap-2">
                          <Select
                            value={item.color ?? "Black"}
                            onValueChange={(value) =>
                              updateItemVariant(item.id, item.color, item.size, { color: value })
                            }
                          >
                            <SelectTrigger
                              size="sm"
                              className="h-7 min-w-[88px] rounded-md border-white/10 bg-white/[0.03] px-2.5 text-[11px] text-white/75"
                            >
                              <SelectValue placeholder="Màu" />
                            </SelectTrigger>
                            <SelectContent className="border-white/10 bg-[#18181b] text-white">
                              {cartColorOptions.map((color) => (
                                <SelectItem key={color} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={item.size ?? "Medium"}
                            onValueChange={(value) =>
                              updateItemVariant(item.id, item.color, item.size, { size: value })
                            }
                          >
                            <SelectTrigger
                              size="sm"
                              className="h-7 min-w-[92px] rounded-md border-white/10 bg-white/[0.03] px-2.5 text-[11px] text-white/75"
                            >
                              <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent className="border-white/10 bg-[#18181b] text-white">
                              {cartSizeOptions.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/10 rounded-lg bg-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            className="p-1 text-white/40 hover:text-white transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-xs font-medium text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                            className="p-1 text-white/40 hover:text-white transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-white">${(item.price * item.quantity).toLocaleString()}</span>
                          <button
                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                            className="text-white/40 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-[#18181b]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60 font-medium">Tổng cộng</span>
                  <span className="text-xl font-bold text-gold">${cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-white/40 mb-3 leading-relaxed">Phí vận chuyển và thuế sẽ được tính toán khi hoàn tất thanh toán.</p>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gold text-charcoal hover:bg-gold/90 font-semibold h-10 rounded-full shadow-[0_10px_20px_rgba(212,175,55,0.1)] transition-all text-xs" asChild>
                    <Link href="/cart" onClick={() => setIsOpen(false)}>Thanh toán ngay</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/10 bg-transparent hover:bg-white/5 text-white h-10 rounded-full transition-all text-xs"
                    onClick={() => setIsOpen(false)}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              </div>
            )}
      </SheetContent>
    </Sheet>
  )
}
