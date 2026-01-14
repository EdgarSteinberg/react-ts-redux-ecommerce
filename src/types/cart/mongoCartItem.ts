import type { Product } from "../products";

// Item del carrito tal como viene de MongoDB
// - `product` viene populated desde el backend
// - Incluye la información completa del producto
// - Se usa en la respuesta de la API, no en Redux
export interface MongoCartItem {
  product: Product;
  quantity: number;
}
