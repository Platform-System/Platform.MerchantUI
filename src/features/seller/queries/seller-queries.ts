/**
 * seller-queries.ts
 *
 * Data-access layer cho seller feature.
 * Tất cả hooks và components PHẢI import seller data từ đây — không import trực tiếp từ shared/lib/data.
 *
 * Khi backend sẵn sàng: swap các hàm mock bên dưới bằng API calls thật (axios/fetch).
 * Layer hooks/screens bên trên không cần thay đổi.
 */

import { popularSellers, sellerStats } from "@/shared/lib/data"
import { Seller } from "@/types/store"

import { apiClient } from "@/shared/api/api-client"

/** Trả về tất cả sellers. Gọi GET /api/sellers, fallback sang mock nếu lỗi. */
export async function fetchAllSellers(): Promise<Seller[]> {
  try {
    const response = await apiClient.get<Seller[]>("/api/store/stores");
    return response.data;
  } catch (error) {
    console.warn("Lỗi gọi API Sellers, fallback dùng mock data:", error);
    return popularSellers
  }
}

/** Tìm seller theo slug. Gọi GET /api/sellers/:slug, fallback sang mock nếu lỗi. */
export async function fetchSellerBySlug(slug: string): Promise<Seller | undefined> {
  try {
    const response = await apiClient.get<Seller>(`/api/store/stores/${slug}`);
    return response.data;
  } catch (error) {
    console.warn(`Lỗi gọi API cho seller ${slug}, fallback dùng mock data:`, error);
    return popularSellers.find((s) => s.slug === slug)
  }
}

/** Trả về seller stats cho trang CTA (mock). Giữ nguyên mock hoặc gọi API nếu có. */
export async function fetchSellerStats(): Promise<{ label: string; value: string }[]> {
  return sellerStats
}

/** Query keys dùng với TanStack Query. */
export const sellerQueryKeys = {
  all: ["sellers"] as const,
  detail: (slug: string) => ["sellers", slug] as const,
  stats: ["sellers", "stats"] as const,
}
