import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Rating} from '@mui/material'
import api from "../../services/api";

function Sale() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await api.get(
  //       `/phone/product/status?page=${currentPage}&size=5&status=ACTIVE`
  //     );
  //     const newProducts = response.data.content || [];
  //     console.log(newProducts);
  //     // Kiểm tra và loại bỏ sản phẩm trùng lặp
  //     setProducts((prev) => {
  //       const existingIds = new Set(prev.map((p) => p.id)); // Tạo Set chứa các id hiện có
  //       const filteredNewProducts = newProducts.filter(
  //         (p) => !existingIds.has(p.id)
  //       ); // Lọc sản phẩm mới
  //       return [...prev, ...filteredNewProducts]; // Nối danh sách
  //     });

  //     setHasMore(newProducts.length === 5); // Kiểm tra còn dữ liệu không
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await api.get(
  //       `/phone/product/filter?status=ACTIVE&sortDirection=${selectedValue}`
  //     );
  //     const newProducts = response.data.content || [];
  //     if (isChecked) {
  //       setProducts(
  //         newProducts.filter((product) => product.discountDisplayed > 0)
  //       );
  //     } else {
  //       setProducts(newProducts);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts(0);
  // }, [currentPage, selectedValue, isChecked]);

  // const loadMoreProducts = () => {
  //   const nextPage = currentPage + 1;
  //   setCurrentPage(nextPage);
  //   fetchProducts(nextPage);
  // };
  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/phone/product/filter?status=ACTIVE&sortDirection=${selectedValue}&page=${page}&size=5`
      );
      
      const newProducts = response.data.content || [];
      const filteredProducts = isChecked 
        ? newProducts.filter(product => product.discountDisplayed > 0)
        : newProducts;

      // Reset products when filters change or first load
      if (page === 0) {
        setProducts(filteredProducts);
      } else {
        setProducts(prev => [...prev, ...filteredProducts]);
      }

      setHasMore(!response.data.last);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(0);
    fetchProducts(0);
  }, [selectedValue, isChecked]);

  useEffect(() => {
    if (currentPage > 0) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  const loadMoreProducts = () => {
    setCurrentPage(prev => prev + 1);
  };


  // Hàm định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  const calculateDiscountedPrice = (originalPrice, discount) => {
    return discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
  };

  if (loading) {
    return (
      <>
        <div className="min-h-80 bg-gray-100 text-center p-2">
          <h2 className="text-2xl font-bold mb-2">KHUYẾN MÃI HOT</h2>
        </div>
      </>
    );
  }

  if (products && products?.length == 0) {
    return (
      <section className="text-center p-10 bg-gray-100">
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

  return products.length > 0 ? (
    <section className="text-center p-2 bg-gray-100">
      {/* <h2 className="text-2xl font-bold mb-2">SẢN PHẨM HOT</h2> */}
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
          const imageUrl = product.images[0] || "";
          const hasDiscount = product.discountDisplayed > 0;
          const variantPrice = product.variants[0]?.price || 0;

          const displayedPrice = hasDiscount
            ? calculateDiscountedPrice(variantPrice, product.discountDisplayed)
            : variantPrice || "Không có giá";
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
                      {formatPrice(displayedPrice)}
                    </span>
                    {hasDiscount && variantPrice && (
                      <span className="line-through text-gray-600 font-bold">
                        {formatPrice(variantPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && !loading && (
      <button
        onClick={loadMoreProducts}
        className="mt-4 bg-white text-black border border-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
      >
        Xem thêm sản phẩm
      </button>      )}
    </section>
  ) : null;
}

export default Sale;
