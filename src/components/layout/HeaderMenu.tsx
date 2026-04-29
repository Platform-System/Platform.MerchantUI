'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { CURRENT_USER } from '@/data/mockData';
import { ChatDropdown } from '@/features/chat/ui/ChatDropdown';
import { HeaderIcon } from '@/components/common/HeaderIcon';
import LocaleSwitcher from './LocaleSwitcher';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/features/store/components/ui/dropdown-menu';

/** Style chung cho các nút chức năng hình tròn trên Header */
const MENU_BTN_STYLE = "w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#e4e6eb] hover:bg-white/10 transition-colors relative";

/**
 * HeaderMenu: Nhóm các phím tắt chức năng nằm ở phía bên phải của thanh Header.
 * Bao gồm: Nút chuyển ngôn ngữ, Tin nhắn (Messenger), Thông báo (Notifications), và Avatar Profile.
 */
export const HeaderMenu = () => {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 flex-1 justify-end">

      {/* Language Switcher */}
      <LocaleSwitcher />

      {/* Messenger */}
      <div className="relative" ref={messagesRef}>
        <button
          onClick={() => setIsMessagesOpen(!isMessagesOpen)}
          className={clsx(
            MENU_BTN_STYLE,
            isMessagesOpen && "bg-white/10 text-white"
          )}
        >
          <HeaderIcon icon="chat" className="w-5.5 h-5.5" />
          <span className="absolute -top-1 -right-1 bg-[#e41e3f] text-white text-[11px] font-bold w-[19px] h-[19px] flex items-center justify-center rounded-full border-2 border-white dark:border-[#242526]">3</span>
        </button>

        {isMessagesOpen && (
          <ChatDropdown onClose={() => setIsMessagesOpen(false)} />
        )}
      </div>

      {/* Notifications */}
      <button className={MENU_BTN_STYLE}>
        <HeaderIcon icon="bell" className="w-5.5 h-5.5" />
        <span className="absolute -top-1 -right-1 bg-[#e41e3f] text-white text-[11px] font-bold w-[19px] h-[19px] flex items-center justify-center rounded-full border-2 border-white dark:border-[#242526]">5</span>
      </button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative group/profile ml-1 focus:outline-none cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-transparent group-hover/profile:border-white/35 transition-all overflow-hidden shrink-0 shadow-sm relative">
              <Image
                src={CURRENT_USER.avatar}
                fill
                unoptimized
                className="object-cover"
                alt="Profile"
              />
            </div>
            <div className="absolute bottom-0 right-[-2px] w-4 h-4 bg-slate-200 dark:bg-[#444546] rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526] shadow-sm">
              <Icon icon="solar:alt-arrow-down-bold" width="8" className="text-slate-900 dark:text-white" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#18181b] border-white/10 text-white w-44 mt-2 mr-4 p-1.5 rounded-xl shadow-2xl z-50">
          <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2 px-3 text-sm text-zinc-300 hover:text-white focus:bg-white/10 focus:text-white" asChild>
            <Link href="/account">
              Trang cá nhân
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2 px-3 text-sm text-zinc-300 hover:text-white focus:bg-white/10 focus:text-white" asChild>
            <Link href="/account/orders">
              Đơn mua
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10 my-1" />
          <DropdownMenuItem className="hover:bg-destructive/10 cursor-pointer rounded-lg py-2 px-3 text-sm text-destructive hover:text-destructive focus:bg-destructive/10 focus:text-destructive mt-1">
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
