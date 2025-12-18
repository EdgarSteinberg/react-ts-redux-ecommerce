import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

const CartWidget = () => {
    return (
        <Link to="/cart">
            <TiShoppingCart size={24} />
        </Link>
    );
};

export default CartWidget;
