'use client';

import React from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import ContactSidebar from '@/components/layout/ContactSidebar';
import NewsFeed from '@/features/social/components/NewsFeed';

export default function SocialPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pb-12 flex justify-between">
      <LeftSidebar />
      <NewsFeed />
      <ContactSidebar />
    </main>
  );
}
