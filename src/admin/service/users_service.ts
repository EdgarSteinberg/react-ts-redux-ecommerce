import type { RegisterPayload, UsersResponse } from "../../types/users";

const API_URL = "http://localhost:8080/api/users";


export const getAllUsers = async (): Promise<RegisterPayload[]> => {
    const response = await fetch(API_URL, {credentials: 'include'});

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    const data: UsersResponse = await response.json();
    return data.payload;
};


export const deleteUser = async (uid: string) => {
    const response = await fetch(`${API_URL}/${uid}`, {
        method: "DELETE",
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
    }

    return response.json();
};
