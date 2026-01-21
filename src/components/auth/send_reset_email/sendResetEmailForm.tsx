import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../../types/message";
import styles from '../styles.module.css';

type SendResetEmailProps = {
    message: Message | null;
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: {
        email: string;
    };
};

const SendResetEmailForm = ({ email, handleOnSubmit, handleOnChange, message }: SendResetEmailProps) => {


    return (
        <>
            <div className={styles.divContainer}>
                <h1 className={styles.h1title}>Restablecer contraseña</h1>
                {
                    message && (
                        <Alert variant={message.type === 'success' ? 'success' : 'danger'}>{message.text}</Alert>
                    )
                }
                <Form onSubmit={handleOnSubmit}>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            name="email"
                            value={email.email}
                            onChange={handleOnChange}
                        />
                    </FormGroup>
                    <Button type="submit" className={styles.btn}>Enviar</Button>
                </Form>
            </div>
        </>
    )
}

export default SendResetEmailForm;