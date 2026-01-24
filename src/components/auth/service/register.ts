import type { RegisterUser } from "../../../types/users";

export const fetchingRegister = async (payload: RegisterUser) => {
    
    const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al registrarse');
    }

    return data;
} 
