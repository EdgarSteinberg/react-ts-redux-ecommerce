import type { Product } from "../products";


//Redux (estado plano)
export interface CartItem extends Product {
  quantity: number;
}