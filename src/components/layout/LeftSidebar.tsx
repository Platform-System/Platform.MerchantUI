'use client';

import { CURRENT_USER } from '@/data/mockData';
import SidebarItem from '../common/SidebarItem';

/**
 * LeftSidebar: Thanh bên trái hiển thị các lối tắt chức năng nhanh (Avatar, Groups, History, v.v.).
 * Mục đích: Cung cấp các lối tắt truy cập nhanh vào các tính năng phụ của hệ thống.
 */
const LeftSidebar = () => {
  /** Danh sách các lối tắt (Icon-only) */
  const LEFT_SIDEBAR_LINKS = [
    { icon: "solar:users-group-rounded-bold", color: "text-blue-500" },
    { icon: "solar:history-bold", color: "text-cyan-500" },
    { icon: "solar:bookmark-bold", color: "text-purple-500" },
    { icon: "solar:users-group-two-rounded-bold", color: "text-blue-600" },
    { icon: "solar:clapperboard-play-bold", color: "text-blue-400" },
    { icon: "solar:shop-bold", color: "text-blue-500" },
    { icon: "solar:calendar-bold", color: "text-red-500" },
  ];

  return (
    <aside className="fixed left-0 top-14 w-20 h-[calc(100vh-56px)] overflow-y-auto px-2 py-4 hidden xl:block no-scrollbar border-r dark:border-white/5 bg-transparent backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        {/* User Avatar */}
        <div className="hover:scale-110 transition-transform cursor-pointer">
           <SidebarItem
             avatar={CURRENT_USER.avatar}
             label=""
           />
        </div>

        <div className="w-8 h-px bg-white/10" />

        {/* Action Icons */}
        {LEFT_SIDEBAR_LINKS.map((item, i) => (
          <div key={i} className="hover:scale-110 transition-transform">
            <SidebarItem {...item} label="" />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
