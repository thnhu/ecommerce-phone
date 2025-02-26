// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/UserPageComponents/Navbar';
import Footer from '../Components/UserPageComponents/Footer';
import Newsletter from '../Components/UserPageComponents/Newsletter';
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
