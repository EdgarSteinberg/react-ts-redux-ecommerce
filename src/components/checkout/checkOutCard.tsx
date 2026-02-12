import styles from './styles.module.css'
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import type { GetOrderById } from '../../types/orders';
import { Link } from 'react-router-dom';


type checkoutCardProps = {
    order: GetOrderById
 
}
const CheckOutCard = ({ order }: checkoutCardProps) => {


    return (
        <>
            <div className={styles.CheckOutCardByIdDivContainer}>
                <Card className={styles.CheckOutCardByIdContainer} >

                    <Card.Header>Orden #{order.code}</Card.Header>

                    <Card.Subtitle >
                        Fecha: {new Date(order.purchaseDateTime).toLocaleString()}
                    </Card.Subtitle>

                    <Card.Body>
                        <Card.Title>
                            Nombre: {order.purchaser.first_name}
                        </Card.Title>
                        <Card.Title>
                            Email: {order.purchaser.email}
                        </Card.Title>

                        {order.cart.map((item) => (
                            <Card.Text key={item._id}>
                                🛒 {item.product.title} x {item.quantity}
                            </Card.Text>
                        ))}

                        <Card.Text>
                            <strong>Monto:</strong>{" "}
                            {order.amount.toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS",
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <div className={styles.CheckOutCardByIdLinkContainer}>
                    <Link to={'/'} className={styles.CheckOutCardByIdLink}  >
                        <Button className={styles.orderDetailBtn}>Volver a la tienda</Button>
                    </Link>
                    <Link to={'/my-orders'} className={styles.CheckOutCardByIdLink}>
                        <Button className={styles.orderDetailBtn}>Ver mis órdenes</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CheckOutCard;