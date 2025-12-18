import type { MongoCartItem } from "./mongoCartItem";

export interface MongoCart {
  _id: string;
  products: MongoCartItem[];
}