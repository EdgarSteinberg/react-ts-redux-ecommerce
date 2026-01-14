import type { MongoCartItem } from "./mongoCartItem";

// Carrito tal como viene del BACKEND (Mongo)
// - `products` contiene items con `product` populated + `quantity`
// - Esta estructura NO es plana
// - Se usa para fetch / render directo o para transformar a Redux
export interface MongoCart {
  _id: string;
  products: MongoCartItem[];
}
