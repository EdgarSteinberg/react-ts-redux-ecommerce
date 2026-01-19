import type { Product } from "../../types/products";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import styles from './styles.module.css'

interface ProductsCardProps {
    product: Product;
}

const ProductsCard = ({ product }: ProductsCardProps) => {

    const getImageSrc = (image?: string) => {
        if (!image) return undefined;

        return image.startsWith("http")
            ? image
            : `http://localhost:8080/img/${image}`;
    };

    return (
        <div className={styles.itemContainer}>
            <Card style={{ width: '18rem', display: 'flex', alignItems: 'center' }}>
                {/*  <Card.Img variant="top" src={product.mainImage?.[0]} alt={product.title} /> */}
                <Card.Img
                    variant="top"
                    src={getImageSrc(product.mainImage?.[0])}
                    alt={product.title}
                    className={styles.imgContainer}
                />
                <Card.Body style={{width: '100%'}}>
                    <Card.Title className={styles.description}>{product.title}</Card.Title>
                    <Card.Text className={styles.description}>
                        {product.shortDescription}
                    </Card.Text>
                    <Link to={`/products/${product._id}`}>
                        <Button variant="warning" style={{width: '100%'}}>
                            Ver más
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

        </div>
    )
}

export default ProductsCard;