import HomePage from "../pages/HomePage"
import ProductPage from "../pages/ProductPage"
import OrderPage from "../pages/OrderPage"

export const routes = [
    {
        path: "/",
        page: HomePage
    },
    {
        path: "/product",
        page: ProductPage
    },
    {
        path: "/order",
        page: OrderPage
    }
]

