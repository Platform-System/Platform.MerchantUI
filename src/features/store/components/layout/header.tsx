"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import { useParams, usePathname } from "next/navigation"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/store/components/ui/dropdown-menu"
import { SearchModal } from "@/features/store/components/search/search-modal"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/features/store/components/ui/accordion"
import { useCart } from "@/features/store/context/CartContext"
import { useWishlist } from "@/features/store/context/WishlistContext"

const categories = [
  { name: "Fashion", href: "/store/marketplace?category=fashion" },
  { name: "Home & Living", href: "/store/marketplace?category=home" },
  { name: "Electronics", href: "/store/marketplace?category=electronics" },
  { name: "Beauty", href: "/store/marketplace?category=beauty" },
  { name: "Art & Collectibles", href: "/store/marketplace?category=art" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string || "en"
  const { setIsOpen: setIsCartOpen, cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    const fullPath = pathname.startsWith("/") ? pathname : `/${pathname}`
    if (path === "/store/marketplace" && (fullPath.includes("/store/product/") || fullPath.includes("/store/marketplace"))) {
      return true
    }
    if (path === "/store/sellers" && (fullPath.includes("/store/seller/") || fullPath.includes("/store/sellers"))) {
      return true
    }
    return fullPath === path || fullPath === `/${locale}${path}` || fullPath.includes(path)
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
          "sticky top-0 left-0 right-0 z-40 transition-all duration-500 border-b",
          (isScrolled || !pathname.includes("/store/home"))
            ? "bg-[rgba(22,22,26,0.74)] backdrop-blur-xl border-white/8 shadow-[0_10px_30px_rgba(0,0,0,0.24)]"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="w-full px-4">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled ? "h-14" : "h-16"
          )}>
            {/* Store Label */}
            <Link href="/store/home" className="flex items-center gap-2 group">
              <span className="font-serif text-base font-bold tracking-[0.2em] text-foreground group-hover:text-gold transition-colors uppercase">STORE</span>
              <div className="h-4 w-px bg-border mx-2 hidden sm:block" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/store/marketplace"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/store/marketplace") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Marketplace
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
                  Categories <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl transition-all duration-200 z-50 pointer-events-none opacity-0 scale-95 origin-top",
                  isCategoryOpen && "opacity-100 scale-100 pointer-events-auto"
                )}>
                  <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsCategoryOpen(false)}
                      className="block w-full px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
                Sellers
              </Link>
              <Link
                href="/store/become-seller"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/store/become-seller") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Open Shop
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative hidden sm:flex text-foreground hover:text-gold">
                <Link href="/store/wishlist">
                  <Heart className="h-5 w-5" />
                  {mounted && wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 rounded-full bg-gold text-[9px] font-semibold text-charcoal flex items-center justify-center border-none shadow-sm hover:bg-gold/90">
                      {wishlistCount}
                    </Badge>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground hover:text-gold"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {mounted && cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full bg-gold text-[10px] font-semibold text-charcoal flex items-center justify-center border-none shadow-sm hover:bg-gold/90">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>



              {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl"
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
                  Search products...
                </Button>

                <nav className="space-y-2">
                  <Link
                    href="/store/marketplace"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Marketplace
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="categories" className="border-none">
                      <AccordionTrigger className="px-4 py-2 hover:bg-white/5 hover:no-underline rounded-xl font-medium text-white flex items-center justify-between text-sm">
                        Categories
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-2 px-4 space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block px-4 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-white/60 hover:text-white"
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
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="h-5 w-5 rounded-full bg-gold text-[10px] font-semibold text-charcoal flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/store/sellers"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sellers
                  </Link>
                  <Link
                    href="/store/become-seller"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Open Shop
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
