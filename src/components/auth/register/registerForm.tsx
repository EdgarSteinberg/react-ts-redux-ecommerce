import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { RegisterUser } from "../../../types/users";
import type { Message } from "../../../types/message";
import { Link } from "react-router-dom";
import styles from '../styles.module.css';

type RegisterFormProps = {
    register: RegisterUser;
    message: Message | null;
    loading: boolean;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterForm = ({ register, message, loading, handleOnChange, handleSubmit }: RegisterFormProps) => {


    return (
        <div className={styles.divContainer}>
            <h1 className={styles.h1title}>Creá tu cuenta</h1>
            <Form onSubmit={handleSubmit} >
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
                    <FormControl name="age" value={register.age} onChange={handleOnChange} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="password" value={register.password} onChange={handleOnChange} />
                </FormGroup>

                <Button type="submit" disabled={loading} className={styles.btn}>
                    {loading ? 'Enviando...' : 'Registrarse'}
                </Button>

                <Link to="/login" className={styles.link}>
                    ¿Ya tenés una cuenta? Iniciá sesión
                </Link>
            </Form>
        </div>
    )
}

export default RegisterForm;