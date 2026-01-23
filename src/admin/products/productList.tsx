import { useEffect, useState } from "react"
import type { Product } from "../../types/products"
import { getProducts, deleteProduct } from "../service/product_service";
import Loading from "../../components/loading/loading";
import ProductTable from "./productTable";
import Swal from "sweetalert2";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    type Message = { type: "success" | "error"; text: string; };
    const [message, setMessage] = useState<Message | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;
        try {
            await deleteProduct(id);

            setProducts(prev =>
                prev.filter(product => product._id !== id)
            );

            setMessage({
                type: "success",
                text: "Producto eliminado correctamente"
            });
        } catch (error: any) {
            setMessage({
                type: "error",
                text: error.message ? `${error.message}` : `Error al eliminar el producto`
            });
        }
    };

    
    if (loading) return <Loading />
    if (error) return <p>{error}</p>;

    return (
        <>
            <ProductTable products={products} message={message} handleDelete={handleDelete} />
        </>
    )
}

export default ProductList;