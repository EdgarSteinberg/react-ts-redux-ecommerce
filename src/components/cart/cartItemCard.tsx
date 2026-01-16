import Card from "react-bootstrap/Card";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from './styles.module.css';
import type { MongoCart } from "../../types/cart/mongoCart";


type CartItemCardProps = {
    cart: MongoCart | null;
    deleteProduct: (id: string) => void;
};

const CartItemCard = ({ cart, deleteProduct }: CartItemCardProps) => {

    return (
        <>
            {cart?.products.map(item => (
                <div key={item.product._id}>
                    <Card className={styles.card}>
                        <Card.Header>{item.product.title}</Card.Header>
                        <Card.Body className={styles.cardContainer}>
                            <Card.Img variant="top" src={item.product.mainImage?.[0]} alt={item.product.title} className={styles.img} />

                            <Card.Title  className={styles.ellipsis}>{item.product.shortDescription}</Card.Title>
                            <Card.Text style={{ margin: '0',}}>Cantidad: {item.quantity}</Card.Text>
                            <Card.Text style={{ margin: '0' }}>Precio unitario: $:{item.product.price}</Card.Text>
                            <Card.Text style={{ margin: '0'}}>Total: ${item.quantity * item.product.price}</Card.Text>

                            <FaRegTrashAlt color="red" size={18}
                                style={{ cursor: "pointer", margin: '0 ' }}
                                onClick={() => deleteProduct(item.product._id)}
                            />

                        </Card.Body>
                    </Card>
                </div >
            ))}
        </>
    )
}

export default CartItemCard;