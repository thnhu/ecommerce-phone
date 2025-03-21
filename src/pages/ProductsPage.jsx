// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ProductImagesSelection from "../Components/ProductsPageComponents/ProductImagesSelection";
import ProductDetail from "../Components/ProductsPageComponents/ProductDetails";
import ProductTabs from "../Components/ProductsPageComponents/ProductTabs";
import OtherProducts from "../Components/ProductsPageComponents/OtherProducts";
import Navbar from "../Components/UserPageComponents/Navbar.jsx";
import Footer from "../Components/UserPageComponents/Footer.jsx";
import api from "../services/api.js";
import { useParams } from 'react-router-dom';

const ProductsPage = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/phone/product/${productId}`);
      setProduct(() => response.data);
      setIsLoading(false)
    };
    fetchData();
  }, []);

  return (
    <>
      {/* md:bg-slate-400 lg:bg-red-400 */}
      <Navbar></Navbar>
      <div className="md:flex md:flex-col px-[16px] md:px-[150px] mt-20 mb-10">

        {!isLoading && <div className="md:flex">
          <ProductImagesSelection productImg={product.images} />
          <ProductDetail product={product} />
        </div>}
        {!isLoading && <ProductTabs product={product}/>}

        {/* <OtherProducts/> */}
      </div>
      <Footer></Footer>
    </>
  );
};

export default ProductsPage;
