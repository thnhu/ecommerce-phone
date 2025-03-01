// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductsPage from "./pages/ProductsPage"
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import PersonalPage from './pages/PersonalPage';
import ReviewPage from './pages/ReviewPage';
import OrderPage from './pages/OrderPage';

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
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '/review',
    element: <ReviewPage />,
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
    path: '/user',
    element: <PersonalPage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

]);
function App() {
  return <RouterProvider router={router} />;
  // return <PersonalPage></PersonalPage>
}

export default App
