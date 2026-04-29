'use client';

import React from 'react';
import { HomeBackground } from '../components/HomeDesign';
import { ChapterWeb } from '../components/ChapterWeb';
import { ChapterSocial } from '../components/ChapterSocial';
import { ChapterStore } from '../components/ChapterStore';

/**
 * Home: Thành phần chính điều phối toàn bộ nội dung của trang chủ.
 */
const Home = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = React.useState(false);

  // Restore scroll position on mount
  React.useEffect(() => {
    const savedScroll = sessionStorage.getItem('home-scroll-pos');
    if (savedScroll && scrollRef.current) {
      // Restore instantly before enabling smooth scroll
      scrollRef.current.scrollTop = parseInt(savedScroll, 10);
    }
    // Small delay to ensure the browser has finished the instant jump
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isReady) return; // Don't save if we're still initializing
    const target = e.currentTarget;
    sessionStorage.setItem('home-scroll-pos', target.scrollTop.toString());
  };

  return (
    <div className="relative w-full h-full bg-[#111214] selection:bg-white/20">

      {/* 1. Global Atmosphere (Fixed Background) */}
      <HomeBackground />

      {/* 2. Main Content Sections */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className={`relative z-10 w-full snap-y snap-mandatory h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar ${isReady ? 'scroll-smooth' : 'scroll-auto'}`}
      >
        {/* Section 1: Introduction */}
        <ChapterWeb />

        {/* Section 2: Social Nexus */}
        <ChapterSocial />

        {/* Section 3: Marketplace Hub */}
        <ChapterStore />
      </div>
    </div>
  );
};

export default Home;
