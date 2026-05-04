"use client"

import React from "react"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { Link } from "@/i18n/navigation"
import { useCart } from "@/features/store/context/CartContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/store/components/ui/select"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/features/store/components/ui/empty"

const cartColorOptions = ["Đen", "Nâu", "Vàng đồng", "Xanh Navy"]
const cartSizeOptions = ["Nhỏ", "Vừa", "Lớn"]

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, updateItemVariant, cartTotal, clearCart } = useCart()

  React.useLayoutEffect(() => {
    const container = document.getElementById("store-scroll-container")
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [])

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/store/marketplace"
              className="store-muted-text mb-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại cửa hàng
            </Link>
            <h1 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Giỏ hàng của bạn
            </h1>
            <p className="store-muted-text mt-3 max-w-2xl text-sm leading-7">
              Kiểm tra lại sản phẩm, biến thể và số lượng trước khi hoàn tất đơn hàng.
            </p>
          </div>

          {cartItems.length > 0 && (
            <Button
              variant="outline"
              onClick={clearCart}
              className="store-surface-soft self-start rounded-full border-none hover:bg-destructive/10 hover:text-destructive lg:self-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa toàn bộ
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="store-surface-panel mx-auto flex max-w-2xl flex-col items-center rounded-[32px] px-6 py-20 text-center shadow-[0_16px_48px_rgb(15_23_42/0.1)]">
            <Empty className="border-none bg-transparent p-0">
              <EmptyMedia
                variant="icon"
                className="store-surface-soft store-muted-text mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-[0_10px_28px_rgb(15_23_42/0.08)]"
              >
                <ShoppingBag className="h-10 w-10" />
              </EmptyMedia>
              <EmptyTitle className="mt-5 text-xl font-semibold text-foreground">
                Giỏ hàng của bạn đang trống
              </EmptyTitle>
              <EmptyDescription className="store-muted-text mt-3 max-w-sm leading-7">
                Hãy thêm vài sản phẩm vào giỏ để tiếp tục trải nghiệm mua sắm.
              </EmptyDescription>
            </Empty>

            <Button asChild className="store-accent-button store-accent-button-strong mt-8 rounded-full px-8">
              <Link href="/store/marketplace">Khám phá sản phẩm</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="space-y-5">
              {cartItems.map((item) => (
                <article
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="store-surface-panel grid gap-5 rounded-[28px] p-5 shadow-[0_14px_36px_rgb(15_23_42/0.08)] sm:grid-cols-[140px_minmax(0,1fr)]"
                >
                  <div className="store-surface-soft relative aspect-square overflow-hidden rounded-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <Link
                          href={`/store/product/${item.id}`}
                          className="line-clamp-2 text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors hover:store-accent-text"
                        >
                          {item.name}
                        </Link>
                        <p className="store-muted-text mt-2 text-sm">
                          Đơn giá: ${item.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.color, item.size)}
                        className="store-muted-text inline-flex items-center gap-2 text-sm transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Xóa
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Select
                        value={item.color ?? "Đen"}
                        onValueChange={(value) =>
                          updateItemVariant(item.id, item.color, item.size, { color: value })
                        }
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Chọn màu sắc" />
                        </SelectTrigger>
                        <SelectContent>
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
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Chọn kích thước" />
                        </SelectTrigger>
                        <SelectContent>
                          {cartSizeOptions.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="store-surface-soft inline-flex w-fit items-center rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                          className="store-muted-text p-3 transition-colors hover:text-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-5 text-sm font-semibold text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                          className="store-muted-text p-3 transition-colors hover:text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-lg font-semibold text-foreground">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="store-surface-panel h-fit rounded-[30px] p-6 shadow-[0_18px_44px_rgb(15_23_42/0.1)] lg:sticky lg:top-28">
              <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">
                Tóm tắt đơn hàng
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                Sẵn sàng hoàn tất đơn
              </h2>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="store-muted-text">Tạm tính</span>
                  <span className="font-medium text-foreground">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="store-muted-text">Vận chuyển</span>
                  <span className="font-medium text-foreground">Tính ở bước sau</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="store-muted-text">Thuế</span>
                  <span className="font-medium text-foreground">Tính ở bước sau</span>
                </div>
              </div>

              <div className="my-6 h-px bg-[rgb(var(--store-border-rgb)/0.7)]" />

              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-foreground">Tổng tạm tính</span>
                <span className="store-total-value text-2xl">${cartTotal.toLocaleString()}</span>
              </div>

              <p className="store-muted-text mt-4 text-sm leading-7">
                Đây là bản demo để phục vụ luồng mua sắm và kiểm thử backend. Bạn có thể tiếp tục sang bước thanh toán mô phỏng để hoàn chỉnh flow.
              </p>

              <div className="mt-6 space-y-3">
                <Button asChild className="store-accent-button store-accent-button-strong h-12 w-full rounded-full">
                  <Link href="/store/checkout">Tiến hành thanh toán</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 w-full rounded-full">
                  <Link href="/store/marketplace">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
