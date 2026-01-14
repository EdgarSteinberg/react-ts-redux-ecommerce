import type { CartItem } from "./cartItem";

// Estado global del carrito en REDUX
// - Usa CartItem (producto plano + quantity)
// - No refleja la estructura del backend (Mongo)
// - Se calcula a partir de acciones (add/remove/update)
export interface CartState {
  cartItems: CartItem[];
  total: number;
  updatedAt: string;
}


/* export interface MongoCart {
  _id: string;
  products: CartItem[];

} */