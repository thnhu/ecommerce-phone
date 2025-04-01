import Navbar from "../Components/UserPageComponents/Navbar";
import Footer from "../Components/UserPageComponents/Footer";
import { useLocation, Link } from "react-router-dom";
import {Rating} from '@mui/material'
import React, { useEffect, useState } from "react";
import api from "../services/api";

function MainContent() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const size = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const pathName = location.pathname;
      const categoryId = pathName.slice(pathName.lastIndexOf("/") + 1);
      const response = await api.get(
        `/phone/product/filter?categoryId=${categoryId}&status=ACTIVE&sortDirection=${selectedValue}`
      );
      console.log(response.data.content[0].name);
      const newProducts = response.data.content || [];
      if (isChecked) {
        setProducts(
          newProducts.filter((product) => product.discountDisplayed > 0)
        );
      } else {
        setProducts(newProducts);
      }

      //Lấy thông tin category đang xài
      const categoryResponse = await api.get("/phone/category");
      setCurrentCategory(
        categoryResponse.data.filter((category) => category.id == categoryId)
      );
      console.log(currentCategory[0].name);
      setHasMore(newProducts.length === 5); // Kiểm tra còn dữ liệu không
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log(selectedValue);
  }, [selectedValue, isChecked]);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  // Hàm định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  // Hàm tính giá gốc chính xác (nếu discount là phần trăm)
  const calculateOriginalPrice = (price, discount) => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  if (loading) {
    if (loading) {
      return (
        <>
          <div className="min-h-80 bg-gray-100 text-center p-2">
            <h2 className="text-2xl font-bold mb-2">KHUYẾN MÃI HOT</h2>
          </div>
        </>
      );
    }
  }

  if (products && products?.length == 0) {
    return (
      <section className="text-center p-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-2 mt-40 md:mt-10">
          THƯƠNG HIỆU {currentCategory?.[0]?.name || "Không xác định"}
        </h2>
        <div className="flex px-2 py-5 items-center">
          <div className="flex px-3 justify-center">
            <p className="px-1">Đang giảm giá</p>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            ></input>
          </div>

          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option disabled selected>
              Giá
            </option>
            <option value="ASC">Tăng dần</option>
            <option value="DESC">Giảm dần</option>
          </select>
        </div>
        <p>Không có sản phẩm phù hợp</p>
      </section>
    );
  }

  return products?.length > 0 ? (
    <section className="text-center p-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-2 mt-40 md:mt-10">
        THƯƠNG HIỆU {currentCategory[0].name}
      </h2>
      {/* Filter bar */}
      <div className="flex px-2 py-5 items-center">
        <div className="flex px-3 justify-center">
          <p className="px-1">Đang giảm giá</p>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          ></input>
        </div>

        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option disabled selected>
            Giá
          </option>
          <option value="ASC">Tăng dần</option>
          <option value="DESC">Giảm dần</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-2">
        {products.map((product) => {
          const variant = product.variants?.[0] || { price: 0 };
          const imageUrl = product.images[0] || "";
          const hasDiscount = product.discountDisplayed > 0;
          const originalPrice = hasDiscount
            ? calculateOriginalPrice(
                product.variants[0].price,
                product.discountDisplayed
              )
            : product.variants[0]
            ? product.variants[0].price
            : "Không có giá";
          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block h-full"
            >
              <div className="relative bg-white rounded-lg shadow-md p-3 h-full flex flex-col justify-between hover:scale-105 transition-transform text-sm">
                {hasDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    Giảm {product.discountDisplayed}%
                  </span>
                )}

                {/* Container hình vuông */}
                <div className="relative pt-[100%] mb-2">
                  {" "}
                  {/* Tạo tỷ lệ 1:1 */}
                  <div className="absolute top-0 left-0 w-full h-full p-2 flex items-center justify-center">
                    <img
                      src={`data:image/*;base64,${imageUrl.data}`}
                      alt={product.name}
                      className="w-full h-full object-contain max-w-[80%] max-h-[80%]"
                    />
                  </div>
                </div>

                <h3 className="font-medium mb-1 line-clamp-2 min-h-[3em] text-lg">
                  {product.name}
                </h3>

                <div className="mt-auto">
                  <Rating
                    value={product.rating}
                    size="small"
                    defaultValue={0} precision={0.5} readOnly
                  />
                  <div className="flex flex-col">
                    <span className="text-rose-600 text-base font-bold text-lg">
                      {formatPrice(variant.price)}
                    </span>
                    {hasDiscount && (
                      <span className="line-through text-gray-600 font-bold">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={loadMoreProducts}
          disabled={loading}
          className="mt-4 bg-white text-black border border-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Đang tải..." : "Xem thêm sản phẩm"}
        </button>
      )}
    </section>
  ) : null;
}

const CategoryPage = () => {
  return (
    <>
      <Navbar />
      <MainContent />
      <Footer />
    </>
  );
};

export default CategoryPage;
