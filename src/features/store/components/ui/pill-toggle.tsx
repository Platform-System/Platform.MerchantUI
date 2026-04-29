"use client"

import * as React from "react"
import { cn } from "@/features/store/lib/utils"

export interface PillToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[]
  activeItem: string | null
  onItemChange: (item: string | null) => void
  allLabel?: string
}

export function PillToggle({
  items,
  activeItem,
  onItemChange,
  allLabel = "All",
  className,
  ...props
}: PillToggleProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none",
        className
      )}
      {...props}
    >
      {/* All Option */}
      <button
        onClick={() => onItemChange(null)}
        type="button"
        className={cn(
          "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
          activeItem === null || activeItem === "All"
            ? "bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.24)] font-semibold"
            : "bg-white/10 text-white/72 hover:bg-white/14 hover:text-white"
        )}
      >
        {allLabel}
      </button>

      {/* Custom Options */}
      {items.map((item) => {
        if (item === "All") return null
        return (
          <button
            key={item}
            onClick={() => onItemChange(item)}
            type="button"
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
              activeItem === item
                ? "bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.24)] font-semibold"
                : "bg-white/10 text-white/72 hover:bg-white/14 hover:text-white"
            )}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
