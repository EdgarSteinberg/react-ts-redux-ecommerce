import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { createOrderService } from "./service/orders_service";
import type { MongoCart } from "../../types/cart/mongoCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckOutForm from "./checkOutForm";
import { clearCart } from "../../features/cart/cartSlice";


type OrdersProps = {
    cart: MongoCart | null
}
type CheckoutOrder = {
    first_name: string;
    email: string;
};
const Orders = ({ cart }: OrdersProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [order, setOrder] = useState<CheckoutOrder>({
        first_name: "",
        email: "",
    });

    const user = useSelector((state: RootState) => state.auth.user);


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!user) {
                throw new Error("Usuario no autenticado");
            }
            const orderData = {
                email: order.email,
                cart: user.cart,
            };

            const createdOrder = await createOrderService(orderData);
            // 👆 ACÁ TENÉS EL ID
            toast.success("Orden creada con éxito 🧾");

            
            setOrder({ email: '', first_name: "" });
            
            dispatch(clearCart());
            localStorage.setItem('Cart', JSON.stringify([]));
            navigate(`/orders/${createdOrder._id}`);
        } catch (error) {
            console.error(error);
        }
    };

    //👉 El precio no está en el item, está dentro de product.
    const total = cart?.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0) ?? 0;

    return (
        <CheckOutForm handleSubmit={handleSubmit} handleOnChange={handleOnChange} order={order} total={total} />
    );
};

export default Orders;
