import type { Product } from "../../types/products";
import { addItems } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useCounter } from "../../hooks/useCounter";
import { useNavigate } from "react-router-dom";
import DetailCard from "./detailCard";
import { postFetchCartAddProduct } from "./service/carts/carts_service";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { toast } from "react-toastify";

interface ProductItemProps { product: Product; }

const ProductItem = ({ product }: ProductItemProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { count, increment, decrement } = useCounter(1, product.stock); // CUSTOMHOOK


    const user = useSelector((state: RootState) => state.auth.user);

    const handleAddToCart = async (redirect: "cart" | "shop") => {
        if (!user?.cart) {
            toast.success("Tenés que iniciar sesión");
            navigate("/login");
            return;
        }

        dispatch(addItems({ product, quantity: count }));
        await postFetchCartAddProduct(user.cart, product._id, count);

        if (redirect === "cart") {
            navigate("/cart");
            return;
        }

        toast.success("🛒 Producto agregado al carrito");
    };

    // Devuelve la URL correcta de la imagen (externa o local)
    const getImageSrc = (image?: string) => {
        if (!image) return undefined;

        return image.startsWith("http")
            ? image
            : `http://localhost:8080/img/${image}`;
    };

    return (
        <>
            <DetailCard product={product} handleAddToCart={handleAddToCart} getImageSrc={getImageSrc} count={count} increment={increment} decrement={decrement} />
        </>
    );
};

export default ProductItem;