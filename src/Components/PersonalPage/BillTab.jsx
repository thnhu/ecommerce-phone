import React, { useState, useEffect } from "react";
import api from "../../services/api";

import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const shippingStatus = [
  "Tất cả",
  "Đang chờ",
  "Đã xác nhận",
  "Đang giao hàng",
  "Đã giao hàng",
  "Đã hủy",
  "Đã hoàn tiền",
];

//UI for each order
const Order = ({ orderData }) => {
  // State to keep track of which order is expanded
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleCollapse = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatStatusToVN = (status) => {
    switch (status) {
      case "PENDING":
        return "ĐANG CHỜ";
      case "CONFIRM":
        return "ĐÃ XÁC NHẬN";
      case "DELIVERING":
        return "ĐANG GIAO HÀNG";
      case "DELIVERED":
        return "ĐÃ GIAO HÀNG";
      //CHECK XEM CO MAY CHU L
      case "CANCELLED":
        return "ĐÃ HỦY";
      case "REFUNDED":
        return "ĐÃ HOÀN TIỀN";
      default:
        return "KHÔNG RÕ TRẠNG THÁI";
    }
  };

  return (
    <div className="order-details-table mt-8">
      {orderData.map((order) => (
        <div
          key={order.orderId}
          className="bg-white shadow-md rounded-lg mb-6 p-4"
        >
          {/* Order Overview */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">
                ID đơn hàng: {order.orderId}
              </p>
              <p className="text-gray-600">Người nhận: {order.receiverName}</p>
              <p className="text-gray-600">Điện thoại: {order.receiverPhone}</p>
              <p className="text-gray-600">Địa chỉ: {order.address}</p>
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-sm text-white bg-blue-500">
                {formatStatusToVN(order.status)}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-4">
            {/* <p className="text-gray-600">Tổng số lượng: {order.totalQuantity}</p> */}
            <p className="text-xl font-semibold">
              Tổng giá tiền: {order.totalPrice.toLocaleString()} VND
            </p>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => toggleCollapse(order.orderId)}
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            {expandedOrderId === order.orderId
              ? "Ẩn sản phẩm"
              : "Hiện sản phẩm"}
          </button>

          {/* Order Items (collapsible) */}
          {expandedOrderId === order.orderId && (
            <div className="mt-4">
              <table className="min-w-full bg-gray-50">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-4 text-left">Sản phẩm</th>
                    <th className="p-4 text-left">Số lượng</th>
                    <th className="p-4 text-left">Đơn giá</th>
                    <th className="p-4 text-left">Tổng giá</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4">
                        {item.priceAtOrder.toLocaleString()} VND
                      </td>
                      <td className="p-4">
                        {item.calculatePrice.toLocaleString()} VND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const BillTab = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [orderData, setOrderData] = useState([]);

  const size = 6;

  const formatStatusToEng = (status) => {
    switch (status) {
      case "Tất cả":
        return "";
      case "Đang chờ":
        return "PENDING";
      case "Đã xác nhận":
        return "CONFIRM";
      case "Đang giao hàng":
        return "DELIVERING";
      case "Đã giao hàng":
        return "DELIVERED";
      case "Đã hủy":
        return "CANCELLED";
      case "Đã hoàn tiền":
        return "REFUNDED";
      default:
        return "UNKNOWN METHOD";
    }
  };

  useEffect(() => {
    if (userData && userData.addresses) {
      setIsLoading(false);
    }
  }, [userData]);

  // useEffect(() => {
  //   fetchOrderData();
  // }, [])

  useEffect(() => {
    fetchOrderData();
  }, [userData, currentIndex, selectedTab]); 

  const fetchOrderData = async () => {
    try {
      let response;
      if (selectedTab === "Tất cả") {
        response = await api.get(
          `/phone/order?pageNumber=${currentIndex}&pageSize=${size}&userId=${userData.id}`
        );
      } else {
        response = await api.get(
          `/phone/order?status=${formatStatusToEng(selectedTab)}&pageNumber=${currentIndex}&pageSize=${size}&userId=${userData.id}`
        );
      }
      console.log(response)

      const totalOrders = response.data.content.length;
      setOrderData(response.data.content);

      if (totalOrders < size) {
        setMaxIndex(currentIndex);
      } else {
        setMaxIndex(currentIndex + 1); // Allow pagination to the next index if there's more data
      }
    } catch (e) {
      console.log("Lỗi fetch hóa đơn" + e);
    }
  };

  if (isLoading) return null;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    console.log(formatStatusToEng(tab))
  };

  return (
    <div className="w-full sm:w-9/12 p-4 bg-gray-50 rounded-lg border-black border-opacity-25">
      <div className="overflow-x-auto">
        <ul className="flex space-x-2 w-full gap-4 items-center">
          {shippingStatus.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 rounded bg-gray-200 ${
                  selectedTab === tab ? "border-2 border-black" : ""
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
        <Order orderData={orderData} />
      </div>

      <div className="flex items-center w-full justify-center px-1 md:px-3">
        <IconButton
          onClick={() =>
            setCurrentIndex((currentIndex) => Math.max(0, currentIndex - 1))
          }
        >
          <ArrowBackIcon />
        </IconButton>
        <p className="p-1 md:p-5 text-sm md:text-lg">{currentIndex + 1}</p>
        <IconButton
          onClick={() =>
            setCurrentIndex((currentIndex) => {
              if (maxIndex > 0) return Math.min(currentIndex + 1, maxIndex);
              else return currentIndex + 1;
            })
          }
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default BillTab;
