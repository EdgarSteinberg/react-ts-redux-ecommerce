import { Form, FormGroup, FormControl, FormLabel, Button, Alert, Spinner } from "react-bootstrap";

import type { Product } from "../../types/products";

type CreateProductData = Omit<Product, "_id" | "mainImage"> & {
    mainImage: File[];
};

type CreateProductFormProps = {
    data: CreateProductData;
    loading: boolean;
    message: { type: "success" | "error"; text: string } | null;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CreateProductForm = ({ data, loading, message, handleOnChange, handleTagsChange, handleImageChange, handleOnSubmit }: CreateProductFormProps) => {
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

            <FormGroup>
                <FormLabel>Tags</FormLabel>
                <FormControl
                    value={data.tags}
                    onChange={handleTagsChange}
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

export default CreateProductForm;
