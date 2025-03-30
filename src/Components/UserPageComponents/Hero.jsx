import React, { useState, useEffect } from "react";
import samsungLogo from "../../assets/images/logo-samsung.png";
import iPhoneLogo from "../../assets/images/logo-iPhone.png";
import xiaomiLogo from "../../assets/images/logo-xiaomi.png";
import oppoLogo from "../../assets/images/logo-oppo.png";
import banner3 from "../../assets/images/Promo-GalaxyZFold6.png";
import banner2 from "../../assets/images/EPromo-iPhone16.png";
import banner1 from "../../assets/images/promo-iphone14.png";
import banner4 from "../../assets/images/Promo-Z-Flip6-Tinh-nang-Galaxy-AI-moi-me-1024x576.jpg";
import { Link } from "react-router-dom";
import api from "../../services/api";
const Hero = () => {
  const banners = [banner1, banner2, banner3, banner4];
  const [currentBanner, setCurrentBanner] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/phone/category");
      setCategories(response.data);
      setLoading(false);
      // console.log(categories)
    } catch (err) {
      setError("Không thể tải danh sách nhà cung cấp");
      setLoading(false);
    }
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextBanner, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-100 mt-16">
      {/* Container chính chia 2 cột */}
      <div className="container mx-auto flex gap-4 py-4 px-4">
        {/* Danh mục bên trái */}
        <div className="w-1/5 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">DANH MỤC SẢN PHẨM</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                // to={`/phone/product/category/${category.id}?page=0&size=10&status=ACTIVE`}
                to={`/phone/product/category/${category.id}`}
              >
                <li
                  key={category.id}
                  className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer hover:text-blue-500"
                >
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Banner bên phải */}
        <div className="w-4/5 relative h-96 overflow-hidden rounded-lg shadow-md">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-contain mx-auto" // Thay đổi ở đây
              />
            </div>
          ))}
          {/* Navigation buttons */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
          >
            ❮
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
          >
            ❯
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Phần dưới giữ nguyên */}
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          ĐIỆN THOẠI DI ĐỘNG CHÍNH HÃNG
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          Hệ thống bán lẻ điện thoại với mạng lưới hàng ngàn cửa hàng trên toàn
          quốc
        </p>
        <div className="flex justify-center gap-4 items-center flex-wrap mt-1">
          <img
            className="w-24 object-contain"
            src={samsungLogo}
            alt="Samsung"
          />
          <img className="h-20 object-contain" src={iPhoneLogo} alt="iPhone" />
          <img className="h-12 object-contain" src={xiaomiLogo} alt="Xiaomi" />
          <img className="h-12 object-contain" src={oppoLogo} alt="Oppo" />
        </div>

        <div className="w-full flex justify-center mt-4">
          <div className="w-1/3 border-b border-gray-400"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
