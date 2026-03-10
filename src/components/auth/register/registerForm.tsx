import { Alert, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { RegisterFormData } from "../../../types/users";
import type { Message } from "../../../types/message";
import { Link } from "react-router-dom";
import styles from '../styles.module.css';
import AppButton from "../../appButton/appbutton";

type RegisterFormProps = {
    register: RegisterFormData;
    message: Message | null;
    loading: boolean;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterForm = ({ register, message, handleOnChange, handleSubmit }: RegisterFormProps) => {
    const width = '100%'

    return (
        <div className={styles.divContainer}>
            <h1 className={styles.h1title}>Creá tu cuenta</h1>
            <Form onSubmit={handleSubmit} >
                {message && (
                    <Alert variant={message.type === 'success' ? 'success' : 'danger'} className={styles.alertCenter}>{message?.text}</Alert>
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

                <br></br>
                <AppButton type={"submit"} width={width}>
                    Registrarse
                </AppButton>
                <Link to="/login" className={styles.link}>
                    ¿Ya tenés una cuenta? Iniciá sesión
                </Link>
            </Form>
        </div>
    )
}

export default RegisterForm;