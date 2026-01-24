import { useState } from "react";
import type { RegisterUser } from "../../../types/users";
import type { Message } from "../../../types/message";
import RegisterForm from "./registerForm";
import { useNavigate } from "react-router-dom";
import { fetchingRegister } from "../service/register";

const Register = () => {
    const navigate = useNavigate();
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

        const payload: RegisterUser = {
            first_name: register.first_name,
            last_name: register.last_name,
            email: register.email,
            age: register.age,
            password: register.password
        };

        try {
            await fetchingRegister(payload); //SERVICE REGISTER

            setMessage({
                type: 'success',
                text: 'Usuario registrado correctamente'
            });

            setRegister(initialState);

            navigate('/login')
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
