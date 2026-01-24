import { useEffect, useState } from "react";
import type { Message } from "../../../types/message";
import Loading from "../../loading/loading";
import LoginForm from "./loginForm";
import { useNavigate } from "react-router-dom";
import type { RegisterUser } from "../../../types/users";
import { Button } from "react-bootstrap";
import { fechingLogout } from "../service/logout";
import { loginUser, currentUser } from "../service/users";

const Login = () => {
    const navigate = useNavigate();

    const initialState = { email: '', password: '' };

    const [user, setUser] = useState(initialState);
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState<RegisterUser | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);


    const handleLogout = async () => {
        await fechingLogout();
        setDataUser(null);
    };

    const handleOnchage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user.email.trim() || !user.password.trim()) {
            setMessage({ type: 'error', text: 'Todos los campos son obligatorios' });
            return;
        }

        setLoading(true);

        try {
            await loginUser(user); // SERVICE
            navigate('/');

        } catch (error) {
            setLoading(false);
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Se produjo un error'
            });
        }
    };

    useEffect(() => {
        const getFechingCurrent = async () => {
            try {
                const data = await currentUser();
                setDataUser(data ? data.user : null);
            } catch {
                setDataUser(null);
            } finally {
                setCheckingAuth(false);
            }
        };

        getFechingCurrent();
    }, []);


    if (loading) return <Loading />
    if (checkingAuth) return <Loading />;

    return (
        <>
            {
                dataUser ? (
                    <div>

                        <p>{dataUser.first_name}</p>
                        <Button onClick={handleLogout}>Cerrar sesión</Button>
                    </div>
                ) : (

                    <LoginForm user={user} message={message} handleOnchage={handleOnchage} handleSubmit={handleSubmit} />
                )
            }
        </>
    )
}

export default Login;