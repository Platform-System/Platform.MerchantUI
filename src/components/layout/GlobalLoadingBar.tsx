'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * GlobalLoadingBar: Thanh tiến trình (loading bar) toàn cục chạy trên mép đỉnh màn hình.
 * Mục đích: Cung cấp phản hồi thị giác khi người dùng chuyển trang hoặc hệ thống đang xử lý dữ liệu ngầm.
 */
export const GlobalLoadingBar = ({ isPending }: { isPending?: boolean }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Kích hoạt loading khi isPending từ useTransition truyền xuống
  // HOẶC khi pathname thay đổi (phòng hờ cho các điều hướng khác)
  useEffect(() => {
    if (isPending) {
        setTimeout(() => setLoading(true), 0);
    } else {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }
  }, [isPending, pathname]);

  if (!loading && !isPending) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div 
        className="h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-progress-fast"
        style={{ width: isPending ? '70%' : '100%', transition: 'width 0.4s ease-out' }}
      />
    </div>
  );
};
