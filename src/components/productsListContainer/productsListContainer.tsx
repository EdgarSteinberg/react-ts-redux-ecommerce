import { useEffect, useState } from "react";
import type { Product, ApiResponse } from "../../types/products";
import Loading from "../loading/loading";
import { useParams } from "react-router-dom";
import ProductsList from "./productsList";

const ProductsContainer = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]); //uso ts

    const { category } = useParams<{ category?: string }>();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const uri = category
                    ? `http://localhost:8080/api/products/categories?category=${category}`
                    : "http://localhost:8080/api/products";
                    
                const response = await fetch(uri);
                const data: ApiResponse<Product[]> = await response.json(); //uso ts
      
                setProducts(data.payload);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [category]);

    if (loading) return <Loading />
    return (
        <>
            <ProductsList products={products} />
        </>
    );
};

export default ProductsContainer;
