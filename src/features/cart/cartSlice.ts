import { createSlice, current } from "@reduxjs/toolkit";
import type { Product } from "../../types/products";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../../types/cart/cartState";

const initialState: CartState = {
  cartItems: [],
  total: 0,
  updatedAt: new Date().toLocaleString(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    addItems: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      const productInCart = state.cartItems.find(
        item => item._id === product._id
      );

      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.updatedAt = new Date().toLocaleString();
      console.log(current(state).cartItems);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const pid = action.payload;

      state.cartItems = state.cartItems.filter(
        item => item._id !== pid
      );

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.updatedAt = new Date().toLocaleString();
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.updatedAt = new Date().toLocaleString();
    },
  },
});

export const { addItems, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
