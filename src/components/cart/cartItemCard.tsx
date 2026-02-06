import Card from "react-bootstrap/Card";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from './styles.module.css';
import type { MongoCart } from "../../types/cart/mongoCart";
import CheckOut  from '../checkout/checkOut';


type CartItemCardProps = {
    cart: MongoCart | null;
    deleteProduct: (id: string) => void;
};

const CartItemCard = ({ cart, deleteProduct }: CartItemCardProps) => {

    return (
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '0.5rem' }}>

            {/* COLUMNA DE PRODUCTOS */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                {cart?.products.map(item => (
                    <Card key={item.product._id} className={styles.card}>

                        {/* <Card.Header>{item.product.title}</Card.Header> */}
                        <Card.Body className={styles.cardContainer}>
                            <Card.Img variant="top" src={item.product.mainImage?.[0]} alt={item.product.title} className={styles.img} />

                            <Card.Title className={styles.ellipsis}>
                                {item.product.title}
                            </Card.Title>

                            <Card.Text style={{ margin: 0 }}>
                                Cantidad: {item.quantity}
                            </Card.Text>

                            <Card.Text style={{ margin: 0 }}>
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
            <div style={{ flex: 0.5, marginTop: '10px', border: '1px ' , borderRadius: ' 1px solid back' }}>
                <CheckOut cart={cart}/>
            </div>

        </div>

    )
}

export default CartItemCard;