import type { Product } from "../products";


export interface MongoCartItem {
    product: Product; // viene populated
    quantity: number;
}