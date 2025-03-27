import React, { useEffect } from "react";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

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
  const shippingMethod = ["Banking", "COD"];

  const [userData, setUserData] = useState();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // const orderItems = state?.selectedItems || [];
  // const totalAmount = state?.total || 0;
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
    const mapItemIds = orderItems.map((item) => item.itemId + 1);
    if (selectedAddress && selectedMethod) {
      let reqBody = {
        addressId: selectedAddress.id,
        note: notes,
        method: selectedMethod,
        itemId: mapItemIds,
      };
      console.log(reqBody);
      try {
        console.log(mapItemIds);
        const response = api.post(`/phone/order/${userData.id}`, reqBody);
        await response;
        reqBody = {};
        setShowSuccess(true);
        navigate("/user");

        // setOrderItems([]);
        // setTotalAmount(0);
      } catch (e) {
        console.log("Lỗi đặt hàng. Vui lòng thử lại sau." + e);
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
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
                <th className="text-right p-3 font-semibold">Đơn giá</th>
                <th className="text-center p-3 font-semibold">Số lượng</th>
                <th className="text-right p-3 font-semibold">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-3 text-gray-800">{item.productName}</td>
                  <td className="p-3 text-right text-gray-800">
                    {formatPrice(item.price)}
                  </td>
                  <td className="p-3 text-center text-gray-800">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-right text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={2} className="p-3 font-semibold">
                  Tổng cộng
                </td>
                <td className="p-3 text-center font-semibold"></td>
                <td className="p-3 text-right font-semibold text-lg">
                  {formatPrice(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-full flex items-end justify-end pt-5">
            <select
              id="address-select"
              onChange={handleMethodChange}
              className="border p-2 text-sm"
            >
              <option value="" disabled selected className="text-gray-400">
                Chọn hình thức thanh toán
              </option>
              {shippingMethod.map((method, index) => {
                if (method === "COD") {
                  return (
                    <option key={index} value={method}>
                      {method}
                    </option>
                  );
                } else
                  return (
                    <option key={index} disabled value={method}>
                      {method}
                    </option>
                  );
              })}
            </select>
          </div>
        </div>

        {/* Hiển thị dạng card trên mobile */}
        <div className="md:hidden space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-gray-600">
                Đơn giá: {formatPrice(item.price)}
              </p>
              <p className="text-gray-600">Số lượng: {item.quantity}</p>
              <p className="font-semibold text-right text-blue-600">
                Thành tiền: {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
          <div className="p-4 bg-blue-50 rounded-lg font-semibold text-lg text-right">
            Tổng cộng: {formatPrice(totalAmount)}
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
      <div className="text-right">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md"
        >
          Xác nhận đặt hàng
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
