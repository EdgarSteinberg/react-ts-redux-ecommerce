//Css Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';

//React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

//Componentes
import ProductsListContainer from './components/productsListContainer/productsListContainer';
import NotFound from './components/notFound/notFound';
import NavBar from './components/navBar/navBar';
import ProductItemContainer from './components/productDetailContainer/productDetailContainer';
import Cart from './components/cart/cart';
import CreateProduct from './admin/products/createProduct';
import ProductList from './admin/products/productList';
import EditProduct from './admin/products/editProduct';
import Register from './components/register/register';
import Login from './components/login/login';
import UsersList from './admin/users/usersList';

function App() {


  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              {/* rutas públicas */}
              <Route path='/' element={<ProductsListContainer />} />
              <Route path='categories/:category' element={<ProductsListContainer />} />
              <Route path='/products/:pid' element={<ProductItemContainer />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />

              {/* rutas admin */}
              <Route path='/admin/products' element={<ProductList />} />
              <Route path='/admin/products/new' element={<CreateProduct />} />
              <Route path="/admin/products/:pid/edit" element={<EditProduct />} />

              <Route path="/admin/users" element={<UsersList />} />
            </Routes>

          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
