import type { Product } from "../../types/products";
import ProductsCard from "./productsCard";
import styles from './styles.module.css';

interface ProductsListProps {
    products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {

    return (
        <div className={styles.itemContainer}>
            {products.length > 0 ? (
                products.map((product) => (
                        <ProductsCard key={product._id} product={product}/>
                ))
            ) : (
                <p>No hay Productos para mostrar</p>
            )}
        </div>
    )
}

export default ProductsList;