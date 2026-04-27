'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Post } from '@/types/feed';

// --- Styles ---
const ACTION_BTN_STYLE = "flex-1 flex items-center justify-center py-2 hover:bg-white/10 rounded-lg transition-all text-[#b0b3b8] hover:text-cyan-400 group";
const STAT_TEXT_STYLE = "hover:underline cursor-pointer font-medium";

// --- Sub-components ---
interface PostActionProps {
  icon: string;
  activeIcon?: string;
  onClick?: () => void;
}

const PostAction = ({ icon, onClick }: PostActionProps) => (
  <button onClick={onClick} className={ACTION_BTN_STYLE}>
    <Icon icon={icon} width="24" className="transition-transform group-active:scale-90" />
  </button>
);

interface ReactionBadgeProps {
  icon: string;
  bgColor: string;
  zIndex: string;
}

const ReactionBadge = ({ icon, bgColor, zIndex }: ReactionBadgeProps) => (
  <div className={`w-5 h-5 ${bgColor} rounded-full flex items-center justify-center border-2 border-[#1c1e21] ${zIndex}`}>
    <Icon icon={icon} className="text-white" width="10" />
  </div>
);

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-card rounded-xl shadow-sm mb-3 ring-1 ring-white/5 overflow-hidden">
      {/* Header bài viết */}
      <div className="p-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src={post.author.avatar}
              fill
              unoptimized
              className="rounded-full border dark:border-white/10 shadow-sm object-cover"
              alt="Author"
            />
          </div>
          <div>
            <h3 className="font-semibold dark:text-gray-100 hover:underline cursor-pointer leading-tight">{post.author.name}</h3>
            <div className="flex items-center gap-1 text-[12px] text-slate-500 dark:text-[#b0b3b8]">
              <span>{post.time}</span>
              <span>•</span>
              <Icon icon="solar:public-bold" width="12" />
            </div>
          </div>
        </div>
        <button className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-slate-500">
          <Icon icon="solar:menu-dots-bold" width="20" />
        </button>
      </div>

      {/* Nội dung văn bản */}
      <div className="px-4 pb-3">
        <p className="text-[15px] dark:text-[#e4e6eb] whitespace-pre-line leading-normal">
          {post.caption}
        </p>
      </div>

      {/* Media Content */}
      {post.content && (
        <div className="bg-black/20 flex items-center justify-center relative min-h-[200px]">
          <Image
            src={post.content}
            width={800}
            height={600}
            unoptimized
            className="w-full object-contain max-h-[612px]"
            alt="Post content"
          />
        </div>
      )}

      {/* Khu vực hiển thị lượt tương tác */}
      <div className="px-4 py-2.5 flex items-center justify-between text-[13px] text-slate-500 dark:text-[#b0b3b8]">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <ReactionBadge icon="solar:like-bold" bgColor="bg-[#1877f2]" zIndex="z-10" />
            <ReactionBadge icon="solar:heart-bold" bgColor="bg-[#f12849]" zIndex="z-0" />
          </div>
          <span className={STAT_TEXT_STYLE}>{post.likes.toLocaleString()}</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <span className={STAT_TEXT_STYLE}>{post.comments}</span>
            <Icon icon="solar:chat-line-broken" width="16" />
          </div>
          <div className="flex items-center gap-1">
            <span className={STAT_TEXT_STYLE}>45</span>
            <Icon icon="solar:share-broken" width="16" />
          </div>
        </div>
      </div>

      {/* Các nút tương tác (Icon only) */}
      <div className="mx-4 py-1 border-t border-white/5 flex items-center justify-between">
        <PostAction icon="solar:like-broken" />
        <PostAction icon="solar:chat-line-broken" />
        <PostAction icon="solar:share-broken" />
      </div>
    </div>
  );
};

export default PostCard;
