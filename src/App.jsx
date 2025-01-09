import React from 'react'
import { RouterProvider } from "react-router-dom";

import CategoryPage from "./pages/CategoryPage"
import ProductsPage from "./pages/ProductsPage"
import ProductsPage from "./pages/ProductsPage"
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <div className="bg-red-400 md:bg-slate-400 lg:bg-green-400">
      {/* <Header />
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            return (
              <Route path={route.path} element={<Page />} />
            )
          })}
        </Routes>
      </Router> */
      }

      <CategoryPage/>
      {/* <ProductsPage></ProductsPage> */}
      {/* <HomePage></HomePage> */}
      <CartPage></CartPage>

    </div>
  )
}

export default App
