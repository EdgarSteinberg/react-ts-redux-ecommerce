import type { Product } from "../products";

// Item del carrito usado en REDUX
// - Parte del mismo modelo que Product
// - Agrega `quantity` para manejar el estado del carrito
// - NO representa la estructura que viene del backend (Mongo)
export interface CartItem extends Product {
  quantity: number;
}
