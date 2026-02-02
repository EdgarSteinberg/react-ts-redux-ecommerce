import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { createOrderService } from "./service/orders_service";
import type { MongoCart } from "../../types/cart/mongoCart";
import { BsArrowRight } from "react-icons/bs";

type OrdersProps = {
    cart: MongoCart | null
}

const Orders = ({ cart }: OrdersProps) => {
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

            await createOrderService(orderData);
            alert('order creada!')

            setOrder({ email: '', first_name: "" })
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
                <hr style={{width: '100%', color: 'white'}}/>
                <Button type="submit" style={{ width: '100%', marginTop: '16px'}}>${total} CHECKOUT <BsArrowRight size={14}/></Button>
            </Form>
        </div>
    );
};

export default Orders;
