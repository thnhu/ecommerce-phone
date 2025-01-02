import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
//import NotFound from "../pages/404";

// import HomePage from "../pages/HomePage";

export const Paths = {
  login: "/login",
};

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <NotFound></NotFound>,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            async lazy() {
              let { Home } = await import("../pages/HomePage");
              return {
                Component: HomePage,
              };
            },
          },
          /*{
            path: "login",
            async lazy() {
              let { Login } = await import("../pages/Login");
              return {
                Component: Login,
              };
            },
          },*/
          {
            path: "product",
            async lazy() {
              let { ProductDetail } = await import("../pages/ProductsPage");
              return {
                Component: ProductsPage
              }
            }
          }
        ],
      },
    ],
  },
]);

export default router;
