'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { HeaderTabs } from '@/components/layout/HeaderTabs';
import { HeaderMenu } from '@/components/layout/HeaderMenu';

/**
 * SidebarNav: Global header for navigation.
 * Removed translations to keep it pure and minimalist.
 */
export default function SidebarNav() {
  return (
    <header
      style={{ viewTransitionName: 'global-header' } as React.CSSProperties}
      className="sticky top-0 z-[100] w-full h-14 px-4 overflow-visible"
    >
      {/* Solid Base Layer */}
      <div className="absolute inset-0 bg-[#0a0a0f] -z-10" />
      {/* Translucent Glass Layer */}
      <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10 -z-10" />
      
      <div className="max-w-full mx-auto h-full flex items-center justify-between gap-4 relative z-10">

        {/* LEFT: Logo & Brand */}
        <div className="flex items-center gap-2 flex-1">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-cyan-300 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-all duration-300 ease-in-out shrink-0">
              <span className="text-black font-black text-lg">N</span>
            </div>
            <div className="flex items-center gap-4 hidden lg:flex">
              <span className="text-[20px] text-zinc-100 italic mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] font-allura tracking-wider">
                Nyx&apos;s Radiance
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER: Navigation Tabs */}
        <HeaderTabs />

        {/* RIGHT: Functional Menu */}
        <HeaderMenu />

      </div>
    </header>
  );
}
