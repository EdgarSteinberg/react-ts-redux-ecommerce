
import ProductForm from "./productForm";
import Loading from "../../components/loading/loading";
import { createProduct } from "../service/product_service";
import { useProductForm } from "../../hooks/useProductForm";


const CreateProduct = () => {
  const { data, setData, loading, setLoading, message, setMessage, handleOnChange, handleImageChange } = useProductForm();


  // Submit
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      await createProduct(formData); // SERVICE 

      setMessage({ type: "success", text: "Producto creado con éxito" });

      setData({
        title: "", shortDescription: "", longDescription: "", price: 0, stock: 0, brand: "", category: "", discount: 0, tags: [], mainImage: []
      });

    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error al crear el producto" });

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
      setData={setData}
      handleOnChange={handleOnChange}
      handleImageChange={handleImageChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
};

export default CreateProduct;
