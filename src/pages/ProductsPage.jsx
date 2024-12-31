// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductImagesSelection from "./ProductsPageComponents/ProductImagesSelection";
import ProductDetail from "./ProductsPageComponents/ProductDetails";
import ProductTabs from "./ProductsPageComponents/ProductTabs";
import OtherProducts from "./ProductsPageComponents/OtherProducts";

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
