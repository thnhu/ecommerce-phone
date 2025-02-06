// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductImagesSelection from "../Components/ProductsPageComponents/ProductImagesSelection";
import ProductDetail from "../Components/ProductsPageComponents/ProductDetails";
import ProductTabs from "../Components/ProductsPageComponents/ProductTabs";
import OtherProducts from "../Components/ProductsPageComponents/OtherProducts";

const ProductsPage = () => {
  return (
    <>
    {/* md:bg-slate-400 lg:bg-red-400 */}
      <div className="md:flex md:flex-col px-[16px] md:px-[100px] ">
        <div className="md:flex">
          <ProductImagesSelection/>
          <ProductDetail starsRating="5"/>
        </div>
        <ProductTabs/>
        
        <OtherProducts/>
      </div>
    </>
  );
};

export default ProductsPage;
