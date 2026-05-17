/**
 * seller-queries.ts
 *
 * Data-access layer cho seller feature.
 * Tất cả hooks và components PHẢI import seller data từ đây — không import trực tiếp từ shared/lib/data.
 *
 * Khi backend sẵn sàng: swap các hàm mock bên dưới bằng API calls thật (axios/fetch).
 * Layer hooks/screens bên trên không cần thay đổi.
 */

import { Seller } from "@/types/store"
import { apiClient, publicApiClient } from "@/shared/api/api-client"
import { Result, PagedResult } from "@/types/api"

/** Trả về tất cả sellers. Gọi GET /api/sellers. */
export async function fetchAllSellers(): Promise<Seller[]> {
  try {
    const response = await publicApiClient.get<Result<PagedResult<Seller>>>("/api/store/stores", {
      params: {
        page: 1,
        pageSize: 50,
      },
    });
    
    // Xử lý cấu trúc Result từ Backend
    if (response.data && response.data.success && response.data.data) {
      return response.data.data.items || [];
    }

    return [];
  } catch (error) {
    console.error("Lỗi gọi API Stores:", error);
    return []
  }
}

/** Tìm seller theo slug. Gọi GET /api/sellers/:slug. */
export async function fetchSellerBySlug(slug: string): Promise<Seller | undefined> {
  try {
    const response = await publicApiClient.get<Result<Seller>>(`/api/store/stores/${slug}`);
    
    // Xử lý cấu trúc Result từ Backend
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }

    return undefined;
  } catch (error) {
    console.error(`Lỗi gọi API cho store ${slug}:`, error);
    return undefined
  }
}

/** Trả về seller stats (trống nếu không có data). */
export async function fetchSellerStats(): Promise<{ label: string; value: string }[]> {
  return []
}

/** Query keys dùng với TanStack Query. */
export const sellerQueryKeys = {
  all: ["sellers"] as const,
  detail: (slug: string) => ["sellers", slug] as const,
  stats: ["sellers", "stats"] as const,
}

export interface CreateStoreRequest {
  name: string;
  description?: string;
  tagline?: string;
  location?: string;
  responseTime?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  shippingPolicy?: string;
  returnPolicy?: string;
  warrantyPolicy?: string;
}

/** Tạo store mới (Become Seller). Gọi POST /api/store/manage/stores. */
export async function createStore(request: CreateStoreRequest): Promise<Result<unknown>> {
  const response = await apiClient.post<Result<unknown>>("/api/store/manage/stores", request);
  return response.data;
}

