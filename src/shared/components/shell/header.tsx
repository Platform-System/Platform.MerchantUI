"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/shared/lib/utils"
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LogIn,
  Settings
} from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { useAuth } from "@/core/providers/AuthProvider"
import { SearchModal } from "@/features/search/components/search-modal"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/components/ui/accordion"
import { useCart } from "@/features/cart"
import { useWishlist } from "@/features/wishlist"
import { useCategories } from "@/shared/lib/category-queries"



export function Header() {
  const t = useTranslations("Common")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { setIsOpen: setIsCartOpen, cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { isAuthenticated, login, logout, keycloak } = useAuth()
  const { data: categories = [] } = useCategories()

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
            <Link href="/store/home" className="flex items-center group">
              <span className="font-serif text-xl font-bold tracking-[0.05em] text-foreground uppercase transition-all duration-300 group-hover:store-accent-text">
                {t("brandName")}
              </span>
              <div className="h-4 w-px bg-border mx-6 hidden sm:block opacity-30" />
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
                      key={category.id}
                      href={`/store/marketplace?category=${category.slug}`}
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
                <motion.div
                  key={cartCount}
                  animate={cartCount > 0 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4, ease: "backOut" }}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="store-accent-button absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-none p-0 text-[10px] font-semibold shadow-sm">
                      {cartCount}
                    </Badge>
                  )}
                </motion.div>
                <span className="sr-only">Giỏ hàng</span>
              </Button>              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 ml-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                      <Avatar className="h-9 w-9 transition-transform hover:scale-110 active:scale-95">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="bg-[rgb(var(--store-accent-rgb))] text-white">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {keycloak?.idTokenParsed?.name || "Người dùng"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {keycloak?.idTokenParsed?.preferred_username || "Chào mừng bạn quay lại"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/store/account" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Hồ sơ cá nhân</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/store/account/orders" className="cursor-pointer">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>Đơn hàng</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/store/account/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Cài đặt</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Đăng xuất</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={login} 
                  className="hidden sm:flex items-center gap-2 ml-2 text-foreground hover:store-accent-text font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </Button>
              )}

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
                            key={category.id}
                            href={`/store/marketplace?category=${category.slug}`}
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
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/store/account"
                        className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm flex items-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Tài khoản của tôi
                      </Link>
                      <button
                        className="w-full px-4 py-3 text-left rounded-lg hover:bg-muted transition-colors font-medium text-sm flex items-center text-destructive"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full px-4 py-3 text-left rounded-lg hover:bg-muted transition-colors font-medium text-sm flex items-center"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        login();
                      }}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Đăng nhập
                    </button>
                  )}
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
