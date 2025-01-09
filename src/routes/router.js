import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import CategoryPage from "./pages/CategoryPage"
import ProductsPage from "../pages/ProductsPage"
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import NotFoundPage from '../pages/NotFoundPage';

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

export default router