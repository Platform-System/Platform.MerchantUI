"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/features/store/hooks/use-toast"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
}

interface CartItemVariantUpdate {
  color?: string
  size?: string
}

interface CartContextType {
  cartItems: CartItem[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeFromCart: (id: number, color?: string, size?: string) => void
  updateQuantity: (id: number, quantity: number, color?: string, size?: string) => void
  updateItemVariant: (
    id: number,
    currentColor: string | undefined,
    currentSize: string | undefined,
    updates: CartItemVariantUpdate
  ) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return []
    }

    const savedCart = localStorage.getItem("nyx_cart")
    if (!savedCart) {
      return []
    }

    try {
      return JSON.parse(savedCart)
    } catch {
      console.error("Failed to parse cart")
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("nyx_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const nextQuantity = Math.max(1, item.quantity ?? 1)

    toast({
      title: "Giỏ hàng",
      description:
        nextQuantity > 1
          ? `Đã thêm ${nextQuantity} sản phẩm ${item.name} vào giỏ hàng!`
          : `Đã thêm ${item.name} vào giỏ hàng!`,
    })

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.color === item.color && i.size === item.size)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + nextQuantity }
            : i
        )
      }
      return [...prevItems, { ...item, quantity: nextQuantity }]
    })
  }

  const removeFromCart = (id: number, color?: string, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => !(i.id === id && i.color === color && i.size === size))
    )
  }

  const updateQuantity = (id: number, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, color, size)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === id && i.color === color && i.size === size ? { ...i, quantity } : i
      )
    )
  }

  const updateItemVariant = (
    id: number,
    currentColor: string | undefined,
    currentSize: string | undefined,
    updates: CartItemVariantUpdate
  ) => {
    setCartItems((prevItems) => {
      const sourceItem = prevItems.find(
        (item) => item.id === id && item.color === currentColor && item.size === currentSize
      )

      if (!sourceItem) {
        return prevItems
      }

      const nextColor = updates.color ?? currentColor
      const nextSize = updates.size ?? currentSize

      if (nextColor === currentColor && nextSize === currentSize) {
        return prevItems
      }

      const targetItem = prevItems.find(
        (item) =>
          item.id === id &&
          item.color === nextColor &&
          item.size === nextSize &&
          !(item.color === currentColor && item.size === currentSize)
      )

      if (targetItem) {
        return prevItems
          .filter(
            (item) => !(item.id === id && item.color === currentColor && item.size === currentSize)
          )
          .map((item) =>
            item.id === id && item.color === nextColor && item.size === nextSize
              ? { ...item, quantity: item.quantity + sourceItem.quantity }
              : item
          )
      }

      return prevItems.map((item) =>
        item.id === id && item.color === currentColor && item.size === currentSize
          ? { ...item, color: nextColor, size: nextSize }
          : item
      )
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemVariant,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}


    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
