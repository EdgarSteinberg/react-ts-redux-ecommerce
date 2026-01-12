import { useState } from "react";
import type { Product } from "../types/products";

export type ProductFormData = Omit<Product, "_id" | "mainImage" | "tags"> & {
    tags: string[];       
    mainImage: File[];
};

const initialState: ProductFormData = {
    title: "", shortDescription: "", longDescription: "",
    price: 0, stock: 0, brand: "",
    category: "", discount: 0, tags: [],
    mainImage: []
};

type Message = {
    type: "success" | "error";
    text: string;
} | null;


export const useProductForm = (initialData?: ProductFormData) => {

    const [data, setData] = useState<ProductFormData>(initialData ?? initialState);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>(null);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setData(prev => ({
            ...prev,
            mainImage: Array.from(files)
        }));
    };

    return {
        data,
        setData,
        loading,
        setLoading,
        message,
        setMessage,
        handleOnChange,
        handleImageChange
    };
};
