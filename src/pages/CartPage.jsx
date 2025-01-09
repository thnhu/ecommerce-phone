// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter';
import Cart from './CartPageComponents/Cart';
// import OrderSummary from './CartPageComponents/OrderSummary';
// import PaymentOptions from './CartPageComponents/PaymentOptions';

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Cart />
      {/* <OrderSummary /> */}
      {/* <PaymentOptions /> */}
      <Newsletter />
      <Footer />
    </>

  )
}

export default HomePage
