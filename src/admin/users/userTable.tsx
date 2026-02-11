import Table from 'react-bootstrap/Table';
import { Alert } from "react-bootstrap";
import type { Message } from '../../types/message';
import type { RegisterPayload } from "../../types/users";
import { FaRegTrashAlt } from "react-icons/fa";


type usersProps = {
    message: Message | null,
    users: RegisterPayload[]; // 👈 array
    handleDelete: (id: string) => void;
}
const UserTable = ({ message, users, handleDelete }: usersProps) => {

    return (
        <>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"} style={{ textAlign: 'center' }}>
                    {message.text}
                </Alert>
            )}

            <h1 style={{ textAlign: 'center' }}>Administración de Usuarios</h1>
            <div
                style={{
                    height: "calc(95vh - 120px)", // define “la pantalla”
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    maxWidth: "1200px"
                }}
            >
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        border: "1px solid #dee2e6",
                        borderRadius: "8px"
                    }}
                >
                    {users.length > 0 ? (

                        <Table striped bordered hover >
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    ) : (
                        !message ? (
                            <p>No hay usuarios para mostrar</p>
                        ) : (
                            null
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default UserTable;