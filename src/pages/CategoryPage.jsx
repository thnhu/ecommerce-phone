// import Sidebar from "../Components/CategoryPageComponents/Sidebar";
// import MainContent from "../Components/CategoryPageComponents/MainContent"

// const CategoryPage = () => {
//   return (
//     <>
//       <div className="w-full px-[16px] md:px-[100px] flex"> 
//         <Sidebar className="w-1/3"/>
//         <MainContent/>
//       </div>
//     </>
//   )
// }

// export default CategoryPage;

// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/UserPageComponents/Navbar';
import Footer from '../Components/UserPageComponents/Footer';
import Hero from '../Components/UserPageComponents/Hero';
import Sale from '../Components/UserPageComponents/Sale';

const CategoryPage = () => {
  return (
    <>
      <Navbar />
      <Sale />
      <Footer />
    </>
  )
}

export default CategoryPage
