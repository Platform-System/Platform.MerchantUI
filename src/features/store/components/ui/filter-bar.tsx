"use client"

import * as React from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/features/store/components/ui/input"
import { Button } from "@/features/store/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/store/components/ui/select"
import { cn } from "@/features/store/lib/utils"

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: string
  setActiveCategory: (category: string) => void
  categories: string[]
  searchPlaceholder?: string
  allCategoryLabel?: string
  includeAllOption?: boolean
  variant?: "panel" | "inline"
}

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      className,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      categories,
      searchPlaceholder = "Tìm kiếm...",
      allCategoryLabel = "Tất cả",
      includeAllOption = false,
      variant = "panel",
      ...props
    },
    ref
  ) => {
    const resolvedCategories =
      includeAllOption && !categories.includes(allCategoryLabel)
        ? [allCategoryLabel, ...categories]
        : categories

    const isInline = variant === "inline"
    const searchInputClassName = cn(
      "store-surface-panel h-12 border-0 pl-12 text-foreground focus-visible:ring-primary/50 focus-visible:ring-offset-0",
      isInline ? "rounded-2xl" : "rounded-xl"
    )
    const filterWrapperClassName = cn(
      "store-surface-panel flex h-12 w-full items-center gap-2 border-0 pl-3 pr-2 text-foreground sm:w-56",
      isInline ? "rounded-2xl" : "justify-center rounded-xl py-2 sm:justify-start"
    )
    const filterTriggerClassName = cn(
      "store-surface-soft flex-grow justify-between border-none text-foreground shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:opacity-60",
      isInline
        ? "h-9 rounded-xl px-3"
        : "h-8 rounded-lg px-3"
    )
    const clearButtonClassName = cn(
      "store-surface-soft flex h-12 w-full items-center justify-center gap-2 border-none px-4 text-sm text-muted-foreground transition-all duration-200 hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground sm:w-auto",
      isInline ? "rounded-2xl" : "rounded-xl"
    )

    return (
      <div
        ref={ref}
        className={cn(
          isInline
            ? "flex w-full flex-col gap-3 xl:max-w-[620px] xl:flex-row xl:items-center"
            : "store-surface-panel flex w-full flex-col items-center justify-between gap-6 rounded-2xl p-6 shadow-xl md:flex-row",
          className
        )}
        {...props}
      >
        {/* Search */}
        <div className={cn("relative w-full flex-grow", isInline && "flex-1")}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={searchInputClassName}
          />
        </div>

        {/* Filters & Actions */}
        <div
          className={cn(
            "flex w-full shrink-0 flex-col items-center gap-3 sm:flex-row",
            isInline ? "xl:w-auto" : "md:w-auto"
          )}
        >
          {/* Dropdown Filter with Icon */}
          <div className={filterWrapperClassName}>
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Lọc:</span>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className={filterTriggerClassName}>
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl">
                <SelectGroup>
                  {resolvedCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="cursor-pointer rounded-lg py-2.5 focus:bg-[rgb(var(--store-accent-rgb)/0.1)] focus:text-foreground"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Clear All Button */}
          {(searchQuery || activeCategory !== allCategoryLabel) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory(allCategoryLabel)
              }}
              className={clearButtonClassName}
            >
              <X className="h-4 w-4" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>
    )
  }
)

FilterBar.displayName = "FilterBar"
