import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
    const DOCS_URL = "http://localhost:8080/api/docs";

    return (
        <Navbar bg="secondary" variant="dark" expand="sm" style={{ padding: 0 }}>
            <Container className="px-3 px-sm-6 px-lg-0">
                <Navbar.Brand style={{ fontSize: "16px", padding: 0 }}>
                    Admin
                </Navbar.Brand>

                <Navbar.Toggle style={{ padding: "8px", fontSize: "14px" }} />

                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/admin/products">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products/new">Nuevo</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users">Usuarios</Nav.Link>
                        <Nav.Link href={DOCS_URL} target="_blank" rel="noreferrer">
                            Docs
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavBar;