import { useState } from "react";
import type { Message } from "../../types/message";
import Loading from "../loading/loading";
import LoginForm from "./loginForm";


const Login = () => {
    const initialState = { email: '', password: '' };

    const [user, setUser] = useState(initialState);
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);

    const handleOnchage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user.email.trim() || !user.password.trim()) {
            setMessage({
                type: 'error',
                text: 'Todos los campos son obligatorios'
            })

            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(user)
            })
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrarse');
            }
            console.log(data.token);
            setMessage({
                type: 'success',
                text: "Login Exitoso"
            })
            setUser(initialState);
        } catch (error) {
            console.log(error)

            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Se produjo un error '
            })
        } finally {
            setLoading(false);
        }
    }


    if (loading) return <Loading />

    return (
        <>
            <LoginForm user={user} message={message} handleOnchage={handleOnchage} handleSubmit={handleSubmit}/>
        </>
    )
}

export default Login;