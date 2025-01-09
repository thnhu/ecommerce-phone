// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { routes } from './routes'

import CategoryPage from "./pages/CategoryPage"
// import ProductsPage from "./pages/ProductsPage"

// import Header from './components/Header';
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
    </div>
  )
}

export default App