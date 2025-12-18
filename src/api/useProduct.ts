import type { Product } from "../types/products";

export const createProduct = async (data: FormData) => {
  const res = await fetch("/api/products", {
    method: "POST",
    body: data
  });
  return res.json();
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE"
  });
  return res.json();
};
