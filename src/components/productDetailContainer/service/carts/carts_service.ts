import type { ApiResponse } from "../../../../types/products";


export const postFetchCartAddProduct = async (cid: string, pid: string, quantity: number): Promise<ApiResponse<unknown>> => {
    const response = await fetch(
        `http://localhost:8080/api/carts/${cid}/product/${pid}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
        }
    );

    if (!response.ok) {
        throw new Error("Error al agregar producto al carrito");
    }

    return response.json();
};
