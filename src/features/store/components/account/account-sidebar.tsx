"use client"

import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Store,
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  LogOut,
} from "lucide-react"
import { cn } from "@/features/store/lib/utils"

const customerLinks = [
  { href: "/account", icon: User, label: "Profile" },
  { href: "/account/orders", icon: Package, label: "Orders" },
  { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/account/addresses", icon: MapPin, label: "Addresses" },
  { href: "/account/payment", icon: CreditCard, label: "Payment Methods" },
  { href: "/account/settings", icon: Settings, label: "Settings" },
]

const sellerLinks = [
  { href: "/seller/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/seller/products", icon: ShoppingBag, label: "My Products" },
  { href: "/seller/orders", icon: Package, label: "Orders Received" },
  { href: "/seller/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/seller/store", icon: Store, label: "Store Settings" },
]

interface AccountSidebarProps {
  isSeller?: boolean
}

export function AccountSidebar({ isSeller = false }: AccountSidebarProps) {
  const pathname = usePathname()
  const links = isSeller ? sellerLinks : customerLinks

  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* User Info */}
      <div className="p-6 bg-card rounded-2xl border border-border mb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">Sarah Johnson</h3>
            <p className="text-sm text-muted-foreground">sarah@example.com</p>
          </div>
        </div>
        {isSeller && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                Verified Seller
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-card rounded-2xl border border-border p-2">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative",
                    isActive
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAccountLink"
                      className="absolute inset-0 bg-gold/10 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <link.icon className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mode Switch */}
        <div className="mt-4 pt-4 border-t border-border">
          <Link
            href={isSeller ? "/account" : "/seller/dashboard"}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isSeller ? <User className="h-5 w-5" /> : <Store className="h-5 w-5" />}
            {isSeller ? "Customer View" : "Seller Dashboard"}
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  )
}
