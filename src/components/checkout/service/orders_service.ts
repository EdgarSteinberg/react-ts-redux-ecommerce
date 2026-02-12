import type { CreateOrder, GetOrderById } from "../../../types/orders";

const API_URL = "http://localhost:8080/api/orders";

type ApiResponse<T> = {
    status: "success" | "error";
    payload: T;
    message?: string;
};

export const createOrderService = async (orderData: CreateOrder) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    const data: ApiResponse<GetOrderById> = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error creating order");
    }

    return data.payload;
};

export const getOrderService = async (oid: string): Promise<GetOrderById> => {
    const response = await fetch(`${API_URL}/${oid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data: ApiResponse<GetOrderById> = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error fetching order");
    }

    return data.payload;
};


export const getUserOrder = async () => {
    const response = await fetch(`${API_URL}/my-orders`, {
        method: "GET",
        credentials: "include"
    });

    const data: ApiResponse<GetOrderById[]> = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error fetching orders");
    }

    return data.payload;
};