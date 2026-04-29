"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/features/store/lib/utils"

export interface RatingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  className,
  ...props
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    >
      {[...Array(maxRating)].map((_, i) => {
        const isFilled = i < Math.floor(rating)
        const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5

        return (
          <div key={i} className="relative">
            <Star
              className={cn(sizeClasses[size])}
              style={{
                fill: isFilled ? 'var(--color-star)' : 'rgba(161, 161, 170, 0.15)',
                color: isFilled ? 'var(--color-star)' : 'rgba(161, 161, 170, 0.3)'
              }}
            />
            {isHalf && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star 
                  className={cn(sizeClasses[size])} 
                  style={{ fill: 'var(--color-star)', color: 'var(--color-star)' }} 
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
