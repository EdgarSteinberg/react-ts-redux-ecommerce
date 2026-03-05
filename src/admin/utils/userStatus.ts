//🟢 Activo hoy 🟡 Hace 3 días 🔴 Inactivo

export type UserStatus = {
    text: string;
    color: "success" | "warning" | "danger" | "secondary";
};

export const getUserStatus = (  lastConnection: Date | null ): UserStatus => {
    if (!lastConnection) {
        return { text: "Nunca", color: "secondary" };
    }

    const now = new Date(); // fecha actual
    const last = new Date(lastConnection); // ultima conexión

    const diffTime = now.getTime() - last.getTime(); //fecha actual en ms (MENOS) última conexión en ms (Resultado) diferencia en ms
    
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // Mili segundos convertidos en dias
    /* 1000 ms = 1 segundo 60 segundos = 1 minuto
       60 minutos = 1 hora 24 horas = 1 día */

    if (diffDays < 1) {
        return { text: "Activo hoy", color: "success" };
    }

    if (diffDays <= 3) {
        return {
            text: `Hace ${Math.floor(diffDays)} día(s)`,
            color: "warning",
        };
    }

    return { text: "Inactivo", color: "danger" };
};