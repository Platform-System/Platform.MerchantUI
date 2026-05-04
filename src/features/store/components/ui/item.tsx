"use client"

import * as React from "react"
import { cn } from "@/features/store/lib/utils"

export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  media?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, media, title, description, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
      "store-surface-soft flex items-center justify-between gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-[rgb(var(--store-accent-rgb)/0.08)]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          {media && (
            <div className="store-surface-panel flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg text-foreground">
              {media}
            </div>
          )}
          
          <div className="flex flex-col gap-1">
            {title && (
              <h4 className="text-sm font-medium leading-none text-foreground">
                {title}
              </h4>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    )
  }
)

Item.displayName = "Item"
