const API_URL = "http://localhost:8080/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  const data = await res.json();
  return data.payload;
};

export const deleteProduct = async (pid: string) => {
  const response = await fetch(`${API_URL}/${pid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar producto");
  }

  return response.json();
};

export const createProduct = async (formData: FormData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al crear producto");
  }

  return response.json();
};


export const updateProduct = async (pid: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/${pid}`, {
    method: "PUT",
    body: formData
    // NO headers Content-Type
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el producto");
  }

  return response.json();
};


export const getProductById = async (pid: string) => {
  const response = await fetch(`${API_URL}/${pid}`)

  if (!response.ok) {
    throw new Error(`Error al obtener el producto con PID: ${pid}`)
  }

  const data = await response.json();
  return data.payload;
}