import { Alert, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import type { Message } from "../../../types/message";
import styles from '../styles.module.css'
import AppButton from "../../appButton/appbutton";

type PasswordState = { password: string };

type resetPasswordProps = {
    message: Message | null,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    password: PasswordState
}
const ResetPasswordForm = ({ message, handleOnChange, handleOnSubmit, password }: resetPasswordProps) => {
    const width = '100%'

    return (
        <div className={styles.divContainer}>
            <h1 className={styles.h1title}>Restablecer contraseña</h1>
            {
                message && (
                    <Alert variant={message.type === 'success' ? 'success' : 'danger'} className={styles.alertCenter}>{message?.text}</Alert>
                )
            }

            <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                    <FormLabel>Ingresa tu nueva contraseña</FormLabel>
                    <FormControl
                        type="password"
                        name="password"
                        value={password.password}
                        onChange={handleOnChange}
                    />
                </FormGroup>

                <AppButton type={"submit"} width={width}>
                    Enviar
                </AppButton>
                {/*    <Button type="submit" className={styles.btn}>Enviar</Button> */}
            </Form>
        </div>
    )
}

export default ResetPasswordForm;