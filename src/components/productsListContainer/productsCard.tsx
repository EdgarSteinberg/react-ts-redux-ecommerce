import type { Product } from "../../types/products";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


interface ProductsCardProps {
    product: Product;
}

const ProductsCard = ({ product }: ProductsCardProps) => {

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.mainImage?.[0]} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.shortDescription}
                    </Card.Text>
                    <Link to={`/products/${product._id}`}>
                        <Button variant="primary">
                            Ver más
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

        </>
    )
}

export default ProductsCard;