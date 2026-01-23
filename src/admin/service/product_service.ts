const API_URL = "http://localhost:8080/api/products";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const res = await fetch(API_URL, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  const data = await res.json();
  return data.payload;
};

// GET PRODUCTS BY ID
export const getProductById = async (pid: string) => {
  const response = await fetch(`${API_URL}/${pid}`, {
    credentials: "include"
  })

  if (!response.ok) {
    throw new Error(`Error al obtener el producto con PID: ${pid}`)
  }

  const data = await response.json();
  return data.payload;
}


// CREAR PRODUCTOS
export const createProduct = async (formData: FormData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear producto");
  }

  return data;
};


// ELIMINAR PRODUCTOS
export const deleteProduct = async (pid: string) => {
  const response = await fetch(`${API_URL}/${pid}`, {
    method: "DELETE",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar el producto");
  }

  return data;
};


// ACTUALIZAR PRODUCTOS
export const updateProduct = async (pid: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/${pid}`, {
    method: "PUT",
    body: formData,
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar producto");
  }

  return data;
};



/* export const updateProduct = async (pid: string, formData: FormData) => {
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
 */

