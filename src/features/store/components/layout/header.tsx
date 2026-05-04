"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/features/store/lib/utils"
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/features/store/components/ui/button"
import { Badge } from "@/features/store/components/ui/badge"
import { SearchModal } from "@/features/store/components/search/search-modal"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/features/store/components/ui/accordion"
import { useCart } from "@/features/store/context/CartContext"
import { useWishlist } from "@/features/store/context/WishlistContext"

const categories = [
  { name: "Thời trang", href: "/store/marketplace?category=fashion" },
  { name: "Nhà cửa & Đời sống", href: "/store/marketplace?category=home" },
  { name: "Điện tử", href: "/store/marketplace?category=electronics" },
  { name: "Làm đẹp", href: "/store/marketplace?category=beauty" },
  { name: "Nghệ thuật & Sưu tầm", href: "/store/marketplace?category=art" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { setIsOpen: setIsCartOpen, cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  const isActive = (path: string) => {
    const fullPath = pathname.startsWith("/") ? pathname : `/${pathname}`
    if (path === "/store/marketplace" && (fullPath.includes("/store/product/") || fullPath.includes("/store/marketplace"))) {
      return true
    }
    if (path === "/store/sellers" && (fullPath.includes("/store/seller/") || fullPath.includes("/store/sellers"))) {
      return true
    }
    return fullPath === path || fullPath.includes(path)
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    const scrollContainer = document.getElementById('store-scroll-container')

    const handleScroll = () => {
      if (scrollContainer) {
        setIsScrolled(scrollContainer.scrollTop > 20)
      }
    }

    scrollContainer?.addEventListener("scroll", handleScroll)
    return () => scrollContainer?.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--store-header-height", isScrolled ? "56px" : "64px")
    }
  }, [isScrolled])

  return (
    <>
      <motion.header
        id="store-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "border-b border-[rgb(var(--store-border-rgb)/0.8)] bg-[rgb(var(--store-surface-strong-rgb)/0.88)] shadow-[0_14px_32px_rgb(var(--store-accent-rgb)/0.1)] backdrop-blur-xl"
            : "border-b border-[rgb(var(--store-border-rgb)/0.7)] bg-[rgb(var(--store-surface-rgb)/0.8)] backdrop-blur-sm"
        )}
      >
        <div className="w-full px-4">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled ? "h-14" : "h-16"
          )}>
            {/* Nhãn store */}
            <Link href="/store/home" className="flex items-center gap-2 group">
              <span className="font-serif text-base font-bold tracking-[0.2em] text-foreground transition-colors uppercase group-hover:store-accent-text">STORE</span>
              <div className="h-4 w-px bg-border mx-2 hidden sm:block" />
            </Link>

            {/* Điều hướng desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/store/marketplace"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/store/marketplace") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Cửa hàng
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
                  Danh mục <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className={cn(
                  "store-surface-panel-strong pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-48 origin-top -translate-x-1/2 rounded-xl p-1.5 shadow-[0_20px_40px_rgb(31_42_55/0.14)] transition-all duration-200 opacity-0 scale-95",
                  isCategoryOpen && "opacity-100 scale-100 pointer-events-auto"
                )}>
                  <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsCategoryOpen(false)}
                      className="store-muted-text block w-full rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/store/sellers"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/store/sellers") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Nhà bán hàng
              </Link>
              <Link
                href="/store/become-seller"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/store/become-seller") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Mở gian hàng
              </Link>
            </nav>

            {/* Nhóm hành động */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Tìm kiếm</span>
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative hidden sm:flex text-foreground hover:store-accent-text">
                <Link href="/store/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="store-accent-button absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-none p-0 text-[9px] font-semibold shadow-sm">
                      {wishlistCount}
                    </Badge>
                  )}
                  <span className="sr-only">Danh sách yêu thích</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground hover:store-accent-text"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="store-accent-button absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-none p-0 text-[10px] font-semibold shadow-sm">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Giỏ hàng</span>
              </Button>



              {/* Nút mở menu mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[rgb(var(--store-surface-strong-rgb)/0.95)] backdrop-blur-xl lg:hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Tìm sản phẩm...
                </Button>

                <nav className="space-y-2">
                  <Link
                    href="/store/marketplace"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cửa hàng
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="categories" className="border-none">
                      <AccordionTrigger className="flex items-center justify-between rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:no-underline">
                        Danh mục
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-2 px-4 space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="store-muted-text block rounded-xl px-4 py-2 text-sm transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Link
                    href="/store/wishlist"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium flex items-center justify-between text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Yêu thích
                    {wishlistCount > 0 && (
                      <span className="store-accent-soft flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/store/sellers"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Nhà bán hàng
                  </Link>
                  <Link
                    href="/store/become-seller"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mở gian hàng
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
