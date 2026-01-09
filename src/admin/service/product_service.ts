const API_URL = "http://localhost:8080/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();
  return data.payload;
};

export const deleteProduct = async (pid: string) => {
  const res = await fetch(`${API_URL}/${pid}`, {
    method: "DELETE",
  });
  return res.json();
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