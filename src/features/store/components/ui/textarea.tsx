import * as React from 'react'

import { cn } from '@/features/store/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
      'placeholder:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border border-[rgb(var(--store-border-rgb)/0.9)] bg-[rgb(var(--store-surface-rgb)/0.84)] px-3 py-2 text-base text-foreground shadow-[0_10px_24px_rgb(15_23_42/0.06)] transition-[color,box-shadow,background-color,border-color] outline-none focus-visible:ring-[3px] focus-visible:bg-[rgb(var(--store-surface-strong-rgb)/0.96)] focus-visible:border-[rgb(var(--store-accent-rgb)/0.28)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
