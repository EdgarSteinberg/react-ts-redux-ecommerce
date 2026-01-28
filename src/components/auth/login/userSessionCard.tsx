import Card from 'react-bootstrap/Card';
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fechingLogout } from "../service/logout";
 

import type { RegisterUser } from '../../../types/users';

type UserSessionProps = {
    user : RegisterUser
}

const UserSessionCard = ({user}: UserSessionProps) => {
     

    const handleLogout = async () => {
        await fechingLogout();
       
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
                        <Card.Link as={Link} to={'/'}>Tienda</Card.Link>
                        <Card.Link as={Link} to={'/login'} onClick={handleLogout}>
                            Cerrar sesión
                        </Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default UserSessionCard;