export interface CreateOrder {
  email: string;
  cart: string;
}


export interface OrderProduct {
  title: string;
  price: number;
   mainImage: string;
}

export interface OrderCartItem {
  _id: string,
  product: OrderProduct;
  quantity: number;
}

export interface OrderPurchaser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}

export interface GetOrderById {
  _id: string;
  code: string;
  amount: number;
  purchaser: OrderPurchaser;
  cart: OrderCartItem[];
  purchaseDateTime: string;
  mainImage: string;
}

