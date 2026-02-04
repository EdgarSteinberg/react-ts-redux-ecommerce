import { useState } from "react";
import type { Message } from "../../../types/message";
import Loading from "../../loading/loading";
import LoginForm from "./loginForm";
import { useNavigate } from "react-router-dom";
import { loginUser, currentUser } from "../service/login";

import { setUserRedux } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { fetchGetCart } from "../../cart/service/cart_service";
import { setCartItems } from "../../../features/cart/cartSlice";
 
import SessionActiva from "./sessionActiva";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state: RootState) => state.auth);
   /*  const dataUser = useSelector((state: RootState) => state.auth.user); */
    const initialState = { email: '', password: '' };

    const [userData, setUserData] = useState(initialState);
    const [message, setMessage] = useState<Message | null>(null);
    const [cargando, setCargando] = useState(false);


    const handleOnchage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userData.email.trim() || !userData.password.trim()) {
            setMessage({ type: 'error', text: 'Todos los campos son obligatorios' });
            return;
        }

        setCargando(true);

        try {
            await loginUser(userData); // SERVICE

            const data = await currentUser(); //SERVICE
            dispatch(setUserRedux(data.user));

            // 👉 ACÁ entra el carrito
            if (data.user.cart) {
                console.log(data.user.cart)
                const cart = await fetchGetCart(data.user.cart); // SERVICE
                dispatch(setCartItems(cart.payload.products));
                console.log(cart.payload.products)
            }
            navigate('/');

        } catch (error) {
            setCargando(false);
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Se produjo un error'
            })
        } finally {
            setCargando(false)
        }
    };


    if (loading) return <Loading />

    
    return (
        <>
            {
                user ? (
                    <SessionActiva  user={userData} />
                ) : (

                    <LoginForm user={userData} message={message} handleOnchage={handleOnchage} handleSubmit={handleSubmit} />
                )
            }
        </>
    )
}

export default Login;