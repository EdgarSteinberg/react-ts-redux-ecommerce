import styles from './styles.module.css'
import AppButton from "../appButton/appbutton";

interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}


const Counter = ({ count, increment, decrement }: CounterProps) => {

    const width = '34px'
    return (
        <div className={styles.countContainer}>
            <p className={styles.parrafo}>Cantidad:</p>
            <AppButton type={'button'} width={width} onClick={decrement}>
                -
            </AppButton>
            {/*  <Button onClick={decrement} className={styles.countBtnDecrement}>-</Button> */}
            <p className={styles.count}>{count}</p>
            {/* <Button onClick={increment} className={styles.countBtn}>+</Button> */}
            <AppButton type={'button'} width={width} onClick={increment}>
                +
            </AppButton>
        </div>
    )
}

export default Counter;