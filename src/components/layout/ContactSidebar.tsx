'use client';

import { Icon } from '@iconify/react';
import { CHATS } from '@/data/mockData';
import { useChatState } from '@/features/chat/state/useChatState';
import SidebarItem from '../common/SidebarItem';

/**
 * ContactSidebar: Thanh bên phải hiển thị danh sách bạn bè đang trực tuyến và ô tìm kiếm nhanh.
 * Mục đích: Giúp người dùng nhanh chóng mở cửa sổ Chat với bạn bè từ bất kỳ đâu.
 */
const ContactSidebar = () => {
  const { openChat } = useChatState();

  return (
    <aside className="fixed right-0 top-14 w-20 h-[calc(100vh-56px)] overflow-y-auto px-2 py-4 hidden lg:block no-scrollbar border-l dark:border-white/5 bg-transparent backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        {/* Actions */}
        <button className="p-2.5 hover:bg-white/10 rounded-full transition-all text-[#b0b3b8] hover:scale-110">
          <Icon icon="solar:magnifer-bold" width="20" />
        </button>
        
        <div className="w-8 h-px bg-slate-200 dark:bg-white/10" />

        {/* Online Contacts (Avatar only) */}
        <div className="flex flex-col items-center gap-3">
          {CHATS.map((chat) => (
            <div key={chat.id} className="hover:scale-110 transition-transform cursor-pointer">
              <SidebarItem
                avatar={chat.avatar}
                label=""
                onClick={() => openChat(chat)}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ContactSidebar;
