import React from "react";
import { useState, useEffect } from "react";
import api from "../../../services/api";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OrderUI from "./OrderUI";

const shippingStatus = [
  "Tất cả",
  "Đang chờ",
  "Đã xác nhận",
  "Đang giao hàng",
  "Đã giao hàng",
  "Đã hủy",
  "Đã hoàn tiền",
];

const BillManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const size = 6;

  const [orderData, setOrderData] = useState([]);

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

  const fetchOrderData = async () => {
    try {
      let response;
      if (selectedTab === "Tất cả") {
        response = await api.get(
          `/phone/order/getAll?pageNumber=${currentIndex}&pageSize=${size}`
        );
      } else {
        response = await api.get(
          `/phone/order/getAll?status=${formatStatusToEng(
            selectedTab
          )}&pageNumber=${currentIndex}&pageSize=${size}`
        );
      }
      console.log(response);

      const totalOrders = response.data.content.length;
      setOrderData(response.data.content);

      if (totalOrders < size) {
        setMaxIndex(currentIndex);
      } else {
        setMaxIndex(currentIndex + 1);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Lỗi fetch hóa đơn" + e);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [selectedTab, currentIndex]);

  const handleTabClick = (tab) => {
    if (tab !== selectedTab) {
      setIsLoading(true);
      setCurrentIndex(0);
      setSelectedTab(tab);
    }
  };

  if (isLoading) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>

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
      </div>
      {orderData && orderData.length >= 1 && (
        <OrderUI
          orderData={orderData}
          fetchOrderData={fetchOrderData}
        ></OrderUI>
      )}

      {!isLoading && orderData.length > 0 ? (
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
      ) : (
        <p className="mt-2 text-lg">Không có đơn</p>
      )}
    </div>
  );
};

export default BillManagement;
