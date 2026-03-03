import Table from 'react-bootstrap/Table';
import { Alert } from "react-bootstrap";
import type { Product } from '../../types/products';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import styles from './styles.module.css';
import Card from 'react-bootstrap/Card';

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
                <Alert
                    variant={message.type === "success" ? "success" : "danger"}
                    className={styles.alertCenter}
                >
                    {message.text}
                </Alert>
            )}

            <div className={styles.definoPantalla}>
                <h2 className="text-center mb-3">Panel de gestión de productos</h2>

                {products.length === 0 && (
                    <p className="text-center">No hay productos</p>
                )}

                {products.length > 0 && (
                    <>
                        {/* 🔥 TABLA SOLO DESKTOP XL+ */}
                        <div className={`d-none d-xl-block ${styles.scroll}`}>
                            <Table striped bordered hover size="sm">
                                <thead
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        background: "#fff",
                                        zIndex: 1
                                    }}
                                >
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
                                                <img
                                                    src={pr.mainImage?.[0]}
                                                    alt={pr.title}
                                                    style={{
                                                        width: 50,
                                                        height: 40,
                                                        objectFit: "cover",
                                                        borderRadius: 6
                                                    }}
                                                />
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
                                                <FaRegTrashAlt
                                                    color="red"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(pr._id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        {/* 🔥 CARDS SOLO MOBILE Y TABLET */}
                        <div className="d-xl-none">
                            {products.map(pr => (
                                <Card key={pr._id} className="mb-3 shadow-sm">
                                    <div className="d-flex gap-3 p-3">
                                        <img
                                            src={pr.mainImage?.[0]}
                                            alt={pr.title}
                                            style={{
                                                width: 90,
                                                height: 80,
                                                objectFit: "cover",
                                                borderRadius: 8
                                            }}
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">{pr.title}</h6>
                                            <p className="mb-1 fw-bold">${pr.price}</p>
                                            <small>Stock: {pr.stock}</small>
                                            <br />
                                            <small>
                                                {pr.category} • {pr.brand}
                                            </small>
                                            <br />
                                            <small>
                                                {pr.owner === "admin" ? "Admin" : "Premium"}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end gap-3 px-3 pb-3">
                                        <Link to={`/admin/products/${pr._id}/edit`}>
                                            <FaEdit color="blue" />
                                        </Link>
                                        <FaRegTrashAlt
                                            color="red"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDelete(pr._id)}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductTable;