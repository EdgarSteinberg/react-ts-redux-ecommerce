import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../types/message";
import type { LoginUser } from "../../types/login";

type LoginFormProp = {
    message: Message | null,
    user: LoginUser,
    handleOnchage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginForm = ({ user, message, handleOnchage, handleSubmit } : LoginFormProp) => {

    return (
        <>
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

                <Button type="submit">Enviar</Button>
            </Form>
        </>
    )
};

export default LoginForm;