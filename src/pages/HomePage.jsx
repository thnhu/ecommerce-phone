// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Hero from '../Components/Hero/Hero';
import NewArrivals from '../Components/NewArrivals/NewArrivals';
// import Section from '../Components/Section/Section';
import Newsletter from '../Components/Newsletter';
// import Review from '../pages/ProductsPageComponents/ReviewSection';
import RefreshToken from "../Components/ProductsPageComponents/RefreshToken";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <NewArrivals />
      {/* <Review /> */}
      <Newsletter />
      {/* <Section /> */}
      <Footer />
      <RefreshToken></RefreshToken>
    </>
    
  )
}

export default HomePage
