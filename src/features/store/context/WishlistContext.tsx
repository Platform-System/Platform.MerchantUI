"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/features/store/hooks/use-toast"

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category?: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    if (typeof window === "undefined") {
      return []
    }

    const savedWishlist = localStorage.getItem("nyx_wishlist")
    if (!savedWishlist) {
      return []
    }

    try {
      return JSON.parse(savedWishlist)
    } catch {
      console.error("Failed to parse wishlist")
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("nyx_wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (item: WishlistItem) => {
    toast({
      title: "Danh sách yêu thích",
      description: `Đã thêm ${item.name} vào danh sách yêu thích!`,
    })

    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems
      }
      return [...prevItems, item]
    })
  }

  const removeFromWishlist = (id: number) => {
    const item = wishlistItems.find((i) => i.id === id)
    if (item) {
      toast({
        title: "Danh sách yêu thích",
        description: `Đã xóa ${item.name} khỏi danh sách yêu thích!`,
      })
    }
    setWishlistItems((prevItems) => prevItems.filter((i) => i.id !== id))
  }

  const isInWishlist = (id: number) => {
    return wishlistItems.some((i) => i.id === id)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}


    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
