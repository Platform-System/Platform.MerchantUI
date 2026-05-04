"use client"

import * as React from "react"
import { cn } from "@/features/store/lib/utils"
import { Label } from "@/features/store/components/ui/label"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  description?: string
  error?: string
  required?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, description, error, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        {label && (
          <Label className="flex items-center gap-1 text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive">*</span>}
          </Label>
        )}
        
        <div className="relative">
          {children}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

Field.displayName = "Field"
