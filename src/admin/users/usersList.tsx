import { useEffect, useState } from "react";
import type { RegisterPayload } from "../../types/users";
import Loading from "../../components/loading/loading";
import type { Message } from "../../types/message";
import { Alert, Button } from "react-bootstrap";
import { getAllUsers, deleteUser } from "../service/users_service";


const UsersList = () => {
    const [users, setUsers] = useState<RegisterPayload[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);

    useEffect(() => {
        const fetchingUsers = async () => {
            setLoading(true);
            try {
                const users = await getAllUsers(); // 👈 Service Users
                setUsers(users);
            } catch (error) {
                console.error(error);
                setMessage({ type: "error", text: "Error al obtener los usuarios" });
            } finally {
                setLoading(false);
            }
        };

        fetchingUsers();
    }, []);

    const handleDelete = async (uid: string) => {
        try {
            setLoading(true);
            await deleteUser(uid);

            setUsers(prev => prev.filter(user => user._id !== uid));
            setMessage({ type: "success", text: "Usuario eliminado!" });
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "Error al eliminar el usuario" });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"}>
                    {message.text}
                </Alert>
            )}

            <h1>Administración de Usuarios</h1>

            {users.length > 0 ? (
                users.map(user => (
                    <div key={user._id}>
                        <p>
                            {user.first_name} {user.last_name} – {user.email}
                        </p>
                        <Button variant="danger" onClick={() => handleDelete(user._id)}> Eliminar</Button>
                    </div>
                ))
            ) : (
                <p>No hay usuarios para mostrar</p>
            )}
        </>
    );
};

export default UsersList;
