import { useState, useEffect } from "react";
import { getOrderService } from "./service/orders_service";
import type { GetOrderById as GetOrderByIdProps } from "../../types/orders"; // AS RENOMBRAS
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { currentUser } from "../auth/service/login";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../../features/auth/authSlice";
import styles from './styles.module.css';
import CheckOutCard from "./checkOutCard";

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
             /*    console.log(data) */
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
                <CheckOutCard order={order} variant="list"/>
            )
            }
        </>
    );
};

export default OrdersId;
