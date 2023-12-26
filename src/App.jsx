import React,{useEffect} from 'react';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailsPage';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch,useSelector } from 'react-redux';
import PageNotFound from './pages/404';
import AdminHome  from './pages/AdminHome.jsx'
import AdminProductDetailPage from './pages/AdminProductDetailPage.jsx';
import AdminProductFormPage from './pages/AdminProductFormPage.jsx';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      
        <Home></Home>
      
    ),
  },
  {
    path: '/admin',
    element: (
      
        <AdminHome></AdminHome>
      
    ),
  },
  {
    path: '/cart',
    element: (
      
        <CartPage></CartPage>
      
    ),
  },

  {
    path: '/product-detail/:id',
    element: (
      
        <ProductDetailPage></ProductDetailPage>
      
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      
        <AdminProductDetailPage></AdminProductDetailPage>
      
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      
        <AdminProductFormPage></AdminProductFormPage>
      
    ),
  },
 
  {
    path: '/admin/product-form/edit/:id',
    element: (
      
        <AdminProductFormPage></AdminProductFormPage>
      
    ),
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  
  return (
    <>
      <div className="App">
        
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        
      </div>
    </>
  );
}

export default App;
