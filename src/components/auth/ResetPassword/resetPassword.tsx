import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ResetPasswordForm from "./resetPassrdForm";
import type { Message } from "../../../types/message";
import Loading from "../../loading/loading";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState({ password: '' });
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.log("❌ Token inválido o inexistente");
        } else {
            console.log("✅ Token recibido:", token);
        }
    }, [token]);


    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setPassword(prev => ({ ...prev, [name]: value }));

        setMessage(null);
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/users/new-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, ...password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error fetching');
            }

            const data = await response.json();
            setMessage({
                type: 'success',
                text: data.message // o mostrar algo de payload
            })
            /* setMessage({
                type: 'success',
                text: 'Se actualizo la nueva contrasena'
            }) */

            setPassword({ password: '' });

            setTimeout(() => {
                navigate('/login'); // cambiar por la ruta a la que quieras ir
            }, 2000);
        } catch (error) {
            console.log(error);

            setMessage({
                type: 'error',
                text: 'Error'
            })
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />

    return (
        <>

            {token ? <p>Token OK</p> : <p>Token inválido</p>}

            <ResetPasswordForm password={password} message={message} handleOnChange={handleOnchange} handleOnSubmit={handleOnSubmit} />
        </>
    );
};

export default ResetPassword;
