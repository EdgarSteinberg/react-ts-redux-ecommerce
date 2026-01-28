import { useEffect, useState } from "react";
import type { Product } from "../../types/products";
import { useParams } from "react-router-dom";
import Loading from "../loading/loading";
import ProductDetail from "./productDetail";
import { getProductService } from "./service/products/products_service";

const ProductDetailContar = () => {
    const { pid } = useParams<{ pid: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!pid) return;

        const loadProduct = async () => {
            try {
                const data = await getProductService(pid); // SERVICES
                setProduct(data.payload);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };
        loadProduct();
    }, [pid]);


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                product && <ProductDetail product={product} />
            )}
        </>
    );
};

export default ProductDetailContar;
