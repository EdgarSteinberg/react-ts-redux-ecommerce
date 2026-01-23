import Table from 'react-bootstrap/Table';
import { Alert, Button } from "react-bootstrap";
import type { Message } from '../../types/message';
import type { RegisterPayload } from "../../types/users";


type usersProps = {
    message: Message | null,
    users: RegisterPayload[]; // 👈 array
    handleDelete: (id: string) => void;
}
const UserTable = ({ message, users, handleDelete }: usersProps) => {

    return (
        <>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"}>
                    {message.text}
                </Alert>
            )}

            <h1 style={{ textAlign: 'center' }}>Administración de Usuarios</h1>

            {users.length > 0 ? (
                <Table striped bordered hover>
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
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}> Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No hay usuarios para mostrar</p>
            )}

        </>
    )
}

export default UserTable;