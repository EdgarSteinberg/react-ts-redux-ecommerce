
import ProductForm from "./productForm";
import Loading from "../../components/loading/loading";
import { getProductById, updateProduct } from "../service/product_service";
import { useProductForm } from "../../hooks/useProductForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const EditProduct = () => {
    const { pid } = useParams<{ pid: string }>();

    const { data, setData, loading, setLoading, message, setMessage, handleOnChange, handleImageChange } = useProductForm();

    useEffect(() => {
        if (!pid) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);

                const product = await getProductById(pid);
                console.log(product)
                setData({
                    title: product.title,
                    shortDescription: product.shortDescription,
                    longDescription: product.longDescription,
                    price: product.price,
                    stock: product.stock,
                    brand: product.brand,
                    category: product.category,
                    discount: product.discount,
                    tags: product.tags || [], // 👈 ya es array
                    mainImage: [] // no se precargan files
                })
            } catch (error) {
                console.log(error)
                setMessage({ type: 'error', text: "Error al cargar el producto" })
            } finally {
                setLoading(false)
            }

        }
        fetchProduct();
    }, [pid]);


    // Submit
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!pid) {
            setMessage({ type: "error", text: "ID de producto inválido" });
            return;
        }

        if (!data.title || !data.price || !data.stock || !data.category) {
            setMessage({ type: "error", text: "Los campos título, precio, stock y categoría son obligatorios." });
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("shortDescription", data.shortDescription);
        formData.append("longDescription", data.longDescription);
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock));
        formData.append("brand", data.brand);
        formData.append("category", data.category);
        formData.append("discount", String(data.discount));

        // data.tags ya es un string[]
        data.tags.forEach(tag => {
            formData.append("tags", tag); // agrega cada tag como un campo separado
        });
        data.mainImage.forEach(file => {
            formData.append("mainImage", file);
        });

        setLoading(true);
        setMessage(null);

        try {
            await updateProduct(pid, formData); // SERVICE 

            setMessage({ type: "success", text: "Producto actualizado con éxito" });

            setData({
                title: "", shortDescription: "", longDescription: "", price: "",
                stock: "", brand: "", category: "", discount: "", tags: [], mainImage: []
            });

        } catch (error: any) {
            console.error(error);
            setMessage({ type: "error", text: error.message ? `${error.message}` : "Error al actualizar el producto" });

        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />

    return (

        <ProductForm
            loading={loading}
            message={message}
            data={data}
            handleOnChange={handleOnChange}
            handleImageChange={handleImageChange}
            handleOnSubmit={handleOnSubmit}
            setData={setData}
        />
    );
};

export default EditProduct;
