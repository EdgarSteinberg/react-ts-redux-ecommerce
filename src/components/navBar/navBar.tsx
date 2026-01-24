import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartWidget from '../cartWidget/cartWidget';
import { useNavigate } from 'react-router-dom';
import { fechingLogout } from '../auth/service/logout';

const NavBar = () => {
    const navigate = useNavigate();
    const arrayCategories = ["coleccionables", "comics", "consolas", "eventos", "gadgets", "hardware", "portátiles", "ropa-y-accesorios"]

    const handleLogout = async () => {
        await fechingLogout();
        navigate("/login");
    }

    return (
        <div >
            <Navbar bg="dark" data-bs-theme="dark" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            inicio
                        </Nav.Link>
                        {arrayCategories.map((c) => (
                            <Nav.Link key={c} as={Link} to={`/categories/${c}`}>
                                {c}
                            </Nav.Link>
                        ))}

                        <CartWidget />{/*  componete */}

                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                        <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                        <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                            Cerrar sesión
                        </Nav.Link>
                        
                        <Nav.Link as={Link} to="/admin/products">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products/new">Nuevo producto</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users">Usuarios</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;