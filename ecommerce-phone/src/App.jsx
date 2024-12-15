import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes'
import Header from './components/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import NewArrivals from './components/NewArrivals/NewArrivals';
import Section from './components/Section/Section';
const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Hero />
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
      <NewArrivals />
      <Section />
      <Footer />
    </div>
  )
}

export default App