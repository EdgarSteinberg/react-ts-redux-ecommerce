import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import type { Product } from '../../types/products';

interface CardProductsProps {
    products: Product[];
    handleDelete: (id: string) => void;
}

const CardProduct = ({ products, handleDelete }: CardProductsProps) => {

    return (
        <div className="d-xl-none d-flex gap-3 justify-content-center align-items-center flex-wrap mx-auto" style={{ maxWidth: "1100px" }}>
            {products.map(pr => (
                <div style={{ width: '16rem' }} key={pr._id} >
                    <Card className="mb-3 shadow-sm d-flex justify-content-center align-items-center">

                        <Card.Img
                            src={pr.mainImage?.[0]}
                            alt={pr.title}
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover"
                            }}
                        />

                        <Card.Body style={{ minWidth: "16rem" }}>
                            <Card.Title>{pr.title}</Card.Title>

                            <Card.Text>
                                <strong>Precio:</strong> ${pr.price} <br />
                                <strong>Stock:</strong> {pr.stock} <br />
                                <strong>Categoría:</strong> {pr.category} <br />
                                <strong>Marca:</strong> {pr.brand} <br />
                                <strong>Tags:</strong> {pr.tags?.join(', ')} <br />
                                <strong>Owner:</strong>{" "}
                                {pr.owner === "admin" ? "Admin" : "Premium"}
                            </Card.Text>

                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <Link to={`/admin/products/${pr._id}/edit`}>
                                    <FaEdit color="blue" />
                                </Link>

                                <FaRegTrashAlt
                                    color="red"
                                    style={{ cursor: "pointer", marginTop: '5px' }}
                                    onClick={() => handleDelete(pr._id)}
                                />
                            </div>
                        </Card.Body>

                    </Card>
                </div>
            ))}

        </div>
    );
};

export default CardProduct;