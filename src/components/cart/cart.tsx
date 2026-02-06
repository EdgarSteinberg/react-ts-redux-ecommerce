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
import Loading from "../loading/loading";
import CartGuestCard from "./CartGuestCard";


const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [cart, setCart] = useState<MongoCart | null>(null);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            if (!cid) {
                throw new Error("Falta el ID del carrito");
            }

            const data = await fetchGetCart(cid);
            setCart(data.payload);
            /*      console.table(data.payload); */
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchCart()
    }, [cid]);

    if (loading) return <Loading />
    return (
        <>
            <h1 className={styles.cardTitle}>Tu Carrito 🛒</h1>

            {!cart ? (
                <CartGuestCard />
            )
                : cart.products.length > 0 ? (
                    <CartItemCart cart={cart} deleteProduct={deleteProduct} />
                )
                    : (
                        <h1 className={styles.cardTitle}>El carrito no contiene productos</h1>
                    )}
        </>

    );
};

export default Cart;