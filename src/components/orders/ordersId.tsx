import { useState, useEffect } from "react";
import { getOrderService } from "./service/orders_service";
import type { GetOrderById as GetOrderByIdProps } from "../../types/orders"; // AS RENOMBRAS
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { currentUser } from "../auth/service/login";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../../features/auth/authSlice";

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
            {order && (
                <>
                    <p>Código: {order.code}</p>
                    <p>Total: ${order.amount}</p>
                    <p>Fecha: {order.purchaseDateTime}</p>
                </>
            )}
        </>
    );
};

export default OrdersId;
