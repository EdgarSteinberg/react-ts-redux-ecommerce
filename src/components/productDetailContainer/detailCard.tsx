import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Counter from "../counter/counter";
import styles from './styles.module.css'
import type { Product } from '../../types/products';

type DetailCardProps = {
    product: Product;
    handleAddToCart: () => void;
    getImageSrc: (image?: string) => string | undefined;
    count: number;
    increment: () => void;
    decrement: () => void;
};


const DetailCard = ({product, handleAddToCart, getImageSrc, count, decrement, increment}: DetailCardProps) => {


    return (
        <>
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
                  

                        </Card.Body>
                    </div>
                    <div style={{ flex: 1, border: '1px solid black', borderRadius: '10px' }}>
                        <p><strong style={{ color: 'green' }}>Llega gratis el lunes</strong> por ser tu primera compra</p>
                        <p><strong style={{ color: 'green' }}>Retirá gratis</strong> entre el miércoles y el jueves en correo y otros puntos</p>

                        <strong>Stock disponible</strong>
                        <strong>Cantidad aca updatedQuantity</strong>
                        <Counter // componentes contador
                            count={count}
                            increment={increment}
                            decrement={decrement}
                        />

                        <Button onClick={handleAddToCart} style={{ width: '90%', background: '#2968c8', borderColor: "#2968c8" }}>comprar</Button>
                        <Button onClick={handleAddToCart} style={{ width: '90%', background: '#2968c8', marginTop: '10px' }}>Agregar al carrito</Button>
                    </div>

                </Card>
            </div >
        </>
    )
}

export default DetailCard