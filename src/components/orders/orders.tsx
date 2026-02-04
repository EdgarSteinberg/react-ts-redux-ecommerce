import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { createOrderService } from "./service/orders_service";
import type { MongoCart } from "../../types/cart/mongoCart";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type OrdersProps = {
    cart: MongoCart | null
}

const Orders = ({ cart }: OrdersProps) => {
    const navigate = useNavigate();

    const [order, setOrder] = useState({
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

            navigate(`/orders/${createdOrder._id}`);

            setOrder({ email: '', first_name: "" });

        } catch (error) {
            console.error(error);
        }
    };

    const total = cart?.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    return (
        <div style={{ backgroundColor: 'blue', padding: '7px', border: '1px', borderRadius: '7px' }}>
            <p style={{ color: 'white' }}>Card detalle</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel style={{ color: 'white' }}>Nombre</FormLabel>
                    <FormControl
                        name="first_name"
                        value={order.first_name}
                        onChange={handleOnChange}

                        placeholder="Nombre"
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel style={{ color: 'white' }}>Email</FormLabel>
                    <FormControl
                        name="email"
                        value={order.email}
                        onChange={handleOnChange}

                        placeholder="email"
                    />
                </FormGroup>
                <hr style={{ height: '0.5px', backgroundColor: '#fff', border: 'none', opacity: 1, marginBottom: '10px' }} />

                <div style={{ color: 'white', textAlign: 'right', fontSize: '14px' }}>
                    <div>Subtotal: ${total}</div>
                    <div style={{ opacity: 0.7 }}>Envío: Gratis</div>
                </div>
                <Button
                    type="submit"
                    style={{width: '100%',marginTop: '16px',display: 'flex',justifyContent: 'space-between',alignItems: 'center',fontWeight: 600}} >
                    <span>$ {total}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        CHECKOUT <BsArrowRight size={14} />
                    </span>
                </Button>

            </Form>
        </div>
    );
};

export default Orders;
