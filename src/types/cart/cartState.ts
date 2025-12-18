import type { CartItem } from "./cartItem";

//Redux (estado plano)
export interface CartState {
  cartItems: CartItem[];
  total: number;
  updatedAt: string;
}

export interface MongoCart {
  _id: string;
  products: CartItem[];

}