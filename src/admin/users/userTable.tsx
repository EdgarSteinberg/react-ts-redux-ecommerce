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
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

type usersProps = {
    message: Message | null,
    users: RegisterPayload[]; // 👈 array
    handleDelete: (id: string) => void;
    handleUserRolePremium: (id: string) => void;
}
const UserTable = ({ message, users, handleDelete, handleUserRolePremium }: usersProps) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const width = '40%';

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
                                        {users.map((userItem, index) => (
                                            <tr key={userItem._id}>
                                                <td>{index + 1}</td>
                                                <td>{userItem.first_name}</td>
                                                <td>{userItem.last_name}</td>
                                                <td>{userItem.email}</td>
                                                <td>{userItem.role}</td>

                                                <td>
                                                    <div className="flex items-center gap-3">

                                                        {/* Eliminar */}
                                                        <FaRegTrashAlt
                                                            color="red"
                                                            className="cursor-pointer hover:opacity-70 transition"
                                                            onClick={() => handleDelete(userItem._id)}
                                                            title="Eliminar usuario"
                                                        />

                                                        {/* Cambiar role */}
                                                        {user?.role === 'admin' && userItem.role !== 'admin' && (
                                                            <Button
                                                                onClick={() => handleUserRolePremium(userItem._id)}
                                                                className={`flex items-center gap-2 ${userItem.role === 'user'
                                                                    ? 'bg-green-600 hover:bg-green-700'
                                                                    : 'bg-gray-500 hover:bg-gray-600'
                                                                    } text-white px-3 py-1 rounded`}
                                                            >
                                                                {userItem.role === 'user' ? 'Premium' : 'User'}
                                                                <FaCrown />
                                                            </Button>
                                                        )}

                                                    </div>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="d-md-none">
                                {
                                    users.map((userItem) => (
                                        <Card key={userItem._id} className="mb-3">
                                            <Card.Body>
                                                <Card.Title>{userItem.first_name} {userItem.last_name}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{userItem.email}</Card.Subtitle>
                                                <Card.Text>  {userItem.role}</Card.Text>
                                                <div className="mt-auto text-end">
                                                    <FaRegTrashAlt
                                                        color="red"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(userItem._id)}
                                                    />
                                                </div>
                                                {/* Cambiar role */}
                                                {user?.role === 'admin' && userItem.role !== 'admin' && (
                                                    <Button
                                                        onClick={() => handleUserRolePremium(userItem._id)}
                                                        className={`flex items-center gap-2 ${userItem.role === 'user'
                                                            ? 'bg-green-600 hover:bg-green-700'
                                                            : 'bg-gray-500 hover:bg-gray-600'
                                                            } text-white px-3 py-1 rounded`}
                                                    >
                                                        {userItem.role === 'user' ? 'Premium' : 'User'}
                                                        <FaCrown />
                                                    </Button>
                                                )}
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