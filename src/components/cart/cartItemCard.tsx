import Card from "react-bootstrap/Card";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from './styles.module.css';
import type { MongoCart } from "../../types/cart/mongoCart";
import CheckOut from '../checkout/checkOut';


type CartItemCardProps = {
    cart: MongoCart | null;
    deleteProduct: (id: string) => void;
};

const CartItemCard = ({ cart, deleteProduct }: CartItemCardProps) => {

    return (
        <div className={styles.cardItemContainer}>

            {/* COLUMNA DE PRODUCTOS */}
            <div className={styles.cardItem}>

                {cart?.products.map(item => (
                    <Card key={item.product._id} className={styles.card}>


                        <Card.Body className={styles.cardContainer}>
                            <Card.Img variant="top" src={item.product.mainImage?.[0]} alt={item.product.title} className={styles.img} />

                            <Card.Title className={styles.ellipsis}>
                                {item.product.title}
                            </Card.Title>

                            <Card.Text className={styles.ellipsis}>
                                Cantidad: {item.quantity}
                            </Card.Text>

                            <Card.Text className={styles.ellipsis}>
                                <strong>$ {item.product.price}</strong>
                            </Card.Text>

                            <FaRegTrashAlt color="red" style={{ cursor: "pointer" }}
                                onClick={() => deleteProduct(item.product._id)}
                            />
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* CHECKOUT */}
            <div className={styles.checkout}>
                <CheckOut cart={cart} />
            </div>

        </div>

    )
}

export default CartItemCard;