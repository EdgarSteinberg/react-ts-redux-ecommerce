import { Button } from "react-bootstrap";
import styles from './styles.module.css'

interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}


const Counter = ({ count, increment, decrement }: CounterProps) => {


    return (
        <div className={styles.countContainer}>
            <p style={{marginTop: '14px', marginRight: '10px'}}>Cantidad:</p>
            <Button onClick={decrement}>-</Button>
            <p className={styles.count}>{count}</p>
            <Button onClick={increment}>+</Button>
        </div>
    )
}

export default Counter;