import type { Product } from "../../types/products";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import AppButton from "../appButton/appbutton";

interface ProductsCardProps {
    product: Product;
}

const ProductsCard = ({ product }: ProductsCardProps) => {
    const width = '100%';

    const getImageSrc = (image?: string) => {
        if (!image) return undefined;

        return image.startsWith("http")
            ? image
            : `http://localhost:8080/img/${image}`;
    };

    return (
        <div className={styles.itemContainer}>
            <Card className={styles.cardContainer}>

                <Card.Img
                    variant="top"
                    src={getImageSrc(product.mainImage?.[0])}
                    alt={product.title}
                    className={styles.imgContainer}
                />
                <Card.Body style={{ width: '100%' }}>
                    <Card.Title className={styles.title}>{product.title}</Card.Title>
                    <Card.Text className={styles.description}>
                        {product.shortDescription}
                    </Card.Text>
                    <Card.Text className={styles.cardPrice}> $ {product.price} </Card.Text>

                    <Link to={`/products/${product._id}`} style={{textDecoration: 'none'}}>
                        {/* <Button className={styles.cardBtn}>
                            Ver más
                        </Button> */}
                        <AppButton type={'button'} width={width}>
                            Ver más
                        </AppButton>
                    </Link>
                </Card.Body>
            </Card>

        </div>
    )
}

export default ProductsCard;