import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../../store";
import styles from './styles.module.css';

import type { ApiResponse } from "../../types/products";
import type { MongoCart } from "../../types/cart/mongoCart";

import { removeItem } from "../../features/cart/cartSlice";
import CartItemCart from "./cartItemCard";



const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();

    /*  const total = useSelector((state: RootState) => state.cartReducer.total);
     console.log(total) */
    const [cart, setCart] = useState<MongoCart | null>(null);

    const cid = "69614fb4e1257780b08c2e6d";

    const deleteProduct = async (id: string) => {
        dispatch(removeItem(id));
        apiRemoveItem(id);
    };

    const apiRemoveItem = async (pid: string) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/carts/${cid}/product/${pid}`,
                { method: "DELETE" }
            );
            const data = await response.json();
            console.log(data.payload);
            fetchCart()
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/carts/${cid}`
            );
            const data: ApiResponse<MongoCart> = await response.json();
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
    const total = cart?.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0) ?? 0;

    return (
        <>
            <h1 className={styles.cardTitle}>Carrito 🛒</h1>

            <CartItemCart cart={cart} deleteProduct={deleteProduct} />

            <h2 className={styles.cardTitle} style={{color: 'green'}}>Total de la compra: ${total}</h2>
        </>
    );
};

export default Cart;
