//Css Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';

//React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Redux
import { Provider } from 'react-redux';
import store from './store';

//Componentes
import ProductsListContainer from './components/productsListContainer/productsListContainer';
import NotFound from './components/notFound/notFound';
import NavBar from './components/navBar/navBar';
import ProductItemContainer from './components/productDetailContainer/productDetailContainer';
import Cart from './components/cart/cart';
import CreateProduct from './admin/products/createProduct';
import ProductList from './admin/products/productList';
import EditProduct from './admin/products/editProduct';

function App() {


  return (
    <>
      <Provider store={store}>

        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* rutas públicas */}
            <Route path='/' element={<ProductsListContainer />} />
            <Route path='categories/:category' element={<ProductsListContainer />} />
            <Route path='/products/:pid' element={<ProductItemContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />

            {/* rutas admin */}
            <Route path='/admin/products' element={<ProductList />} />
            <Route path='/admin/products/new' element={<CreateProduct />} />
            <Route path="/admin/products/:pid/edit" element={<EditProduct />} />
          </Routes>

        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
