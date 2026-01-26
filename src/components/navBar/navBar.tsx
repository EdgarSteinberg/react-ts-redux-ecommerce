import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import CartWidget from "../cartWidget/cartWidget";
/* import { fechingLogout } from "../auth/service/logout"; */
import { FaUser } from "react-icons/fa";

const NavBar = () => {
    const navigate = useNavigate();

    const arrayCategories = ["coleccionables", "comics", "consolas", "eventos", "gadgets", "hardware", "portátiles", "ropa-y-accesorios"]

   /*  const handleLogout = async () => {
        await fechingLogout();
        navigate("/login");
    }; */

    return (

        <Navbar bg="dark" variant="dark" expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/">MiTienda </Navbar.Brand>

                {/* Hamburguesa */}
                <Navbar.Toggle aria-controls="navbar-main" />

                <Navbar.Collapse id="navbar-main">
                    {/* Izquierda */}
                    <Nav className="me-auto">


                        {arrayCategories.map((c) => (
                            <Nav.Link key={c} as={Link} to={`/categories/${c}`} style={{ display: 'flex', alignItems: 'center' }}>
                                {c}
                            </Nav.Link>
                        ))}
                    </Nav>

                    {/* Derecha */}
                    <Nav>
                        <Nav.Link as={Link} to="/cart" className="d-flex align-items-center" style={{ position: "relative", display: 'flex', alignItems: 'center' }}>
                            <CartWidget />
                        </Nav.Link>

                        <Nav.Link as={Link} to="/login" style={{ display: 'flex', alignItems: 'center' }}> <FaUser size={20} color="white" /></Nav.Link>
                        {/*     <Nav.Link onClick={handleLogout} style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}>
                            Cerrar sesión
                        </Nav.Link>*/}
                        <Nav.Link as={Link} to="/admin/products" style={{ display: 'flex', alignItems: 'center' }}>Productos</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products/new" style={{ display: 'flex', alignItems: 'center' }}>Nuevo producto</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users" style={{ display: 'flex', alignItems: 'center' }}>Usuarios</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default NavBar;
