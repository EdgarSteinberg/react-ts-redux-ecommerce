import { Button } from "react-bootstrap"
import styles from './styles.module.css';

interface AppButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: string;
    width?: string;
}

const AppButton = ({ children, variant, width, onClick, type }: AppButtonProps) => {

    return (
        <>
            <Button
                type={type}
                onClick={onClick}
                variant={variant}
                style={{ width: width }}
                className={styles.btn}
            >{children}
            </Button>

        </>
    )
}

export default AppButton;