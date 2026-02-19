import { useEffect, useState } from "react"
import type { GetOrderById } from "../../types/orders"
import { getUserOrder } from "./service/orders_service";
import CheckOutCard from "./checkOutCard";
import Loading from "../loading/loading";
import styles from './styles.module.css';

const MyOrders = () => {
    const [orders, setOrders] = useState<GetOrderById[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getUserOrder();
            setOrders(data);
            setLoading(false)
        };

        fetchOrders();
    }, []);



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h2 style={{ textAlign: 'center' }}>Mis órdenes</h2>
                    <div className={styles.ordersGrid}>
                        {orders.map(order => (
                            <CheckOutCard
                                key={order._id}
                                order={order}
                                variant={"detail"}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};


export default MyOrders