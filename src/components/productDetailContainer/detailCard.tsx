
import Card from 'react-bootstrap/Card';
import Counter from "../counter/counter";
import styles from './styles.module.css'
import type { Product } from '../../types/products';
import { FaCartPlus } from "react-icons/fa6";
import AppButton from '../appButton/appbutton';

type DetailCardProps = {
    product: Product;
    handleAddToCart: (redirect: "cart" | "shop") => void;
    getImageSrc: (image?: string) => string | undefined;
    count: number;
    increment: () => void;
    decrement: () => void;
};


const DetailCard = ({ product, handleAddToCart, getImageSrc, count, decrement, increment }: DetailCardProps) => {
    const width = '100%';

    return (
        <>
            <div className={styles.divContainer}>
                <Card className={styles.cardContainer}>

                    <div style={{ flex: 1 }}>
                        <Card.Img variant="top" src={getImageSrc(product.mainImage?.[0])} alt={product.title} className={styles.imgContainer} />
                    </div>

                    <div style={{ flex: 1 }}>
                        <Card.Body className={styles.app}>
                            <Card.Title className={styles.cardDetailTitle} >{product.longDescription}</Card.Title>
                            <Card.Text style={{ fontSize: '36px' }}>$ {product.price} </Card.Text>
                            <Card.Subtitle style={{ fontSize: '14px', marginBottom: '14px' }}>Lo que tenés que saber de este producto</Card.Subtitle>

                            <ul>
                                <li style={{ fontSize: '14px', marginTop: '8px' }}>Stock {product.stock}</li>
                                <li>Marca {product.brand}</li>
                                <li>Categoría {product.category}</li>
                                {product.discount && (
                                    <li> <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>Descuento: <strong className={styles.discount}>{product.discount}%</strong></div></li>
                                )}

                                <li>
                                    Tags:
                                    {product.tags?.map((tag, index) => (
                                        <span key={index} className={styles.tags}> {tag}</span>
                                    ))}
                                </li>
                            </ul>


                        </Card.Body>
                    </div>
                    <div className={styles.cardDetail}>
                        <br />
                        <p><strong className={styles.cardDetailP}>Llega gratis el lunes</strong> por ser tu primera compra</p>
                        <p><strong className={styles.cardDetailP}>Retirá gratis</strong> entre el miércoles y el jueves en correo y otros puntos</p>

                        <strong>Stock disponible</strong>
                        <strong>Cantidad aca updatedQuantity</strong>
                        <strong>
                            <Counter // componentes contador
                                count={count}
                                increment={increment}
                                decrement={decrement}
                            />
                        </strong>

                        <AppButton onClick={() => handleAddToCart("cart")} width={width}>
                            Comprar
                        </AppButton>

                        <br />

                        <AppButton onClick={() => handleAddToCart("shop")} width={width}>
                            <strong style={{ marginRight: '8px' }}><FaCartPlus size={20} /></strong>Agregar al carrito
                        </AppButton>


                        {/* <Button onClick={() => handleAddToCart("cart")} className={styles.cardDetailBtnC}>Comprar</Button> */}
                        {/* <Button onClick={() => handleAddToCart("shop")} className={styles.cardDetailBtnA}><strong style={{ marginRight: '8px' }}><FaCartPlus size={20} /></strong>Agregar al carrito</Button> */}
                    </div>

                </Card>
            </div >
        </>
    )
}

export default DetailCard