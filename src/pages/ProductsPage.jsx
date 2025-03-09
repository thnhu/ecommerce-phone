// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ProductImagesSelection from "../Components/ProductsPageComponents/ProductImagesSelection";
import ProductDetail from "../Components/ProductsPageComponents/ProductDetails";
import ProductTabs from "../Components/ProductsPageComponents/ProductTabs";
import OtherProducts from "../Components/ProductsPageComponents/OtherProducts";
import Navbar from "../Components/UserPageComponents/Navbar.jsx";
import Footer from "../Components/UserPageComponents/Footer.jsx";
import api from "../services/api.js";

const ProductsPage = () => {
  //A sample Product
  const productId = "5d800a29-eae5-42dc-92cc-4b7cfe7d5276"

  const [product, setProduct] = useState({})
  useEffect(() => {
    const fetchData = async() => {
      const response = await api.get(`/phone/product/${productId}`)
      setProduct(() => response.data)
    }
    fetchData()
  }, [])

  return (
    <>
    {/* md:bg-slate-400 lg:bg-red-400 */}
    <Navbar></Navbar>
      <div className="md:flex md:flex-col px-[16px] md:px-[100px] mt-20 mb-10">
        <div className="md:flex">
          <ProductImagesSelection productImg={product.images}/>
          <ProductDetail product={product}/>
        </div>
        <ProductTabs/>
        
        {/* <OtherProducts/> */}
      </div>
    <Footer></Footer>
    </>
  );
};


export default ProductsPage;
