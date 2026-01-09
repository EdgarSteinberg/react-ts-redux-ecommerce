import { useState } from "react";
import type { Product } from "../../types/products";
import CreateProductForm from "./createProductForm";
import Loading from "../../components/loading/loading";
import { createProduct } from "../service/product_service";

// Usa Product como base, pero adapta mainImage a File[] porque en el formulario aún no son URLs ademas omite _id y mainImage
type CreateProductData = Omit<Product, "_id" | "mainImage"> & {
  mainImage: File[];
};

const CreateProduct = () => {
  const [data, setData] = useState<CreateProductData>({
    title: "", shortDescription: "", longDescription: "", price: 0, stock: 0, brand: "", category: "", discount: 0, tags: [], mainImage: []
  });

  type Message = { type: "success" | "error"; text: string; };

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);


  // Inputs texto y números
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  // Tags separados por coma
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      tags: e.target.value.split(",").map(t => t.trim())
    }));
  };

  // Imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setData(prev => ({
      ...prev,
      mainImage: Array.from(files)
    }));
  };


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
    formData.append("tags", JSON.stringify(data.tags));

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

    <CreateProductForm
      loading={loading}
      message={message}
      data={data}
      handleOnChange={handleOnChange}
      handleTagsChange={handleTagsChange}
      handleImageChange={handleImageChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
};

export default CreateProduct;
