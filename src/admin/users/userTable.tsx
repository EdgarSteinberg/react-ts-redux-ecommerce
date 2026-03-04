import Table from 'react-bootstrap/Table';
import { Alert, Button } from "react-bootstrap";
import type { Message } from '../../types/message';
import type { RegisterPayload } from "../../types/users";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from './styles.module.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AppButton from '../../components/appButton/appbutton';
import { FaCrown } from "react-icons/fa";

type usersProps = {
    message: Message | null,
    users: RegisterPayload[]; // 👈 array
    handleDelete: (id: string) => void;
    handleUserRolePremium: (id: string) => void;
}
const UserTable = ({ message, users, handleDelete, handleUserRolePremium }: usersProps) => {
    const width = '40%'
    return (
        <>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"} style={{ textAlign: 'center' }}>
                    {message.text}
                </Alert>
            )}

            <h1 style={{ textAlign: 'center' }}>Administración de Usuarios</h1>
            <div className={styles.definePantalla}  >
                <div className={styles.cardContainer}>
                    {users.length > 0 ? (
                        <>
                            <div className="d-none d-md-block">
                                <Table responsive="md">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <FaRegTrashAlt color="red" onClick={() => handleDelete(user._id)} />
                                                    <Button onClick={() => handleUserRolePremium(user._id)}>
                                                        {user.role === 'user' ? 'Hacer Premium' : 'Quitar Premium'}
                                                          <FaCrown />
                                                    </Button>
                                                </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="d-md-none">
                                {
                                    users.map((user) => (
                                        <Card key={user._id} className="mb-3">
                                            <Card.Body>
                                                <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                                                <Card.Text>  {user.role}</Card.Text>
                                                <div className="mt-auto text-end">
                                                    <FaRegTrashAlt
                                                        color="red"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(user._id)}
                                                    />
                                                </div>
                                                <Button onClick={() => handleUserRolePremium(user._id)}>
                                                    {user.role === 'user' ? 'Hacer Premium' : 'Quitar Premium'}
                                                </Button>
                                            </Card.Body>
                                        </Card>

                                    ))
                                }
                            </div>
                        </>
                    ) : (
                        !message ? (
                            <p>No hay usuarios para mostrar</p>
                        ) : (
                            <Link to={'/login'} style={{ textDecoration: "none" }}>
                                {/*  <Button className={styles.btn}>Iniciar Sesión</Button> */}
                                <AppButton type="button" width={width}>
                                    Iniciar Sesión
                                </AppButton>
                            </Link>

                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default UserTable;