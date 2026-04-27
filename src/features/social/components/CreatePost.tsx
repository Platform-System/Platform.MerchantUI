'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { CURRENT_USER } from '@/data/mockData';

const ACTION_BTN_STYLE = "p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors flex items-center justify-center";

const CreatePost: React.FC = () => {
  return (
    <div className="bg-card rounded-xl shadow-sm p-3 mb-3 border border-white/5 flex items-center gap-2">
      <div className="relative w-10 h-10 shrink-0">
        <Image
          src={CURRENT_USER.avatar}
          fill
          unoptimized
          className="rounded-full cursor-pointer hover:opacity-90 border dark:border-white/10 shadow-sm object-cover"
          alt="User"
        />
      </div>

      <div className="flex-1 bg-white/5 hover:bg-white/10 rounded-full py-2 px-4 cursor-pointer transition-colors text-[#b0b3b8] flex items-center gap-2">
        <Icon icon="solar:pen-new-square-linear" width="18" />
        <span className="text-[15px] opacity-40 italic">...</span>
      </div>

      <div className="flex items-center gap-0.5 shrink-0">
        <button className={ACTION_BTN_STYLE}>
          <Icon icon="solar:videocamera-record-bold" className="text-[#f3425f]" width="24" />
        </button>
        <button className={ACTION_BTN_STYLE}>
          <Icon icon="solar:gallery-bold" className="text-[#45bd62]" width="24" />
        </button>
        <button className={ACTION_BTN_STYLE}>
          <Icon icon="solar:emoji-funny-circle-bold" className="text-[#f7b928]" width="24" />
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
