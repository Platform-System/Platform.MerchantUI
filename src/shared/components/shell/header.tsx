"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@platform/design-system/lib/cn"
import { ThemeToggle } from "@platform/design-system/components/theme-toggle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@platform/design-system/components/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@platform/design-system/components/avatar"
import { Badge } from "@platform/design-system/components/badge"
import { Button } from "@platform/design-system/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@platform/design-system/components/dropdown-menu"
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
  Settings,
} from "lucide-react"
import { useAuth } from "@/core/providers/AuthProvider"
import { SearchModal } from "@/features/search/components/search-modal"
import { useCart } from "@/features/cart"
import { useWishlist } from "@/features/wishlist"
import { useCategories } from "@/shared/lib/category-queries"

export function Header() {
  const t = useTranslations("Common")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { setIsOpen: setIsCartOpen, cartCount, isOpen: isCartOpen } = useCart()
  const { wishlistCount } = useWishlist()
  const { isAuthenticated, login, logout, keycloak } = useAuth()
  const { data: categories = [] } = useCategories()

  const isActive = (path: string) => {
    const fullPath = pathname.startsWith("/") ? pathname : `/${pathname}`
    if (path === "/marketplace" && (fullPath.includes("/product/") || fullPath.includes("/marketplace"))) {
      return true
    }
    if (path === "/sellers" && (fullPath.includes("/seller/") || fullPath.includes("/sellers"))) {
      return true
    }
    return fullPath === path || fullPath.includes(path)
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    const container = document.getElementById("store-scroll-container")
    const handleScroll = () => {
      const scrollTop = container ? container.scrollTop : window.scrollY
      setIsScrolled(scrollTop > 20)
    }

    if (container) {
      container.addEventListener("scroll", handleScroll)
    } else {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      } else {
        window.removeEventListener("scroll", handleScroll)
      }
    }
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
          "sticky top-0 left-0 right-0 z-[1002] transition-all duration-500",
          isScrolled
            ? "border-b border-[rgb(var(--store-border-rgb)/0.8)] dark:border-b-transparent bg-[rgb(var(--store-surface-strong-rgb)/0.88)] shadow-[0_14px_32px_rgb(var(--store-accent-rgb)/0.1)] backdrop-blur-xl"
            : "border-b border-[rgb(var(--store-border-rgb)/0.7)] dark:border-b-transparent bg-[rgb(var(--store-surface-rgb)/0.8)] backdrop-blur-sm"
        )}
      >
        <div className="w-full px-4">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled ? "h-14" : "h-16"
          )}>
            {/* Nhãn store */}
            <Link href="/home" className="flex items-center group">
              <span className="font-serif text-xl font-bold tracking-[0.05em] text-foreground uppercase transition-all duration-300 group-hover:store-accent-text">
                {t("brandName")}
              </span>
              <div className="h-4 w-px bg-border mx-6 hidden sm:block opacity-30" />
            </Link>

            {/* Điều hướng desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/marketplace"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/marketplace") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Cửa hàng
              </Link>

              <DropdownMenu open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer">
                    Danh mục <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isCategoryOpen && "rotate-180")} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-48 p-1.5 ds-glass-card border-[rgb(var(--store-border-rgb)/0.7)] bg-[rgb(var(--store-surface-rgb)/0.8)] backdrop-blur-md"
                >
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link
                        href={`/marketplace?category=${category.slug}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="store-muted-text block w-full rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground cursor-pointer focus:bg-[rgb(var(--store-accent-rgb)/0.1)] focus:text-foreground"
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/sellers"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/sellers") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Nhà bán hàng
              </Link>
              <Link
                href="/become-seller"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/become-seller") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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

              <Link
                href="/wishlist"
                className="relative hidden sm:inline-flex items-center justify-center size-9 rounded-md text-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.1)] hover:text-foreground transition-colors"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="store-accent-button absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-none p-0 text-[9px] font-semibold shadow-sm">
                    {wishlistCount}
                  </Badge>
                )}
                <span className="sr-only">Danh sách yêu thích</span>
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle
                align="end"
                buttonClassName="text-foreground hover:store-accent-text"
              />

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
              </Button>

              {/* Avatar / Close cart button */}
              {isCartOpen ? (
                <motion.div
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
                >
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    onClick={() => setIsCartOpen(false)}
                    className="relative rounded-full ml-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-foreground text-background">
                        <X className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>
              ) : isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-lg" className="relative rounded-full ml-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                      <Avatar className="size-9 transition-transform hover:scale-110 active:scale-95">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="bg-[rgb(var(--store-accent-rgb))] text-background">
                          <User className="size-5" />
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
                      <Link href="/account" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Hồ sơ cá nhân</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="cursor-pointer">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>Đơn hàng</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/settings" className="cursor-pointer">
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
                    href="/marketplace"
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
                            href={`/marketplace?category=${category.slug}`}
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
                    href="/wishlist"
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
                    href="/sellers"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Nhà bán hàng
                  </Link>
                  <Link
                    href="/become-seller"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mở gian hàng
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/account"
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


