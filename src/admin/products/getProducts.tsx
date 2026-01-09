import { useEffect, useState } from "react"
import type { Product } from "../../types/products"
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { getProducts } from "../service/product_service";
import Loading from "../../components/loading/loading";

const GetProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


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

    if (loading) return <Loading />
    if (error) return <p>{error}</p>;

    return (
        <>
            {
                products.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((pr, index) => (
                                <tr key={pr._id}>
                                    <td>{index + 1}</td>
                                    <td>{pr.title}</td>
                                    <td>${pr.price}</td>
                                    <td>{pr.stock}</td>
                                    <td>{pr.category}</td>
                                    <td>
                                        <Button variant="danger">Eliminar</Button>
                                        <Button variant="secondary">Editar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                ) : (
                    <p>No hay productos para mostrar</p>
                )
            }
        </>
    )
}

export default GetProducts;