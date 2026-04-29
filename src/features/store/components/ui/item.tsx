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
          "flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-200",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          {media && (
            <div className="flex-shrink-0 size-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center text-white">
              {media}
            </div>
          )}
          
          <div className="flex flex-col gap-1">
            {title && (
              <h4 className="text-sm font-medium text-white leading-none">
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
