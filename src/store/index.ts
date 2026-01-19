/* import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'

const store = configureStore({
    reducer: {
        cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;//TS
export type AppDispatch = typeof store.dispatch;//TS

export default store; */



import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

// 👉 Storage por defecto de redux-persist (usa localStorage del navegador)
import storage from 'redux-persist/lib/storage';

// 👉 Funciones clave de redux-persist
// persistReducer: envuelve un reducer para hacerlo persistente
// persistStore: crea el persistor que rehidrata el store al iniciar la app
import { persistReducer, persistStore } from 'redux-persist';

// 👉 Configuración de persistencia
// key: nombre bajo el cual se guarda en localStorage
// storage: dónde se persiste (localStorage)
const persistConfig = {
  key: 'cart',
  storage,
};

// 👉 Reducer del carrito envuelto con persistencia
// Todo lo que maneje este reducer se guarda y se restaura automáticamente
const persistedCartReducer = persistReducer(
  persistConfig,
  cartReducer
);

// 👉 Store global de Redux
// Usamos el reducer persistido en lugar del reducer normal
export const store = configureStore({
  reducer: {
    cartReducer: persistedCartReducer,
  },
});

// 👉 Persistor que se conecta con <PersistGate />
// Se encarga de rehidratar el estado antes de renderizar la app
export const persistor = persistStore(store);

// 👉 Tipos para TypeScript
// RootState: estado global del store
// AppDispatch: tipo del dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
