import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../../store";


import Card from "react-bootstrap/Card";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./styles.module.css";

import type { ApiResponse } from "../../types/products";
import type { MongoCart } from "../../types/cart/mongoCart";

import { removeItem } from "../../features/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();

    const total = useSelector(
        (state: RootState) => state.cartReducer.total
    );

    // 🔧 ACÁ estaba el error principal
    const [cart, setCart] = useState<MongoCart | null>(null);

    const cid = "687e6bb659f847c04bfaee64";

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


    return (
        <>
            <h1>Carrito</h1>

            {cart?.products.map(item => (
                <div key={item.product._id}>
                    <Card>
                        <Card.Header>{item.product.title}</Card.Header>
                        <Card.Body className={styles.cardContainer}>
                            <Card.Img variant="top" src={item.product.mainImage?.[0]} alt={item.product.title} className={styles.img} />
                            <Card.Title>{item.product.shortDescription}</Card.Title>
                            <Card.Text>Cantidad: {item.quantity}</Card.Text>
                            <Card.Text>Precio unitario: {item.product.price}</Card.Text>
                            <Card.Text>Total: {item.quantity * item.product.price}</Card.Text>

                            <FaRegTrashAlt

                                onClick={() => deleteProduct(item.product._id)}
                            >
                                Eliminar
                            </FaRegTrashAlt>

                        </Card.Body>
                    </Card>
                </div >
            ))}

            <p>${total}</p>
        </>
    );
};

export default Cart;
