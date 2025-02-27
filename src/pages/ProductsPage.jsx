// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductImagesSelection from "../Components/ProductsPageComponents/ProductImagesSelection";
import ProductDetail from "../Components/ProductsPageComponents/ProductDetails";
import ProductTabs from "../Components/ProductsPageComponents/ProductTabs";
import OtherProducts from "../Components/ProductsPageComponents/OtherProducts";
import Navbar from "../Components/UserPageComponents/Navbar.jsx";
import Footer from "../Components/UserPageComponents/Footer.jsx";

const ProductsPage = () => {
  return (
    <>
    {/* md:bg-slate-400 lg:bg-red-400 */}
    <Navbar></Navbar>
      <div className="md:flex md:flex-col px-[16px] md:px-[100px] mt-20 mb-10">
        <div className="md:flex">
          <ProductImagesSelection/>
          <ProductDetail starsRating="5"/>
        </div>
        <ProductTabs/>
        
        <OtherProducts/>
      </div>
    <Footer></Footer>
    </>
  );
};

export default ProductsPage;
