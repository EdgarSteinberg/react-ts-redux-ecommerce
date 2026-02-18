import { Form, FormGroup, FormControl, FormLabel, Button, Alert, Spinner } from "react-bootstrap";
import type { ProductFormData } from "../../hooks/useProductForm";
import styles from './styles.module.css';
import AppButton from "../../components/appButton/appbutton";

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

    const width = '100%'

    return (
        <div style={{ backgroundColor: 'rgb(221, 221, 221)' }}>
            <div style={{ width: '80%', margin: '0 auto', border: '1px solid #dee2e6', borderRadius: '8px' }}>

                {message && (
                    <Alert variant={message.type === "success" ? "success" : "danger"} style={{ textAlign: 'center' }}>
                        {message.text}
                    </Alert>
                )}

                <div
                    style={{
                        height: "calc(95vh - 120px)", // define “la pantalla”
                        display: "flex",
                        flexDirection: "column",
                        margin: "0 auto",
                        maxWidth: "1200px"
                    }}
                >
                    <h2 className="text-center">
                        {data.title ? `Editando: ${data.title}` : "Nuevo producto"}
                    </h2>
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",

                        }}
                    >
                        <Form onSubmit={handleOnSubmit}>

                            <div>
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

                            </div>

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
                                    /*      type="number" */
                                    name="price"
                                    value={data.price}
                                    onChange={handleOnChange} />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Stock</FormLabel>
                                <FormControl
                                    /* type="number" */
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
                                    /*  type="number" */
                                    name="discount"
                                    value={data.discount}
                                    onChange={handleOnChange} />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Tags</FormLabel>
                                <FormControl
                                    value={data.tags.join(", ")}
                                    onChange={(e) => {
                                        const tags = e.target.value
                                            .split(",")
                                            .map(t => t.trim())
                                            .filter(Boolean);

                                        setData(prev => ({
                                            ...prev,
                                            tags
                                        }));
                                    }}
                                    placeholder="classic, retro, popular"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Imágenes</FormLabel>
                                <FormControl
                                    type="file"
                                    multiple
                                    onChange={handleImageChange} />
                            </FormGroup>
                            <br></br>
                            {/*      <Button type="submit" disabled={loading} className={styles.btn}>
                                {loading ? <><Spinner size="sm" /> Creando...</> : "Enviar"}
                            </Button> */}
                            <AppButton type={'submit'} width={width}>
                                Enviar
                            </AppButton>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
