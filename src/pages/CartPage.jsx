// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter';
import Cart from './Cart';

const CartPage = () => {
  return (
    <>
      <Navbar />
      <Cart />
      <Newsletter />
      <Footer />
    </>

  )
}

export default CartPage
