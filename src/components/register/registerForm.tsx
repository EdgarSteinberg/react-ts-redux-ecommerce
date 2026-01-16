import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../types/message";
import type { RegisterUser } from "../../types/users";

type RegisterFormProps = {
  register: RegisterUser;
  message: Message | null;
  loading: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterForm = ({ register, message, loading, handleOnChange, handleSubmit} : RegisterFormProps) => {


    return (
        <>
         <Form onSubmit={handleSubmit}>
            {message && (
                <Alert variant={message.type === 'success' ? 'success' : 'danger'}>{message?.text}</Alert>
            )}
            <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <FormControl name="first_name" value={register.first_name} onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Apellido</FormLabel>
                <FormControl name="last_name" value={register.last_name} onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" name="email" value={register.email} onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Edad</FormLabel>
                <FormControl type="number" name="age" value={register.age} onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" value={register.password} onChange={handleOnChange} />
            </FormGroup>

            <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Registrarse'}
            </Button>
        </Form>
        </>
    )
}

export default RegisterForm;