// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/UserPageComponents/Navbar';
import Footer from '../Components/UserPageComponents/Footer';
import Hero from '../Components/UserPageComponents/Hero';
import Sale from '../Components/UserPageComponents/Sale';
import Newsletter from '../Components/UserPageComponents/Newsletter';
// import Review from '../pages/ProductsPageComponents/ReviewSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Sale />
      {/* <Review /> */}
      <Newsletter />
      <Footer />
    </>
    
  )
}

export default HomePage
