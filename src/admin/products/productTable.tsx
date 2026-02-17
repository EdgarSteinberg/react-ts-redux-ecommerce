import Table from 'react-bootstrap/Table';
import { Alert } from "react-bootstrap";
import type { Product } from '../../types/products';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";


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
        <div>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"} style={{textAlign: 'center'}}>
                    {message.text}
                </Alert>
            )}
            {products.length > 0 ? (
                <div
                    style={{
                        height: "calc(95vh - 120px)", // define “la pantalla”
                        display: "flex",
                        flexDirection: "column",
                        margin: "0 auto",
                        maxWidth: "1200px"
                    }}
                >
                    <h2 className="text-center mb-2">Panel de gestión de productos</h2>

                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",

                        }}
                    >
                        <Table striped bordered hover size="sm">
                            <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
                                <tr className="text-center">
                                    <th>Img</th>
                                    <th>Título</th>
                                    <th>Short</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Categoría</th>
                                    <th>Brand</th>
                                    <th>Tags</th>
                                    <th>Owner</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {products.map((pr) => (
                                    <tr key={pr._id} style={{ fontWeight: 'bold' }}>
                                        <td>
                                            <img src={pr.mainImage?.[0]} alt={pr.title}
                                                style={{ width: 50, height: 40, objectFit: "cover", borderRadius: 6 }} />
                                        </td>
                                        <td>{pr.title}</td>
                                        <td>{pr.shortDescription}</td>
                                        <td>${pr.price}</td>
                                        <td>{pr.stock}</td>
                                        <td>{pr.category}</td>
                                        <td>{pr.brand}</td>
                                        <td>{pr.tags?.join(", ")}</td>
                                        <td>{pr.owner === "admin" ? "Admin" : "Premium"}</td>
                                        <td>
                                            <Link to={`/admin/products/${pr._id}/edit`}>
                                                <FaEdit color="blue" />
                                            </Link>{" "}
                                            <FaRegTrashAlt color="red" style={{ cursor: "pointer" }} onClick={() => handleDelete(pr._id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>


                    </div>
                </div>
            ) : (
                <p>No hay productos</p>
            )}

        </div>
    )
}

export default ProductTable;