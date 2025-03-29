// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import PersonalPage from "./pages/PersonalPage";
import ReviewPage from "./pages/ReviewPage";
import OrderPage from "./pages/OrderPage";
import VNPaySuccesss from "./pages/vnpaySuccess";
import VNPayFail from "./pages/VNPayFail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:productId",
    element: <ProductsPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user",
    element: <PersonalPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/staff",
    element: <StaffPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/vnpay/success",
    element: <VNPaySuccesss/>
  },
  {
    path: "/vnpay/fail",
    element: <VNPayFail/>
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
