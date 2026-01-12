import Table from 'react-bootstrap/Table';
import { Button, Alert } from "react-bootstrap";
import type { Product } from '../../types/products';
import { Link } from 'react-router-dom';


type Message = {
    type: "success" | "error";
    text: string;
};


interface ProductTableProps {
    products: Product[];
    message: Message | null;
    handleDelete: (id: string) => void;
}

const ProductTable = ({ message, products, handleDelete }: ProductTableProps) => {


    return (
        <>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"}>
                    {message.text}
                </Alert>
            )}
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
                                        <Button variant="danger" onClick={() => { handleDelete(pr._id) }}>Eliminar</Button>
                                        {/* <Button variant="secondary" as={Link} to={`/admin/products/${pr._id}/edit`}>Editar</Button> */}
                                        <Link to={`/admin/products/${pr._id}/edit`}>
                                            <Button variant="secondary">
                                                Editar
                                            </Button>
                                        </Link>
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

export default ProductTable;