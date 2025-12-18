import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'

const store = configureStore({
    reducer: {
        cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;//TS
export type AppDispatch = typeof store.dispatch;//TS

export default store;