import { useEffect, useState } from "react";
import type { RegisterPayload } from "../../types/users";
import Loading from "../../components/loading/loading";
import type { Message } from "../../types/message";
import { getAllUsers, deleteUser } from "../service/users_service";
import UserTable from "./userTable";



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
            <UserTable users={users} message={message} handleDelete={handleDelete} />
        </>
    );
};

export default UsersList;
