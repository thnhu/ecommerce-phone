// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
// import CategoryPage from "./pages/CategoryPage"
import ProductsPage from "./pages/ProductsPage"
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

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
    path: "*",
    element: <NotFoundPage />,
  },

]);
function App() {
  const [getCategory, setCategory] = useState([]);
  useEffect(() => {
    const getAPI = async () => {
      const result = await axios.get("http://localhost:8080/phone/category");
      setCategory(result.data);
    }
    getAPI();
  },[])
  // return <RouterProvider router={router} />;
  return (
    <>
      <ul>
        {getCategory.map((value) => <li key={value.id}>{value.name}</li>)}
      </ul>
    </>
  )
}

export default App
