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

    /*     if (!response.ok) {
            const error: any = new Error(data.message || 'Error al loguearse');
            error.status = response.status; // 👈 ESTA ES LA MAGIA
            throw error;
        } */

/*     if (!response.ok) {
        console.log("STATUS:", response.status);
        console.log("DATA:", data);

        const error: any = new Error(data.message || 'Error al loguearse');
        error.status = response.status;

        console.log("ERROR ARMADO:", error);

        throw error;
    } */
    return data;
};


export const currentUser = async () => {
    const response = await fetch(`${API_URL}/current`, {
        credentials: 'include'
    });

    if (!response.ok) {
        const error: any = new Error('Error al obtener el usuario')
        error.status = response.status;
        throw error
    }

    const data = await response.json();

    return data;
};
