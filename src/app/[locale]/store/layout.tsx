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
        <div className="h-full w-full bg-background text-foreground selection:bg-gold/30 selection:text-charcoal relative">
        {/* Premium Background Effects */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08)_0%,rgba(54,54,60,0.18)_28%,rgba(30,30,36,0.96)_100%)] z-0 pointer-events-none" />

        {/* Mesh Gradient Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/4 blur-[100px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-white/4 blur-[150px] pointer-events-none z-0" />

        {/* Subtle Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.06] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

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
