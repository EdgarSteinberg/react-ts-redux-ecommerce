import type { Product } from "../../types/products";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Counter from "../counter/counter";

import { addItems } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useCounter } from "../../hooks/useCounter";
import { useNavigate } from "react-router-dom";


interface ProductItemProps {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { count, increment, decrement } = useCounter(1, product.stock);

    const cartId = `687e6bb659f847c04bfaee64`;
    const handleAddToCart = async () => {
        dispatch(addItems({ product, quantity: count }));
        await addProductInCart(cartId, product._id, count);
        alert("Producto agregado al carrito");
        navigate("/cart");
    };


    const addProductInCart = async (
        cid: string,
        pid: string,
        quantity: number
    ) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/carts/${cid}/product/${pid}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity }),
                }
            );

            const data = await response.json();
            console.log("Producto agregado al carrito:", data.payload);

        } catch (error) {
            console.error(error);
        }
    };

    // Devuelve la URL correcta de la imagen (externa o local)
    const getImageSrc = (image?: string) => {
        if (!image) return undefined;

        return image.startsWith("http")
            ? image
            : `http://localhost:8080/img/${image}`;
    };


    return (
        <>
            <Card style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
                <div style={{ flex: 1 }}>

                    {/* <Card.Img variant="top" src={product.mainImage?.[0]} alt={product.title} /> */}
                    <Card.Img
                        variant="top"
                        src={getImageSrc(product.mainImage?.[0])}
                        alt={product.title}
                    />
                </div>
                <div style={{ flex: 1 }}>

                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Subtitle >{product.longDescription} </Card.Subtitle >
                        <Card.Text>Precio: ${product.price} </Card.Text>
                        <Card.Text>Stock {product.stock} </Card.Text>
                        <Card.Text>Marca: {product.brand}</Card.Text>
                        <Card.Text>Categoría: {product.category}</Card.Text>
                        {product.discount && (
                            <Card.Text>Descuento: {product.discount}%</Card.Text>
                        )}
                        <Card.Text>
                            Tags:
                            {product.tags?.map((tag, index) => (
                                <span key={index}> {tag}</span>
                            ))}
                        </Card.Text>

                        <Counter
                            count={count}
                            increment={increment}
                            decrement={decrement}
                        />

                        <Button variant="success" onClick={handleAddToCart} >comprar</Button>
                    </Card.Body>
                </div>
            </Card>
        </>
    );
};

export default ProductItem;
