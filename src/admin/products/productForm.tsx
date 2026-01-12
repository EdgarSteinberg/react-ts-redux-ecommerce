import { Form, FormGroup, FormControl, FormLabel, Button, Alert, Spinner } from "react-bootstrap";
import type { ProductFormData } from "../../hooks/useProductForm";


type ProductFormDataProps = {
    data: ProductFormData;
    setData: React.Dispatch<React.SetStateAction<ProductFormData>>;
    loading: boolean;
    message: { type: "success" | "error"; text: string } | null;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ProductForm = ({ data, loading, message, handleOnChange, handleImageChange, handleOnSubmit, setData }: ProductFormDataProps) => {
    return (
        <Form onSubmit={handleOnSubmit}>
            {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"}>
                    {message.text}
                </Alert>
            )}

            <FormGroup>
                <FormLabel>Título</FormLabel>
                <FormControl name="title" value={data.title} onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Descripción corta</FormLabel>
                <FormControl
                    as="textarea"
                    name="shortDescription"
                    value={data.shortDescription}
                    onChange={handleOnChange}
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>Descripción larga</FormLabel>
                <FormControl
                    as="textarea"
                    name="longDescription"
                    value={data.longDescription}
                    onChange={handleOnChange}
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>Precio</FormLabel>
                <FormControl
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Stock</FormLabel>
                <FormControl
                    type="number"
                    name="stock"
                    value={data.stock}
                    onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Marca</FormLabel>
                <FormControl
                    name="brand"
                    value={data.brand}
                    onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Categoría</FormLabel>
                <FormControl
                    name="category"
                    value={data.category}
                    onChange={handleOnChange} />
            </FormGroup>

            <FormGroup>
                <FormLabel>Descuento (%)</FormLabel>
                <FormControl
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={handleOnChange} />
            </FormGroup>

            {/* <FormGroup>
                <FormLabel>Tags</FormLabel>
                <FormControl
                    name="tags"
                    value={data.tags}
                    onChange={handleOnChange}
                    placeholder="ropa, verano, oferta"
                />
            </FormGroup> */}

            <FormGroup>
                <FormLabel>Tags</FormLabel>
                <FormControl
                    value={data.tags.join(", ")} // muestra como string separado por comas
                    onChange={e =>
                        setData(prev => ({
                            ...prev,
                            tags: e.target.value
                                .split(",")
                                .map(t => t.trim())
                                .filter(Boolean)
                        }))
                    }
                    placeholder="ropa, verano, oferta"
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>Imágenes</FormLabel>
                <FormControl
                    type="file"
                    multiple
                    onChange={handleImageChange} />
            </FormGroup>

            <Button type="submit" disabled={loading}>
                {loading ? <><Spinner size="sm" /> Creando...</> : "Enviar"}
            </Button>
        </Form>
    );
};

export default ProductForm;
