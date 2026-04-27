'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { HeaderIcon } from '@/components/common/HeaderIcon';
import clsx from 'clsx';

/** 
 * HeaderTabs: Global navigation tabs.
 * Clean version - Removed hover tooltips as requested.
 */
export const HeaderTabs = () => {
  const pathname = usePathname();

  const navItems = [
    { path: '/', icon: 'home-linear', activeIcon: 'home-bold' },
    { path: '/social', icon: 'users-linear', activeIcon: 'users-bold' },
    { path: '/store/all', icon: 'cart-linear', activeIcon: 'cart-bold' },
    { path: '/library', icon: 'library-linear', activeIcon: 'library-bold' },
  ];

  return (
    <nav className="flex items-center gap-1.5 p-1 bg-transparent rounded-2xl shrink-0 h-11 select-none">
      {navItems.map((item) => {
        const isActive = item.path === '/'
          ? pathname === '/'
          : pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            href={item.path}
            className={clsx(
              "flex items-center justify-center h-9 w-11 rounded-xl transition-all duration-150 relative group shrink-0",
              isActive
                ? "bg-white/10 text-cyan-400 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)]"
                : "text-[#b0b3b8] hover:bg-white/5 hover:text-white"
            )}
          >
            <div className={clsx("flex items-center justify-center transition-transform", isActive ? "scale-105" : "group-hover:scale-110 active:scale-95")}>
              <HeaderIcon icon={isActive ? item.activeIcon : item.icon} className="w-6 h-6" />
            </div>
            {isActive && <div className="absolute bottom-0 inset-x-3 h-[2.5px] bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>}
          </Link>
        );
      })}
    </nav>
  );
};
