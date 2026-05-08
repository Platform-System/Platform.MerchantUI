/**
 * product-queries.ts
 *
 * Data-access layer for products.
 * All hooks MUST import product data from HERE — never import from shared/lib/data directly.
 *
 * When backend is ready, swap the mock implementations below with real API calls (axios/fetch).
 * The hooks layer (use-product-detail.ts, etc.) does NOT need to change.
 */

import { featuredProducts, trendingProducts, newArrivals } from "@/shared/lib/data";
import { Product } from "@/types/store";
import { apiClient } from "@/shared/api/api-client";

/** Trả về toàn bộ product pool. Gọi GET /api/catalog/products từ gateway, fallback sang mock nếu lỗi. */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<Product[]>("/api/catalog/products");
    return response.data;
  } catch (error) {
    console.warn("Lỗi gọi API, fallback dùng mock data:", error);
    return [...featuredProducts, ...trendingProducts, ...newArrivals];
  }
}

/** Tìm một product theo id. Gọi GET /api/catalog/products/:id, fallback sang mock nếu lỗi. */
export async function fetchProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await apiClient.get<Product>(`/api/catalog/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`Lỗi gọi API cho sản phẩm ${id}, fallback dùng mock data:`, error);
    const all = await fetchAllProducts();
    return all.find((p) => p.id === id);
  }
}

/** Query keys dùng với TanStack Query — đảm bảo cache invalidation nhất quán. */
export const productQueryKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
};
