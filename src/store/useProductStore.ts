import { create } from "zustand";
import type { Product } from "../types/product";
import { fetchProducts as fetchProductsApi } from "../api/products";
// useProductStore.ts
export type SortField = "title" | "price" | "stock";
export type SortOrder = "asc" | "desc";

// Вот тут — два новых "именованных типа", их пишем ДО интерфейса
// type SortField = "title" | "price" | "stock";
// type SortOrder = "asc" | "desc";

interface ProductStore {
  products: Product[];
  total: number;
  page: number;
  sortBy: SortField; // ← раньше тут был длинный список строк, теперь просто имя типа
  order: SortOrder; // ← раньше "asc" | "desc", теперь имя типа
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  setPage: (page: number) => void;
  setSort: (sortBy: SortField, order: SortOrder) => void; // ← вместо string, string
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  total: 0,
  page: 1,
  sortBy: "title",
  order: "asc",
  loading: true,
  error: null,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchProductsApi({
        limit: 12,
        skip: (get().page - 1) * 12,
        sortBy: get().sortBy,
        order: get().order,
      });
      set({ products: data.products, total: data.total, loading: false });
    } catch (err) {
      set({ error: "Не удалось загрузить товары", loading: false });
    }
  },

  setPage: (page) => {
    set({ page });
    get().fetchProducts();
  },

  setSort: (sortBy, order) => {
    set({ sortBy, order });
    get().fetchProducts();
  },
}));
