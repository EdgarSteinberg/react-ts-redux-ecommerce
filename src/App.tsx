//Css Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';

//React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Redux
/* import { Provider, useDispatch } from 'react-redux';

import store from './store'; */

//Componentes
import ProductsListContainer from './components/productsListContainer/productsListContainer';
import NotFound from './components/notFound/notFound';
import NavBar from './components/navBar/navBar';
import ProductDetailContar from './components/productDetailContainer/productDetailContainer';
import Cart from './components/cart/cart';
import CreateProduct from './admin/products/createProduct';
import ProductList from './admin/products/productList';
import EditProduct from './admin/products/editProduct';
import Register from './components/auth/register/register';
import Login from './components/auth/login/login';
import UsersList from './admin/users/usersList';
import SendResetEmail from './components/auth/send_reset_email/sendResetEmail';
import ResetPassword from './components/auth/ResetPassword/resetPassword';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUserRedux } from './features/auth/authSlice';
import { currentUser } from './components/auth/service/login';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const data = await currentUser();
        dispatch(setUserRedux(data ? data.user : null));
      } catch {
        dispatch(setUserRedux(null));
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  return (
    <>

        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* rutas públicas */}
            <Route path='/' element={<ProductsListContainer />} />
            <Route path='categories/:category' element={<ProductsListContainer />} />
            <Route path='/products/:pid' element={<ProductDetailContar />} />
            <Route path='/cart' element={<Cart />} />

            {/* rutas auth */}
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sendResetEmail' element={<SendResetEmail />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            {/* ruta not found */}
            <Route path='*' element={<NotFound />} />

            {/* rutas admin */}
            <Route path='/admin/products' element={<ProductList />} />
            <Route path='/admin/products/new' element={<CreateProduct />} />
            <Route path="/admin/products/:pid/edit" element={<EditProduct />} />

            <Route path="/admin/users" element={<UsersList />} />
          </Routes>

        </BrowserRouter>

 
    </>
  )
}

export default App
