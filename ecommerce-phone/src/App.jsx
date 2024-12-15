import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes'
import Header from './components/Header';
const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            return (
              <Route path={route.path} element={<Page />} />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App