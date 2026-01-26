import type { Product } from "../../types/products";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Counter from "../counter/counter";
import styles from './styles.module.css'

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

    const cartId = `69614fb4e1257780b08c2e6d`;

    const handleAddToCart = async () => {
        dispatch(addItems({ product, quantity: count }));
        await addProductInCart(cartId, product._id, count);
        alert("Producto agregado al carrito");
        navigate("/cart");
    };


    const addProductInCart = async (cid: string, pid: string, quantity: number) => {
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
        <div className={styles.divContainer}>
            <Card style={{ display: 'flex', flexDirection: 'row', maxWidth: '90%', alignItems: "center", gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <Card.Img variant="top" src={getImageSrc(product.mainImage?.[0])} alt={product.title} className={styles.imgContainer} />
                </div>

                <div style={{ flex: 1 }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '22px' }}>{product.longDescription}</Card.Title>
                        {/*       <Card.Subtitle >{product.longDescription} </Card.Subtitle > */}
                        <Card.Text style={{ fontSize: '36px' }}>$ {product.price} </Card.Text>
                        <Card.Subtitle style={{ fontSize: '14px' }}>Lo que tenés que saber de este producto</Card.Subtitle>

                        <ul>
                            <li style={{ fontSize: '14px', marginTop: '8px' }}>Stock {product.stock}</li>
                            <li>Marca {product.brand}</li>
                            <li>Categoría {product.category}</li>
                            {product.discount && (
                                <li>Descuento: {product.discount}%</li>
                            )}
                            <li>
                                Tags:
                                {product.tags?.map((tag, index) => (
                                    <span key={index}> {tag}</span>
                                ))}
                            </li>
                        </ul>
                        {/*    
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
                        <Card.Text>Precio: ${product.price}</Card.Text> */}

                    </Card.Body>
                </div>
                <div style={{ flex: 1 , border: '1px solid black', borderRadius: '10px'}}>
                    <p><strong style={{ color: 'green' }}>Llega gratis el lunes</strong> por ser tu primera compra</p>
                    <p><strong style={{ color: 'green' }}>Retirá gratis</strong> entre el miércoles y el jueves en correo y otros puntos</p>

                    <strong>Stock disponible</strong>
                    <strong>Cantidad aca updatedQuantity</strong>
                    <Counter // componentes contador
                        count={count}
                        increment={increment}
                        decrement={decrement}
                    />

                    <Button onClick={handleAddToCart} style={{ width: '90%', background: '#2968c8' , borderColor: "#2968c8"}}>comprar</Button>
                    <Button onClick={handleAddToCart} style={{ width: '90%', background: '#2968c8', marginTop: '10px' }}>Agregar al carrito</Button>
                </div>

            </Card>
        </div >
    );
};

export default ProductItem;
