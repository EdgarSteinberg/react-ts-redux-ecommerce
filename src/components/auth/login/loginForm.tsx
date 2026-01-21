import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../../types/message";
import type { LoginUser } from "../../../types/login";
import { Link } from "react-router-dom";
import styles from '../styles.module.css';

type LoginFormProp = {
    message: Message | null,
    user: LoginUser,
    handleOnchage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginForm = ({ user, message, handleOnchage, handleSubmit }: LoginFormProp) => {

    return (
        <div className={styles.divContainer}>
            <h1 className={styles.h1title}>Iniciar sesión</h1>
            <Form onSubmit={handleSubmit}>
                {
                    message && (
                        <Alert variant={message.type == 'success' ? 'success' : 'danger'}>
                            {message.text}
                        </Alert>
                    )
                }
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        name="email"
                        value={user.email}
                        onChange={handleOnchage}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        name="password"
                        value={user.password}
                        onChange={handleOnchage}
                    />
                </FormGroup>

                <Button type="submit" className={styles.btn}>Enviar</Button>

                <Link to="/register"  className={styles.link}>
                    ¿No tenés una cuenta? Creá una.
                </Link>

                <Link to="/sendResetEmail" className={styles.link}>
                    ¿Olvidaste tu contraseña? Hacé click para recuperarla
                </Link>
            </Form>
        </div>
    )
};

export default LoginForm;