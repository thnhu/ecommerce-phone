// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import axios from 'axios';
import ProductsPage from "./pages/ProductsPage"
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/product',
    element: <ProductsPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/login',
    element: <LogInPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

]);
function App() {
  // return <RouterProvider router={router} />;
  return <AdminPage></AdminPage>;
  // const [getCategory, setCategory] = useState([]);
  // useEffect(() => {
  //   const getAPI = async () => {
  //     const result = await axios.get("http://localhost:8080/phone/category");
  //     setCategory(result.data);
  //   }
  //   getAPI();
  // },[])
  // return (
  //   <>
  //     <ul>
  //       {getCategory.map((value) => <li key={value.id}>{value.name}</li>)}
  //     </ul>
  //   </>
  // )
  
}

export default App
