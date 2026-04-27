'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Story {
  id: number;
  user: string;
  avatar: string;
  image: string;
  unread?: boolean;
}

interface StoryBarProps {
  stories: Story[];
}

const StoryCard = ({ story }: { story: Story }) => (
  <div className="w-[112px] h-[200px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/5 relative group cursor-pointer overflow-hidden shrink-0 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] active:scale-95">
    <Image src={story.image} fill unoptimized className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={story.user} />
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 group-hover:from-black/20 transition-all"></div>
    <div className={`absolute top-3 left-3 w-9 h-9 rounded-full border-[2.5px] ${story.unread ? 'border-[#0084ff]' : 'border-white/40'} p-0.5 overflow-hidden z-10 shadow-lg backdrop-blur-sm`}>
      <Image src={story.avatar} width={36} height={36} unoptimized className="w-full h-full rounded-full object-cover" alt={story.user} />
    </div>
    <span className="absolute bottom-2.5 left-3 right-3 text-white text-[12.5px] font-semibold leading-tight drop-shadow-lg z-10 tracking-tight">
      {story.user}
    </span>
  </div>
);

const StoryBar: React.FC<StoryBarProps> = ({ stories }) => {
  return (
    <div className="relative mb-4 group/bar">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation={{
          prevEl: '.story-prev',
          nextEl: '.story-next',
        }}
        className="story-swiper !static"
      >
        {/* Create Story Slide */}
        <SwiperSlide className="!w-auto">
          <div className="w-[112px] h-[200px] bg-card rounded-xl shadow-md border border-white/5 relative group cursor-pointer overflow-hidden flex flex-col shrink-0 transition-all duration-300 active:scale-95">
            <div className="h-full overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Create Story"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                 <div className="w-10 h-10 bg-[#0084ff] rounded-full border-[3px] border-[#1c1e21] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                   <Icon icon="solar:add-bold" className="text-white" width="22" />
                 </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Story List */}
        {stories.map((story) => (
          <SwiperSlide key={story.id} className="!w-auto">
            <StoryCard story={story} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className="story-prev absolute left-[-12px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-500 opacity-0 group-hover/bar:opacity-100 pointer-events-none group-hover/bar:pointer-events-auto hover:scale-110 hover:bg-white/20 text-white"
      >
        <Icon icon="solar:alt-arrow-left-bold" width="18" />
      </button>

      <button
        className="story-next absolute right-[-12px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-500 opacity-0 group-hover/bar:opacity-100 pointer-events-none group-hover/bar:pointer-events-auto hover:scale-110 hover:bg-white/20 text-white"
      >
        <Icon icon="solar:alt-arrow-right-bold" width="18" />
      </button>

      <style jsx global>{`
        .story-swiper .swiper-button-disabled {
          display: none !important;
        }
        .story-swiper .swiper-wrapper {
          padding-left: 0px;
          padding-right: 0px;
        }
      `}</style>
    </div>
  );
};

export default StoryBar;
