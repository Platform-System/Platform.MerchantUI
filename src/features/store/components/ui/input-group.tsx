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
          "flex h-10 w-full items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/50 transition-all duration-200",
          className
        )}
        {...props}
      >
        {prefix && (
          <div className="flex items-center pr-2 border-r border-white/10 text-muted-foreground shrink-0 mr-2">
            {prefix}
          </div>
        )}
        
        <div className="flex-1 flex items-center [&>input]:border-0 [&>input]:bg-transparent [&>input]:p-0 [&>input]:focus-visible:ring-0 [&>input]:h-full [&>input]:w-full">
          {children}
        </div>

        {suffix && (
          <div className="flex items-center pl-2 border-l border-white/10 text-muted-foreground shrink-0 ml-2">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

InputGroup.displayName = "InputGroup"
