import Card from 'react-bootstrap/Card';
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fechingLogout } from "../service/logout";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setUserRedux } from '../../../features/auth/authSlice';
import type { RootState } from '../../../store';
import styles from '../styles.module.css';

const SessionActiva = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state: RootState) => state.auth);

    if (loading) return null;
    if (!user) return null; // seguridad extra

    const handleLogout = async () => {
        try {
            await fechingLogout();
            dispatch(setUserRedux(null));
            navigate('/login'); // opcional pero recomendado
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.cardSessionActivoContainer}>
            <Card className={styles.cardSessionActivo}>
                <Card.Body>
                    <Card.Title>
                        <FaUser /> Hola {user.email}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Sesión activa
                    </Card.Subtitle>
                    <Card.Text>
                        Ya iniciaste sesión. Podés volver a la tienda o cerrar tu sesión.
                    </Card.Text>
                    <Card.Link as={Link} to={'/'}>
                        <Button className={styles.cardDetailBtnC}>Tienda</Button>
                    </Card.Link>
                    <Card.Link as={Link} to={'/login'} onClick={handleLogout}>
                        <Button className={styles.cardDetailBtnC}>Cerrar sessión</Button>
                    </Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SessionActiva;