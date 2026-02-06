import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import CartWidget from "../cart/cartWidget/cartWidget";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import styles from './styles.module.css'
const MainNavBar = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const arrayCategories = ["Consolas", "Gadgets", "Hardware", "Portátiles", "Coleccionables", "Comics", "Eventos", "Ropa-y-Accesorios"]

    return (

        <Navbar bg="dark" variant="dark" expand="lg" className={styles.mainNavBar}>
            <Container>
                <Navbar.Brand as={Link} to="/"><img src={`/mern.webp`} alt="logo" className={styles.logo} /></Navbar.Brand>

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


                        <Nav.Link as={Link} to={user ? 'account' : '/login'} style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                            <FaUser size={20} color="white" />
                            <span style={{ marginLeft: '6px' }}>
                                {user ? `Hola ${user.first_name}` : 'Ingresar'}
                            </span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default MainNavBar;