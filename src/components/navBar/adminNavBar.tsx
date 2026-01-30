import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
 

const AdminNavBar = () => {

    return (
        <Navbar bg="secondary" variant="dark">
            <Container style={{height: '16px'}}>
                <Navbar.Brand>Admin</Navbar.Brand>

                <Nav>
                    <Nav.Link as={Link} to="/admin/products">Productos</Nav.Link>
                    <Nav.Link as={Link} to="/admin/products/new">Nuevo</Nav.Link>
                    <Nav.Link as={Link} to="/admin/users">Usuarios</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};



export default AdminNavBar;