import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../types/message";
import type { LoginUser } from "../../types/login";
import { Link } from "react-router-dom";

type LoginFormProp = {
    message: Message | null,
    user: LoginUser,
    handleOnchage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginForm = ({ user, message, handleOnchage, handleSubmit }: LoginFormProp) => {

    return (
        <div style={{ width: '50%', margin: '0 auto', marginTop: '20px', border: '1px solid #dee2e6', borderRadius: '8px',padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Iniciar sesión</h1>
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

                <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>Enviar</Button>

                <Link to="/register" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    ¿No tenés una cuenta? Creá una
                </Link>
            </Form>
        </div>
    )
};

export default LoginForm;