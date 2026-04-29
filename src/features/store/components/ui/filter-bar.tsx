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
      searchPlaceholder = "Search...",
      allCategoryLabel = "All",
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
      "h-12 !border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.028))] pl-12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus-visible:ring-gold/50 focus-visible:ring-offset-0",
      isInline ? "rounded-2xl" : "rounded-xl"
    )
    const filterWrapperClassName = cn(
      "flex h-12 w-full items-center gap-2 !border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.028))] pl-3 pr-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:w-56",
      isInline ? "rounded-2xl" : "justify-center rounded-xl py-2 sm:justify-start"
    )
    const filterTriggerClassName = cn(
      "flex-grow justify-between border-none bg-white/[0.045] text-white shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:opacity-60",
      isInline
        ? "h-9 rounded-xl px-3"
        : "h-8 rounded-lg px-3"
    )
    const clearButtonClassName = cn(
      "flex h-12 w-full items-center justify-center gap-2 border-none bg-white/[0.02] px-4 text-sm text-muted-foreground transition-all duration-200 hover:bg-white/[0.05] hover:text-white sm:w-auto",
      isInline ? "rounded-2xl" : "rounded-xl"
    )

    return (
      <div
        ref={ref}
        className={cn(
          isInline
            ? "flex w-full flex-col gap-3 xl:max-w-[620px] xl:flex-row xl:items-center"
            : "flex w-full flex-col items-center justify-between gap-6 rounded-2xl bg-card p-6 shadow-lg md:flex-row",
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
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Filter:</span>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className={filterTriggerClassName}>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-white rounded-xl">
                <SelectGroup>
                  {resolvedCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="focus:bg-muted focus:text-white cursor-pointer py-2.5 rounded-lg"
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
              Clear All
            </Button>
          )}
        </div>
      </div>
    )
  }
)

FilterBar.displayName = "FilterBar"
