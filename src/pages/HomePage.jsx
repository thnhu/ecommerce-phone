// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/UserPageComponents/Navbar';
import Footer from '../Components/UserPageComponents/Footer';
import Hero from '../Components/UserPageComponents/Hero';
import NewArrivals from '../Components/UserPageComponents/NewArrivals';
import Newsletter from '../Components/UserPageComponents/Newsletter';
// import Review from '../pages/ProductsPageComponents/ReviewSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <NewArrivals />
      {/* <Review /> */}
      <Newsletter />
      <Footer />
    </>
    
  )
}

export default HomePage
