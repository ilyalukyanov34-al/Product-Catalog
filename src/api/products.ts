import axios from "axios";
import type { ProductsResponse, Product } from "../types/product";
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

interface FetchProductsParams {
  limit: number;
  skip: number;
  sortBy?: "title" | "price" | "stock";
  order?: "asc" | "desc";
}

export async function fetchProducts(
  params: FetchProductsParams,
): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products", {
    params: params,
  });
  return response.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}
