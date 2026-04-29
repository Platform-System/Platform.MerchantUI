import QueryProvider from "@/core/providers/QueryProvider";
import Sidebar from "@/components/common/Sidebar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import ChatWidget from '@/features/chat/ui/ChatWidget';
import { GlobalLoadingBar } from "@/components/layout/GlobalLoadingBar";
import "./globals.css";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryProvider>
        {/* Persistent Visual Shell Background */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/8 blur-[120px] pointer-events-none opacity-100 z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-zinc-400/8 blur-[120px] pointer-events-none opacity-100 z-0"></div>

        <div className="flex flex-col h-screen w-screen bg-background text-foreground transition-colors duration-300 relative z-10">
          <GlobalLoadingBar />
          <Sidebar />
          <main
            style={{ viewTransitionName: 'main-content' } as React.CSSProperties}
            className="flex-1 relative z-10 overflow-hidden"
          >
              {children}
          </main>
          <ChatWidget />
        </div>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
