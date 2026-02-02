import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../../store";
import styles from './styles.module.css';

import type { MongoCart } from "../../types/cart/mongoCart";

import { removeItem } from "../../features/cart/cartSlice";
import CartItemCart from "./cartItemCard";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { fetchDeleteProductInCart, fetchGetCart } from "./service/cart_service";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [cart, setCart] = useState<MongoCart | null>(null);

    const user = useSelector((state: RootState) => state.auth.user)
    const cid = user?.cart;

    const deleteProduct = async (id: string) => {
        dispatch(removeItem(id));
        apiRemoveItem(id);
    };


    const apiRemoveItem = async (pid: string) => {
        try {
            if (!cid) {
                throw new Error("Falta el ID del carrito");
            }

            const data = await fetchDeleteProductInCart(cid, pid);
            console.log("Producto eliminado:", data.payload);

            fetchCart(); // refresca carrito
        } catch (error: any) {
            console.error("Error eliminando producto:", error.message || error);
        }
    };


    const fetchCart = async () => {
        try {
            if (!cid) {
                throw new Error("Falta el ID del carrito");
            }

            const data = await fetchGetCart(cid);
            setCart(data.payload);
            console.table(data.payload);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCart()
    }, [cid]);

    //👉 El precio no está en el item, está dentro de product.
    // const total = cart?.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0) ?? 0;

    return (
        <>
            <h1 className={styles.cardTitle}>Tu Carrito 🛒</h1>

            {!cart ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>

                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Tu carrito está esperando 🛒</Card.Title>
                            <Card.Text>
                                Iniciá sesión para ver tus productos y finalizar la compra.
                            </Card.Text>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button variant="primary" style={{ width: '100%' }}>
                                    Iniciar sesión
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>

                </div>
            ) : cart.products.length > 0 ? (
                <CartItemCart cart={cart} deleteProduct={deleteProduct} />
            ) : (
                <h1 style={{ textAlign: 'center' }}>El carrito no contiene productos</h1>
            )}
        </>

    );
};

export default Cart;