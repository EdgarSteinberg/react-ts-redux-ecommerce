import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const CartWidget = () => {
    const cartItems = useSelector(
        (state: RootState) => state.cart.cartItems
    );

    const totalQuantity = cartItems.reduce(
        (acc, item) => acc + item.quantity, 0);

    return (
        <>
            <TiShoppingCart size={24} />
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
            )}
       </>
    );
};

export default CartWidget;
