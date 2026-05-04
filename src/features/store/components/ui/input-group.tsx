"use client"

import * as React from "react"
import { cn } from "@/features/store/lib/utils"

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center rounded-xl border border-[rgb(var(--store-border-rgb)/0.9)] bg-[rgb(var(--store-surface-rgb)/0.84)] px-3 py-2 text-sm text-foreground shadow-[0_10px_24px_rgb(15_23_42/0.06)] transition-all duration-200 focus-within:border-[rgb(var(--store-accent-rgb)/0.28)] focus-within:ring-1 focus-within:ring-primary/30 focus-within:bg-[rgb(var(--store-surface-strong-rgb)/0.96)]",
          className
        )}
        {...props}
      >
        {prefix && (
          <div className="flex items-center pr-2 text-muted-foreground shrink-0 mr-2">
            {prefix}
          </div>
        )}
        
        <div className="flex flex-1 items-center [&>input]:h-full [&>input]:w-full [&>input]:border-0 [&>input]:bg-transparent [&>input]:p-0 [&>input]:focus-visible:ring-0">
          {children}
        </div>

        {suffix && (
          <div className="flex items-center pl-2 text-muted-foreground shrink-0 ml-2">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

InputGroup.displayName = "InputGroup"
