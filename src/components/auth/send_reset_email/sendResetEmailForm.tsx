import { Alert, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../../types/message";
import styles from '../styles.module.css';
import { Link } from "react-router-dom";
import AppButton from "../../appButton/appbutton";

type SendResetEmailProps = {
    message: Message | null;
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: {
        email: string;
    };
};

const SendResetEmailForm = ({ email, handleOnSubmit, handleOnChange, message }: SendResetEmailProps) => {
    const width = '100%';

    return (
        <>
            <div className={styles.divContainer}>
                <h1 className={styles.h1title}>Restablecer contraseña</h1>
                {
                    message && (
                        <Alert variant={message.type === 'success' ? 'success' : 'danger'} className={styles.alertCenter}>{message.text}</Alert>
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
                    <br />
                    <AppButton type={"submit"} width={width}>
                        Enviar
                    </AppButton>
                    {/* <Button type="submit" className={styles.cardDetailBtnC}>Enviar</Button> */}
                    <Link to="/login" className={styles.link}>Volver al login</Link>
                </Form>
            </div>
        </>
    )
}

export default SendResetEmailForm;