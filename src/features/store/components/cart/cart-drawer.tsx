"use client"

import React, { useState, useEffect } from "react"
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
import { Empty, EmptyTitle, EmptyMedia } from "@/features/store/components/ui/empty"
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

const cartColorOptions = ["Đen", "Nâu", "Vàng đồng", "Xanh Navy"]
const cartSizeOptions = ["Nhỏ", "Vừa", "Lớn"]

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
        className="store-surface-panel-strong z-[1000] flex w-full max-w-[392px] flex-col gap-0 p-0 text-foreground shadow-2xl [&>button]:hidden"
        style={{ 
          top: `${drawerTop}px`, 
          height: `calc(100vh - ${drawerTop}px)` 
        }}
      >
        <SheetTitle className="sr-only">Giỏ hàng</SheetTitle>
            {/* Phần đầu drawer */}
            <div className="flex items-center justify-between bg-transparent px-4 pt-4 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="store-accent-text h-5 w-5" />
                <h2 className="text-xs text-foreground">Giỏ Hàng ({cartCount})</h2>
              </div>
              <div className="flex items-center gap-3">
                {cartItems.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="store-surface-soft mr-1 flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-normal text-foreground transition-colors hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Xóa tất cả
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="store-surface-panel-strong max-w-sm rounded-2xl text-foreground shadow-[0_24px_48px_rgb(15_23_42/0.16)]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-serif text-lg text-foreground">Xác nhận xóa?</AlertDialogTitle>
                        <AlertDialogDescription className="store-muted-text text-sm">
                          Bạn có chắc chắn muốn làm trống toàn bộ sản phẩm trong giỏ hàng chứ? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 flex gap-2">
                        <AlertDialogCancel className="store-surface-soft flex-1 h-10 rounded-full text-xs text-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.1)]">
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
                  className="store-icon-button rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto bg-transparent px-6 pt-2 pb-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <Empty className="bg-transparent border-none">
                    <EmptyMedia variant="icon" className="store-surface-soft store-muted-text h-16 w-16 rounded-full shadow-[0_8px_24px_rgb(15_23_42/0.08)]">
                      <ShoppingBag className="h-8 w-8" />
                    </EmptyMedia>
                    <EmptyTitle className="store-muted-text text-sm font-medium">Giỏ hàng của bạn đang trống</EmptyTitle>
                  </Empty>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="store-accent-button rounded-full px-6 font-medium"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center gap-4 pb-6 last:border-none">
                    <div className="store-surface-soft relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-20">
                      <div>
                        <h3 className="line-clamp-1 text-sm font-medium tracking-wide text-foreground">{item.name}</h3>
                        <div className="mt-1 flex gap-2">
                          <Select
                            value={item.color ?? "Đen"}
                            onValueChange={(value) =>
                              updateItemVariant(item.id, item.color, item.size, { color: value })
                            }
                          >
                            <SelectTrigger
                              size="sm"
                              className="h-7 min-w-[88px] rounded-md px-2.5 text-[11px] shadow-none"
                            >
                              <SelectValue placeholder="Màu" />
                            </SelectTrigger>
                            <SelectContent className="shadow-xl">
                              {cartColorOptions.map((color) => (
                                <SelectItem key={color} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={item.size ?? "Vừa"}
                            onValueChange={(value) =>
                              updateItemVariant(item.id, item.color, item.size, { size: value })
                            }
                          >
                            <SelectTrigger
                              size="sm"
                              className="h-7 min-w-[92px] rounded-md px-2.5 text-[11px] shadow-none"
                            >
                              <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent className="shadow-xl">
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
                        {/* Điều khiển số lượng */}
                        <div className="store-surface-soft flex items-center rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            className="store-muted-text p-1 transition-colors hover:text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-xs font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                            className="store-muted-text p-1 transition-colors hover:text-foreground"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toLocaleString()}</span>
                          <button
                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                            className="store-muted-text transition-colors hover:text-destructive"
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

            {/* Phần chân drawer */}
            {cartItems.length > 0 && (
              <div className="store-surface-soft p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="store-muted-text text-sm font-medium">Tổng cộng</span>
                  <span className="store-total-value text-xl">${cartTotal.toLocaleString()}</span>
                </div>
                <p className="store-muted-text mb-3 text-xs leading-relaxed">Phí vận chuyển và thuế sẽ được tính toán khi hoàn tất thanh toán.</p>
                <div className="flex gap-2">
                  <Link
                    href="/store/cart"
                    onClick={() => setIsOpen(false)}
                    className="store-accent-button flex h-10 flex-1 items-center justify-center rounded-full text-xs font-semibold"
                  >
                    Xem giỏ hàng
                  </Link>
                  <Button
                    variant="outline"
                    className="store-surface-soft h-10 flex-1 rounded-full text-xs text-foreground transition-all hover:bg-[rgb(var(--store-accent-rgb)/0.1)]"
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
