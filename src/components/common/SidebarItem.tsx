'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

/* Định nghĩa kiểu dữ liệu (Props) cho từng mục sidebar */
interface SidebarItemProps {
  icon?: string;
  label: string;
  color?: string;
  avatar?: string;
  onClick?: () => void;
}

/* Các hằng số định nghĩa Style (Sử dụng Tailwind CSS) */
const SIDEBAR_ITEM_STYLE = "flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-colors h-[52px] w-[356px]";
const SIDEBAR_ICON_WRAPPER = "w-9 h-9 flex items-center justify-center shrink-0";
const SIDEBAR_LABEL_STYLE = "font-semibold text-[16px] text-gray-100 truncate";

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, color, avatar, onClick }) => (
  /* Khung bao ngoài của mục Sidebar */
  <div className={SIDEBAR_ITEM_STYLE} onClick={onClick}>
    {/* Hiển thị Avatar nếu có, ngược lại hiển thị Icon */}
    {avatar ? (
      <div className="relative shrink-0">
        <Image
          src={avatar}
          width={36}
          height={36}
          unoptimized
          className="w-9 h-9 rounded-full border dark:border-white/10 shadow-sm"
          alt="Profile"
        />
        {/* Chấm xanh biểu thị trạng thái Online */}
        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#18191a] rounded-full"></div>
      </div>
    ) : (
      <div className={SIDEBAR_ICON_WRAPPER}>
        {icon && <Icon icon={icon} className={color} width="32" />}
      </div>
    )}
    {/* Nhãn văn bản của mục Sidebar - Chỉ hiển thị nếu có label */}
    {label && <span className={SIDEBAR_LABEL_STYLE}>{label}</span>}
  </div>
);

export default SidebarItem;
