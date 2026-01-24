

export const fechingLogout = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/users/logout", {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }
        
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
