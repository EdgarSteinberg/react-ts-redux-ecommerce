/* import { ApiResponse } from "../../../types/products";
import type { MongoCart } from "../../types/cart/mongoCart"; */

const API_URL = `http://localhost:8080/api/carts`;

export const fetchDeleteProductInCart = async (cid: string, pid: string) => {
    const response = await fetch(`${API_URL}/${cid}/product/${pid}`, {
        method: 'DELETE',
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar el producto');
    }

    return data;
};


export const fetchGetCart = async (cid: string) => {
    const response = await fetch(`${API_URL}/${cid}`, {
        method: "GET",
        credentials: "include"
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el carrito')
    }

    return data;
}