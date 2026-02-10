import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import styles from './styles.module.css';

type CheckoutProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    order: {
        email: string,
        first_name: string
    },
    total: number;
}
const CheckOutForm = ({ handleSubmit, handleOnChange, order, total }: CheckoutProps) => {

    return (
        <>
            <div className={styles.formContainer}>

                <p className={styles.formColorTitleP}>Card detalle</p>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel className={styles.formColorTitleP}>Nombre</FormLabel>
                        <FormControl
                            name="first_name"
                            value={order.first_name}
                            onChange={handleOnChange}

                            placeholder="Nombre"
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className={styles.formColorTitleP}>Email</FormLabel>
                        <FormControl
                            name="email"
                            value={order.email}
                            onChange={handleOnChange}
                            placeholder="Email"
                        />
                    </FormGroup>

                    <hr className={styles.formHr} />

                    <div className={styles.formSubTotal}>
                        <div>Subtotal: ${total}</div>
                        <div className={styles.formEnvio}>Envío: Gratis</div>
                    </div>

                    <Button type="submit" className={styles.formBtn}>
                        <span>$ {total}</span>
                        <span className={styles.formBtnSpan}>
                            CHECKOUT <BsArrowRight size={14} />
                        </span>
                    </Button>
                    
                </Form>
            </div>
        </>
    );
}

export default CheckOutForm;