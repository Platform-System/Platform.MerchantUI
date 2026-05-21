import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@platform/design-system/ThemeProvider";
import QueryProvider from "@/core/providers/QueryProvider";
import AuthProvider from "@/core/providers/AuthProvider";
import { GlobalLoadingBar } from "@/shared/layout/GlobalLoadingBar";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "NYXORIS - Nyx's Radiance",
  description: "The official digital atelier of NYXORIS.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${playfair.variable} relative h-screen overflow-hidden bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <ThemeProvider defaultTheme="system">
          <Toaster richColors closeButton position="top-right" />
          <AuthProvider>
            <QueryProvider>
              <div
                className="pointer-events-none fixed top-[-10%] left-[-10%] z-0 h-[40%] w-[40%] rounded-full opacity-100"
                style={{ background: "rgb(255 255 255 / 0.08)", filter: "blur(120px)" }}
              />
              <div
                className="pointer-events-none fixed right-[-10%] bottom-[-10%] z-0 h-[40%] w-[40%] rounded-full opacity-100"
                style={{ background: "rgb(161 161 170 / 0.08)", filter: "blur(120px)" }}
              />

              <div className="relative z-10 flex h-full w-full flex-col bg-background text-foreground transition-colors duration-300">
                <GlobalLoadingBar />
                <main
                  className="relative z-10 min-h-0 flex-1"
                  style={{ viewTransitionName: "main-content" } as React.CSSProperties}
                >
                  {children}
                </main>
              </div>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
