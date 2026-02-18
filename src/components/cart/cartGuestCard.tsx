import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import styles from './styles.module.css';
import AppButton from "../appButton/appbutton";

const CartGuestCard = () => {
    const width = '100%';
    return (
        <>
            <div className={styles.cartdGuestContainer}>

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Tu carrito está esperando 🛒</Card.Title>
                        <Card.Text>
                            Iniciá sesión para ver tus productos y finalizar la compra.
                        </Card.Text>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            {/* <Button variant="primary" style={{ width: '100%' }}>
                                Iniciar sesión
                            </Button> */}
                            <AppButton type="button" width={width}>
                                Iniciar sesión
                            </AppButton>
                        </Link>
                    </Card.Body>
                </Card>

            </div>
        </>
    )
}

export default CartGuestCard;