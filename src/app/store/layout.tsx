import { Header } from "@/features/store/components/layout/header"
import { Footer } from "@/features/store/components/layout/footer"
import { CartProvider } from "@/features/store/context/CartContext"
import { WishlistProvider } from "@/features/store/context/WishlistContext"
import { Toaster } from "@/features/store/components/ui/toaster"
import { CartDrawer } from "@/features/store/components/cart/cart-drawer"


/**
 * StoreLayout: The global layout for all store-related pages.
 * Features a high-end monochrome background and shared navigation.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
    <div className="store-theme relative h-full w-full bg-background text-foreground selection:bg-primary/25 selection:text-charcoal">
        {/* Premium Background Effects */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgb(var(--store-surface-strong-rgb)/0.82)_0%,rgb(247_245_242/0.97)_42%,rgb(241_244_246)_100%)]" />

        {/* Mesh Gradient Glows */}
        <div className="pointer-events-none fixed top-[-10%] left-[-10%] z-0 h-[50%] w-[50%] rounded-full bg-[rgb(var(--store-accent-rgb)/0.18)] blur-[120px]" />
        <div className="pointer-events-none fixed top-[10%] right-[-10%] z-0 h-[40%] w-[40%] rounded-full bg-[rgb(var(--store-border-rgb)/0.46)] blur-[100px]" />
        <div className="pointer-events-none fixed bottom-[-10%] left-[20%] z-0 h-[60%] w-[60%] rounded-full bg-[rgb(var(--store-surface-strong-rgb)/0.74)] blur-[150px]" />

        {/* Subtle Texture Overlay */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgb(var(--store-muted-rgb)/0.1)_0.8px,transparent_0.8px)] opacity-[0.03] [background-size:18px_18px]" />

        {/* The Scrollable Surface */}
        <main id="store-scroll-container" className="h-screen w-full overflow-y-auto scroll-smooth relative z-10">
          <Header />
          {children}
          <Footer />
        </main>
        <CartDrawer />
        <Toaster />
      </div>
      </CartProvider>
    </WishlistProvider>
  );
}
