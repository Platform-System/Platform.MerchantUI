import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Allura, Playfair_Display } from "next/font/google";
import { getLocale } from 'next-intl/server';

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allura = Allura({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
  variable: '--font-allura',
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
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
  const locale = await getLocale();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${allura.variable} ${playfair.variable} antialiased h-screen overflow-hidden bg-background text-foreground transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
