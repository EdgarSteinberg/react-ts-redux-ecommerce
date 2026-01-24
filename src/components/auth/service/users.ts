import type { LoginUser } from "../../../types/users";


const API_URL = 'http://localhost:8080/api/users';

export const loginUser = async (user: LoginUser) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al loguearse');
    }

    return data;
};


export const currentUser = async () => {
    const response = await fetch(`${API_URL}/current`, {
        credentials: 'include'
    });

    if (response.status === 401) {
        return null;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error inesperado');
    }

    return data;
};
