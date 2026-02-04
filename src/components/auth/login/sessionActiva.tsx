import Card from 'react-bootstrap/Card';
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fechingLogout } from "../service/logout";
import { useDispatch } from 'react-redux';
import type { LoginUser } from '../../../types/users';
import { Button } from 'react-bootstrap';
import { setUserRedux } from '../../../features/auth/authSlice';

type UserSessionProps = {
    user: LoginUser
}

const SessionActiva = ({ user }: UserSessionProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
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
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <Card style={{ width: '18rem' }}>
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
                            <Button>Tienda</Button>
                        </Card.Link>
                        <Card.Link as={Link} to={'/login'} onClick={handleLogout}>
                            <Button>Cerrar sessión</Button>
                        </Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default SessionActiva;