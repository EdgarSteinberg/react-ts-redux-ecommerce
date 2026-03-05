import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import styles from '../styles.module.css';

const CartWidget = () => {

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const user = useSelector((state: RootState) => state.auth.user)
    if (!user) return <TiShoppingCart size={24} />;
    /* console.log('userCartWidget', user.cart.products ) */

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            {/* <TiShoppingCart size={24} />
            {totalQuantity > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: -6,
                        right: -10,
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                    }}
                >
                    {totalQuantity}
                </span>
            )} */}
            <>
                <div className={styles.cartContainer}>
                    <TiShoppingCart size={24} />

                    {totalQuantity > 0 && (
                        <span className={styles.cartBadge}>
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </>
        </>
    );
};

export default CartWidget;
