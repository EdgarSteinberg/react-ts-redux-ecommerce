import styles from './styles.module.css'
import Card from 'react-bootstrap/Card';
import type { GetOrderById } from '../../types/orders';
import { Link } from 'react-router-dom';
import AppButton from '../appButton/appbutton';



type checkoutCardProps = {
    order: GetOrderById
    variant?: "detail" | "list";
}
const CheckOutCard = ({ order, variant }: checkoutCardProps) => {
    const width = '100%';
    console.log(order);
    return (
        <>

            <div className={variant === 'list' ? styles.CheckOutCardByIdDivContainer : styles.CheckOutCardByIdDivContainerDetail}>
                <Card className={styles.CheckOutCardByIdContainer} >

                    <Card.Header>Orden #{order.code}</Card.Header>
                    <Card.Subtitle >
                        Fecha: {new Date(order.purchaseDateTime).toLocaleString()}
                    </Card.Subtitle>

                    <Card.Body>
                        {/* Comprados */}
                        <Card.Title>
                            Nombre: {order.purchaser.first_name}
                        </Card.Title>
                        <Card.Title>
                            Email: {order.purchaser.email}
                        </Card.Title>

                        {/*Items */}
                        {order.cart.map((item) => (
                            <div style={{display: 'flex', gap: '10px'}}> 
                                <Card.Text key={item._id}>
                                    🛒 {item.product.title} x {item.quantity}
                                </Card.Text>
                                <Card.Img variant='top' src={item.product.mainImage} alt={item.product.title} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                            </div>

                        ))}
                        {/* Total */}
                        <Card.Text>
                            <strong>Monto:</strong>{" "}
                            {order.amount.toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS",
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>

                {
                    variant === 'list' && (
                        <div className={styles.CheckOutCardByIdLinkContainer}>
                            <Link to={'/'} className={styles.CheckOutCardByIdLink}  >
                                {/* <Button className={styles.orderDetailBtn}>Volver a la tienda</Button> */}
                                <AppButton type={'button'} width={width}>
                                    Volver a la tienda
                                </AppButton>
                            </Link>
                            <Link to={'/my-orders'} className={styles.CheckOutCardByIdLink}>
                                {/* <Button className={styles.orderDetailBtn}>Ver mis órdenes</Button> */}
                                <AppButton type={'button'} width={width}>
                                    Ver mis compras
                                </AppButton>
                            </Link>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default CheckOutCard;