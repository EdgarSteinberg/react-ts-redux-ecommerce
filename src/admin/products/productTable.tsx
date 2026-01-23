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
            <h1 style={{ textAlign: 'center' }}>Panel de gestión de productos</h1>
            {
                products.length > 0 ? (
                    <Table striped bordered hover>

                        <thead>
                            <tr  style={{textAlign: 'center'}}>
                                <th>#</th>
                                <th>Título</th>
                                <th>ShortDescription</th>
                                <th>LongDescription</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Brand</th>
                                <th>Tags</th>
                                <th>Owner</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody  style={{textAlign: 'center'}}>
                            {products.map((pr, index) => (
                                <tr key={pr._id}>
                                    <td>{index + 1}</td>
                                    <td>{pr.title}</td>
                                    <td>{pr.shortDescription}</td>
                                    <td>{pr.longDescription}</td>
                                    <td>${pr.price}</td>
                                    <td>{pr.stock}</td>
                                    <td>{pr.category}</td>
                                    <td>{pr.brand}</td>
                                    <td>{pr.tags}</td>

                                    <td>
                                        {pr.owner === 'admin' ? 'Administrador' : "Premium"}
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => { handleDelete(pr._id) }}  style={{width: '100%'}}>Eliminar</Button>
                                        {/* <Button variant="secondary" as={Link} to={`/admin/products/${pr._id}/edit`}>Editar</Button> */}
                                        <Link to={`/admin/products/${pr._id}/edit`}>
                                            <Button variant="secondary"  style={{width: '100%'}}>
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