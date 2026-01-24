import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ResetPasswordForm from "./resetPassrdForm";
import type { Message } from "../../../types/message";
import Loading from "../../loading/loading";
import { fetchingResetPassword } from "../service/resetPassword";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState({ password: '' });
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setPassword(prev => ({ ...prev, [name]: value }));

        setMessage(null);
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            setMessage({ type: "error", text: "Token inválido" });
            return;
        }

        setLoading(true);

        try {
            const data = await fetchingResetPassword({ // SERVICE FECHING RESETPASSWORD
                token,
                password: password.password
            });

            setMessage({
                type: "success",
                text: data.message
            });

            setPassword({ password: "" });

            setTimeout(() => navigate("/login"), 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                text: error.message || "Algo salió mal"
            });
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <Loading />

    return (
        <>

            {token ? <p>Token OK</p> : <p>Token inválido</p>}

            <ResetPasswordForm password={password} message={message} handleOnChange={handleOnchange} handleOnSubmit={handleOnSubmit} />
        </>
    );
};

export default ResetPassword;
