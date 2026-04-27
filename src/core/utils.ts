import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn (Class Name): Tiện ích hỗ trợ gộp các class CSS (Tailwind) một cách thông minh.
 * 
 * 1. clsx: Cho phép truyền các điều kiện để ẩn/hiện class (VD: { 'active': true }).
 * 2. twMerge: Giải quyết các xung đột giữa các class Tailwind (VD: 'p-2 p-4' sẽ gộp thành 'p-4').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
