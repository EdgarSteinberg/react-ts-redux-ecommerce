import { useState } from "react";
import type { RegisterUser, RegisterPayload } from "../../types/users";
import type { Message } from "../../types/message";
import RegisterForm from "./registerForm";


const Register = () => {
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);

    const initialState: RegisterUser = {
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        password: ''
    };

    const [register, setRegister] = useState(initialState);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRegister(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!register.email.trim() || !register.password.trim() || !register.first_name.trim() || !register.last_name.trim() || !register.age.trim()) {
            setMessage({
                type: 'error',
                text: 'Todos los campos son obligatorios'
            })

            return;
        }

        setLoading(true); // componente Loading

        const payload: RegisterPayload = {
            first_name: register.first_name,
            last_name: register.last_name,
            email: register.email,
            age: Number(register.age),
            password: register.password
        };

        try {
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

            setMessage({
                type: 'success',
                text: 'Usuario registrado correctamente'
            });

            setRegister(initialState);

        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Error al registrarse'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <RegisterForm register={register} message={message} loading={loading} handleOnChange={handleOnChange} handleSubmit={handleSubmit} />
        </>
    );
};

export default Register;
