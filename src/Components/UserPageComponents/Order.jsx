import React, { useEffect } from "react";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import api, { createVNPayUrl } from "../../services/api";
import vnpay from "../../assets/images/vnpay.png";

//Handle address selection box
const AddressDropdown = ({
  userAddresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  const handleAddressChange = (event) => {
    const selectedAddressId = event.target.value;
    const address = userAddresses.find(
      (address) => address.id === selectedAddressId
    );
    setSelectedAddress(address);
  };

  return (
    <div className="text-gray-800">
      <label htmlFor="address-select" className="font-medium">
        Chọn địa chỉ:
      </label>
      <select
        id="address-select"
        onChange={handleAddressChange}
        className="w-full border p-2 text-sm"
      >
        <option value="" disabled selected className="text-gray-400">
          Chọn địa chỉ
        </option>
        {userAddresses.map((address) => (
          <option key={address.id} value={address.id} className="break-words">
            {address.detail} - {address.receiverName} - {address.ward} -{" "}
            {address.district} - {address.province}
          </option>
        ))}
      </select>

      {selectedAddress && (
        <div className="mt-4">
          <h3 className="font-medium">Thông tin nhận hàng</h3>
          <p>
            <strong>Người nhận:</strong> {selectedAddress.receiverName}
          </p>
          <p>
            <strong>Điện thoại người nhận:</strong>{" "}
            {selectedAddress.receiverPhone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {selectedAddress.detail},{" "}
            {selectedAddress.ward}, {selectedAddress.district},{" "}
            {selectedAddress.province}
          </p>
        </div>
      )}
    </div>
  );
};

function Order() {
  const [userData, setUserData] = useState();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const handleVNPAY = async () => {
    if (selectedAddress) {
      const stringOfItems = orderItems.map((item) => item.itemId);
      const note = notes;
      const address = JSON.stringify(selectedAddress);
      if (localStorage.getItem("items")) {
        localStorage.removeItem("items");
      }
      if (localStorage.getItem("address")) {
        localStorage.removeItem("address");
      }
      if (localStorage.getItem("note")) {
        localStorage.removeItem("note");
      }
      localStorage.setItem("items", stringOfItems);
      localStorage.setItem("note", note);
      localStorage.setItem("address", address);
      const response = await createVNPayUrl(Number(totalAmount));
      window.location.href = response.paymentUrl;
    } else {
      alert("Vui lòng chọn địa chỉ");
    }
  };

  const [orderItems, setOrderItems] = useState(state?.selectedItems || []);
  const [totalAmount, setTotalAmount] = useState(state?.total || 0);

  const [notes, setNotes] = React.useState("");
  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await api.get("/phone/user/myInfo");
        setUserData(userResponse.data);
        console.log(userData);
      } catch (userError) {
        console.log("Lỗi dữ liệu người dùng:", userError);
      }
    };
    fetchUser();
  }, []);

  const handlePlaceOrder = async () => {
    const mapItemIds = orderItems.map((item) => item.itemId);
    if (selectedAddress) {
      let reqBody = {
        addressId: selectedAddress.id,
        note: notes,
        method: "COD",
        itemId: mapItemIds,
      };
      try {
        const response = await api.post(`/phone/order/${userData.id}`, reqBody);
        console.log(response);
        setShowSuccess(true);
        navigate("/user");
      } catch (e) {
        console.log("Lỗi đặt hàng. Vui lòng thử lại sau." + e);
      }
    } else {
      alert("Vui lòng chọn địa chỉ");
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  if (!orderItems || !totalAmount) {
    return (
      <div className="flex items-center h-full mt-10">
        <div className="container mx-auto my-10 px-4 py-8 max-w-3xl bg-gray-100 pt-20 mb-4">
          <div className="flex justify-center items-center h-full">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
              <p className="text-2xl font-semibold text-gray-700">
                Không có món hàng
              </p>
              <p className="mt-4 text-gray-500">
                Chưa có món hàng nào trong giỏ hàng của bạn.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
              >
                Quay lại mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const totalSavings = orderItems.reduce((total, item) => {
    return total + (item.originalPrice - item.price) * item.quantity
  }, 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-gray-100 min-h-screen pt-20 mb-4">
      {/* Thông tin nhận hàng */}
      {userData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Thông tin người nhận
          </h2>
          <hr className="border-t border-gray-300 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong className="font-medium">Họ tên:</strong>{" "}
                {userData.displayName}
              </p>
              <p className="text-gray-800">
                <strong className="font-medium">SĐT:</strong>{" "}
                {userData.phoneNumber}
              </p>
            </div>
            <div className="text-gray-800">
              {/* {userData.addresses.map((userAddress, index) => (
              <p key={index}>
                <strong className="font-medium">Địa chỉ:</strong>{" "}
                {}
              </p>
            ))} */}
              <AddressDropdown
                userAddresses={userData.addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              ></AddressDropdown>
            </div>
          </div>
        </div>
      )}

      {/* Chi tiết đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Chi tiết đơn hàng
        </h2>
        <hr className="border-t border-gray-300 mb-4" />

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="text-left p-3 font-semibold">Sản phẩm</th>
                <th className="text-left p-3 font-semibold">Màu</th>
                <th className="text-right p-3 font-semibold">Đơn giá</th>
                <th className="text-center p-3 font-semibold">Số lượng</th>
                <th className="text-right p-3 font-semibold">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-3 text-gray-800">
                    <div className="font-medium">{item.productName}</div>
                    {item.discountPercentage > 0 && (
                      <div className="mt-1">
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                          Giảm {item.discountPercentage}%
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-gray-800">{item.productColor}</td>
                  <td className="p-3 text-right">
                    {item.originalPrice > item.price ? (
                      <div className="space-y-1">
                        <div className="line-through text-gray-400 text-sm">
                          {formatPrice(item.originalPrice)}
                        </div>
                        <div className="text-gray-800 font-medium">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-800">
                        {formatPrice(item.price)}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center text-gray-800">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-right text-gray-800 font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
              
              {/* Tổng tiền */}
              <tr className="bg-blue-50 font-semibold">
                <td colSpan={4} className="p-3 text-right">
                  Tổng cộng:
                </td>
                <td className="p-3 text-right text-lg">
                  {formatPrice(totalAmount)}
                </td>
              </tr>
              
              {/* Tổng tiết kiệm */}
              {totalSavings > 0 && (
                <tr className="border-t border-gray-200">
                  <td colSpan={4} className="p-3 text-right text-red-500">
                    Tiết kiệm:
                  </td>
                  <td className="p-3 text-right text-red-500">
                    {formatPrice(totalSavings)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">{item.productName}</p>
                  <p className="text-gray-600">{item.productColor}</p>
                </div>
                {item.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    -{item.discountPercentage}%
                  </span>
                )}
              </div>
              
              {item.originalPrice > item.price ? (
                <div className="mt-2 space-y-1">
                  <div className="line-through text-gray-400 text-sm">
                    {formatPrice(item.originalPrice)}
                  </div>
                  <div className="text-gray-800 font-medium">
                    {formatPrice(item.price)}
                  </div>
                  <div className="text-green-600 text-sm">
                    Tiết kiệm {formatPrice(item.originalPrice - item.price)}
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-gray-800">
                  {formatPrice(item.price)}
                </div>
              )}
              
              <div className="mt-2 flex justify-between items-center">
                <span className="text-gray-600">Số lượng: {item.quantity}</span>
                <span className="font-medium text-blue-600">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
          
          <div className="p-4 bg-blue-50 rounded-lg space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Tổng cộng:</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Tổng tiết kiệm:</span>
                <span>{formatPrice(totalSavings)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Ghi chú đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Lời nhắn cho chúng tôi
        </h2>
        <hr className="border-t border-gray-300 mb-4" />

        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          rows={2}
          placeholder="Để lại lời nhắn..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Nút xác nhận */}
      <div className="text-right flex items-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md ml-auto"
        >
          Thanh toán khi nhận hàng
        </button>
        <div className="mx-2">Hoặc</div>
        <button
          onClick={handleVNPAY}
          className="text-blue-600 bg-white px-8 py-3 rounded-full font-medium transition-colors shadow-md flex gap-1"
        >
          <p>Thanh toán qua VNPay</p>
          <img className="w-4 object-cover" src={vnpay} alt="" />
        </button>
      </div>

      {/* Thông báo thành công */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <CheckCircle className="mr-2" />
          Đặt hàng thành công! Điều hướng về trang chủ...
        </div>
      )}
    </div>
  );
}

export default Order;