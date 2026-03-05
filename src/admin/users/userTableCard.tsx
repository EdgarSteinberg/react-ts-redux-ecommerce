import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import type { RegisterPayload, RegisterUser } from "../../types/users";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import UserStatusBadge from "./userStatusBadge";

type UserTableCardProps = {
    handleDelete: (id: string) => void;
    handleUserRolePremium: (id: string) => void;
    users: RegisterPayload[];
    user: RegisterUser | null;
};

const UserTableCard = ({ handleDelete, handleUserRolePremium, users, user, }: UserTableCardProps) => {

    return (
        <>
            {users.map((userItem) => (
                <Card key={userItem._id} className="mb-3">
                    <Card.Body>
                        <Card.Title>
                            Nombre: {userItem.first_name} - Apellido:{" "}
                            {userItem.last_name}
                        </Card.Title>

                        <Card.Subtitle className="mb-2 text-muted">
                            Email: {userItem.email}
                        </Card.Subtitle>

                        <Card.Text>Role: {userItem.role}</Card.Text>

                        <Card.Text>
                            Última Conexión{" "}
                            {userItem.last_connection
                                ? new Date(userItem.last_connection).toLocaleString("es-AR")
                                : "Nunca"}
                        </Card.Text>

                        <UserStatusBadge
                            lastConnection={userItem.last_connection}
                        />

                        <div className="mt-auto text-end">
                            <FaRegTrashAlt
                                color="red"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDelete(userItem._id)}
                            />
                        </div>

                        {user?.role === "admin" &&
                            userItem.role !== "admin" && (
                                <Button
                                    onClick={() =>
                                        handleUserRolePremium(userItem._id)
                                    }
                                    className={`flex items-center gap-2 ${userItem.role === "user"
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-gray-500 hover:bg-gray-600"
                                        } text-white px-3 py-1 rounded`}
                                >
                                    {userItem.role === "user"
                                        ? "Premium"
                                        : "User"}
                                    <FaCrown />
                                </Button>
                            )}
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default UserTableCard;