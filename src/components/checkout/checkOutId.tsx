import { useState, useEffect } from "react";
import { getOrderService } from "./service/orders_service";
import type { GetOrderById as GetOrderByIdProps } from "../../types/orders"; // AS RENOMBRAS
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { currentUser } from "../auth/service/login";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../../features/auth/authSlice";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import styles from './styles.module.css';

const OrdersId = () => {
    const dispatch = useDispatch();
    const { oid } = useParams<{ oid: string }>();

    const [order, setOrder] = useState<GetOrderByIdProps | null>(null);

    useEffect(() => {
        if (!oid) return;

        const fetchOrder = async () => {
            try {
                const data = await getOrderService(oid);
                setOrder(data);
                console.log(data)
                // 🔁 sincronizar user
                const dataUser = await currentUser();
                dispatch(setUserRedux(dataUser.user));

            } catch (error) {
                toast.error("No se pudo obtener la orden");
            }
        };

        fetchOrder();
    }, [oid]);

    return (
        <>
            <h2 className={styles.CheckOutCardByIdTitle}>Resumen de tu compra</h2>
            {order && (
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
                            <Button variant="primary">Volver a la tienda</Button>
                        </Link>
                        <Link to={'/orders'} className={styles.CheckOutCardByIdLink}>
                            <Button variant="primary">Ver mis órdenes</Button>
                        </Link>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default OrdersId;
