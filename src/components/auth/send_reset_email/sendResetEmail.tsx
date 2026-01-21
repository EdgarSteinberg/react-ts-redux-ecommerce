import { useState } from "react";
import type { Message } from "../../../types/message";
import Loading from "../../loading/loading";
import SendResetEmailForm from "./sendResetEmailForm";


const SendResetEmail = () => {
    const [email, setEmail] = useState({ email: "" });
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setMessage(null); // limpia mensajes al escribir
        setEmail(prev => ({ ...prev, [name]: value }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validación antes de prender el loader
        if (!email.email.trim()) {
            setMessage({
                type: "error",
                text: "El email es obligatorio"
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/users/send-reset-email",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(email)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al enviar el email");
            }

            setMessage({
                type: "success",
                text: "Si el correo existe, se envió un enlace de restablecimiento"
            });

            setEmail({ email: "" });
        } catch (error) {
            console.error(error);
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Error al enviar el email"
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;


    return (
        <SendResetEmailForm email={email} message={message} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
    )
}

export default SendResetEmail;