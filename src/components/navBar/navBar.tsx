import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartWidget from '../cartWidget/cartWidget';

const NavBar = () => {

    const arrayCategories = [  "coleccionables","comics", "consolas","eventos","gadgets","hardware","portátiles", "ropa-y-accesorios" ]

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            <img
                                src="/image.png"
                                alt="Pedi dos ya"
                                style={{ width: '70px', borderRadius: '5px' }}
                            />
                        </Nav.Link>
                        {arrayCategories.map((c) => (
                            <Nav.Link
                                key={c}
                                as={Link}
                                to={`/categories/${c}`}
                            >
                                {c}
                            </Nav.Link>
                        ))}

                        <CartWidget />


                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/admin/products'}>getProducts</Nav.Link>
                        <Nav.Link as={Link} to={'/admin/products/new'}>postProduct</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;