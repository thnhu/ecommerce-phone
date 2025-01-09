import React from 'react'
import { RouterProvider } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage"
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <div>
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

      {/* <ProductsPage></ProductsPage> */}
      {/* <HomePage></HomePage> */}
      <CartPage></CartPage>

    </div>
  )
}

export default App
