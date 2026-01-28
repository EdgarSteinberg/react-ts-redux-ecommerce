// services/fetchingProducts.ts
import type { ApiResponse, Product } from "../../../../types/products";

export const getProductService = async (pid: string): Promise<ApiResponse<Product>> => {
    const response = await fetch(
        `http://localhost:8080/api/products/${pid}`,
        { method: "GET" }
    );

    if (!response.ok) {
        throw new Error("Error en el fetching del producto");
    }

    const data = await response.json();
    return data;
};
