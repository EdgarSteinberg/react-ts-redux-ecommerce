export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  discount?: number;
  tags?: string[];
  mainImage: string[];
  owner?: string; // 👈 opcional
}

export interface ApiResponse<T> {
  status: string;
  payload: T;
}
