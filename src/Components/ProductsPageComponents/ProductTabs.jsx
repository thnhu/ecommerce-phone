import { useState, useEffect } from "react";
import "./ProductsPage.css";
import ReviewSection from "./ReviewSection";
import api from "../../services/api";

const ProductAttribute = ({ product }) => {
  const [phoneData, setPhoneData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/phone/product/${product.id}/attribute`
        );
        setPhoneData(response.data);
        // console.log(response);
      } catch (e) {
        console.log("Lỗi thuộc tính sản phẩm" + e);
      }
    };
    fetchData();
  }, [product]);

  return (
    <>
      {phoneData && (
        <div className="mx-10 p-6 bg-white rounded-lg shadow-lg">
          <ul className="space-y-4">
            <li className="flex justify-between text-lg">
              <span className="font-medium">Hệ điều hành:</span>
              <span>{phoneData.os}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">CPU:</span>
              <span>{phoneData.cpu}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">RAM:</span>
              <span>{phoneData.ram}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">Bộ nhớ (ROM):</span>
              <span>{phoneData.rom}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">Camera:</span>
              <span>{phoneData.camera}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">Pin:</span>
              <span>{phoneData.pin}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">Thẻ sim:</span>
              <span>{phoneData.sim}</span>
            </li>
            <li className="flex justify-between text-lg">
              <span className="font-medium">Khác:</span>
              <span>{phoneData.others}</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

const ProductFAQs = () => {
  return (
    <>
      <div className="mx-10 p-6 bg-white rounded-lg shadow-lg">
        <ul className="space-y-4 font-sans">
          <li className="flex text-lg">
            <div className="text-sm md:text-lg grid grid-cols-[1fr_3fr] gap-4">
              <p className="whitespace-nowrap">Chính sách bảo hành:</p>
              <p className="font-light text-gray-600 opacity-90 hover:text-gray-800 hover:cursor-default">
                Chỉ áp dụng cho sản phẩm chính, KHÔNG áp dụng cho phụ kiện đi
                kèm sản phẩm chính. Bảo hành trong vòng 15 ngày (tính từ ngày
                cửa hàng nhận máy ở trạng thái lỗi và đến ngày gọi khách hàng ra
                lấy lại máy đã bảo hành).
              </p>
            </div>
          </li>
          <li className="flex text-lg">
            <div className="text-sm md:text-lg grid grid-cols-[1fr_3fr] gap-4">
              <p className="whitespace-nowrap">Chính sách hoàn tiền:</p>
              <p className="font-light text-gray-600 opacity-90 hover:text-gray-800 hover:cursor-default">
                Áp dụng cho sản phẩm mua tại Didongverse
                <p>
                  Sản phẩm đổi trả phải giữ nguyên 100% hình dạng ban đầu và đủ
                  điều kiện bảo hành của hãng. Thân máy, màn hình không trầy
                  xước.
                </p>
              </p>
            </div>
          </li>
          <li className="flex text-lg">
            <div className="text-sm md:text-lg grid grid-cols-[1fr_3fr] gap-4">
              <p className="whitespace-nowrap">Chính sách mua hàng:</p>
              <p className="font-light text-gray-600 opacity-90 hover:text-gray-800 hover:cursor-default">
                Khách hàng sử dụng dịch vụ mua sắm trực tuyến tại website hoặc
                tham gia mua sắm trực tiếp tại cửa hàng Didongverse gần nhất đều
                được nhận nhiều ưu đãi.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(2);

  const setCurrentActiveTab = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="container w-full">
        <div className="bloc-tabs flex w-full mt-8">
          <button
            className={`tabs p-font text-[18px] md:text-[24px] lg:text-[28px] ${
              activeTab === 1 ? "product-active-tab" : ""
            }`}
            onClick={() => setCurrentActiveTab(1)}
          >
            Chi tiết sản phẩm
          </button>
          <button
            className={`tabs p-font text-[18px] md:text-[24px] lg:text-[28px] ${
              activeTab === 2 ? "product-active-tab" : ""
            }`}
            onClick={() => setCurrentActiveTab(2)}
          >
            Đánh giá
          </button>
          <button
            className={`tabs p-font text-[18px] md:text-[24px] lg:text-[28px] ${
              activeTab === 3 ? "product-active-tab" : ""
            }`}
            onClick={() => setCurrentActiveTab(3)}
          >
            FAQs
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={`content p-font text-[20px] w-full ${
              activeTab === 1 ? "product-active-content" : ""
            }`}
          >
            <ProductAttribute product={product} />
          </div>
          <div
            className={`content p-font text-[20px] w-full ${
              activeTab === 2 ? "product-active-content" : ""
            }`}
          >
            <ReviewSection product={product}/>
          </div>
          <div
            className={`content p-font text-[20px] w-full ${
              activeTab === 3 ? "product-active-content" : ""
            }`}
          >
            <ProductFAQs />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTabs;
