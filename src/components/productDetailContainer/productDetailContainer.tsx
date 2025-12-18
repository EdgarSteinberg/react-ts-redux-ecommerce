import { useEffect, useState } from "react";
import type { Product, ApiResponse } from "../../types/products";
import { useParams } from "react-router-dom";
import Loading from "../loading/loading";
import ProductDetail from "./productDetail";

const ProductItemContainer = () => {
    const { pid } = useParams<{ pid: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pid) return;

        fetch(`http://localhost:8080/api/products/${pid}`)
            .then(res => res.json())
            .then((data: ApiResponse<Product>) => {
                setProduct(data.payload);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [pid]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                product && <ProductDetail product={product}/>
            )}
        </>
    );
};

export default ProductItemContainer;
