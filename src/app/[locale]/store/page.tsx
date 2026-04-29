'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';

/**
 * StoreHome: Redirects to the Collection page (/store/home) since the intro content 
 * has been moved to the root homepage.
 */
export default function StoreHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/store/home');
  }, [router]);

  return null;
}
