import React, { useState, useEffect } from "react";

const shippingStatus = [
  "Tất cả",
  "Đang chờ",
  "Xác nhận",
  "Đang giao hàng",
  "Đã giao hàng",
  "Đã hủy",
  "Đã hoàn tiền",
];

const sampleData = {
  content: [
    {
      orderId: "05895a51-c4b9-4fa4-9cb6-8057f788fb21",
      userId: "10",
      receiverName: "Gia Bảo",
      receiverPhone: "0789668345",
      address: "Mậu Thân, An Hòa, Ninh Kiều, TP. Hải Phòng",
      items: [
        {
          id: 1,
          prdId: "5d800a29-eae5-42dc-92cc-4b7cfe7d5276",
          name: "Iphone 12 promax",
          color: "#000000",
          quantity: 9,
          priceAtOrder: 120000,
          discount: 0,
          discountedPrice: 120000,
          calculatePrice: 1080000,
        },
      ],
      orderDate: "2025-03-15T18:48:36.858432",
      note: "",
      method: "COD",
      status: "PENDING",
      totalQuantity: 9,
      totalPrice: 1080000,
    },
    {
      orderId: "561c9066-440e-4020-a425-45de23dfd9eb",
      userId: "10",
      receiverName: "Gia Bảo",
      receiverPhone: "0789668345",
      address: "Mậu Thân, An Hòa, Ninh Kiều, TP. Cần Thơ",
      items: [
        {
          id: 4,
          prdId: "5d800a29-eae5-42dc-92cc-4b7cfe7d5276",
          name: "Iphone 12 promax",
          color: "#000000",
          quantity: 1,
          priceAtOrder: 120000,
          discount: 0,
          discountedPrice: 120000,
          calculatePrice: 120000,
        },
      ],
      orderDate: "2025-03-15T19:15:28.0938",
      note: "123",
      method: "COD",
      status: "PENDING",
      totalQuantity: 1,
      totalPrice: 120000,
    },
    {
      orderId: "84666d49-bde1-434c-80f4-2200fa75533d",
      userId: "10",
      receiverName: "Gia Bảo",
      receiverPhone: "0789668345",
      address: "Mậu Thân, An Hòa, Ninh Kiều, TP. Cần Thơ",
      items: [
        {
          id: 2,
          prdId: "5d800a29-eae5-42dc-92cc-4b7cfe7d5276",
          name: "Iphone 12 promax",
          color: "#000000",
          quantity: 1,
          priceAtOrder: 120000,
          discount: 0,
          discountedPrice: 120000,
          calculatePrice: 120000,
        },
      ],
      orderDate: "2025-03-15T18:53:59.205241",
      note: "",
      method: "COD",
      status: "PENDING",
      totalQuantity: 1,
      totalPrice: 120000,
    },
    {
      orderId: "edd8f71d-493f-44ac-a0c6-fff212bce96c",
      userId: "10",
      receiverName: "Gia Bảo",
      receiverPhone: "0789668345",
      address: "Mậu Thân, An Hòa, Ninh Kiều, TP. Cần Thơ",
      items: [
        {
          id: 3,
          prdId: "5d800a29-eae5-42dc-92cc-4b7cfe7d5276",
          name: "Iphone 12 promax",
          color: "#000000",
          quantity: 1,
          priceAtOrder: 120000,
          discount: 0,
          discountedPrice: 120000,
          calculatePrice: 120000,
        },
      ],
      orderDate: "2025-03-15T19:07:19.161462",
      note: "",
      method: "COD",
      status: "PENDING",
      totalQuantity: 1,
      totalPrice: 120000,
    },
  ],
};

const Order = () => {
  // State to keep track of which order is expanded
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleCollapse = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatMethodToVN = (method) => {
    switch (method){
      case "PENDING": return "ĐANG CHỜ"
      case "CONFIRM": return "ĐÃ XÁC NHẬN"
      case "DELIVERING": return "ĐANG GIAO HÀNG"
      case "DELIVERED": return "ĐÃ GIAO HÀNG"
      //CHECK XEM CO MAY CHU L
      case "CANCELED": return "ĐÃ HỦY"
      case "REFUNDED": return "ĐÃ HOÀN TIỀN"
    }
  }

  return (
    <div className="order-details-table mt-8">
      {sampleData.content.map((order) => (
        <div key={order.orderId} className="bg-white shadow-md rounded-lg mb-6 p-4">
          {/* Order Overview */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">ID đơn hàng: {order.orderId}</p>
              <p className="text-gray-600">Người nhận: {order.receiverName}</p>
              <p className="text-gray-600">Điện thoại: {order.receiverPhone}</p>
              <p className="text-gray-600">Địa chỉ: {order.address}</p>
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-sm text-white bg-blue-500">{formatMethodToVN(order.status)}</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-4">
            {/* <p className="text-gray-600">Tổng số lượng: {order.totalQuantity}</p> */}
            <p className="text-xl font-semibold">Tổng giá tiền: {order.totalPrice.toLocaleString()} VND</p>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => toggleCollapse(order.orderId)}
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            {expandedOrderId === order.orderId ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
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
                      <td className="p-4">{item.priceAtOrder.toLocaleString()} VND</td>
                      <td className="p-4">{item.calculatePrice.toLocaleString()} VND</td>
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

  //For testing
  const proID = "20d51858-313f-43c6-a9d9-cb840dcfe88f";

  useEffect(() => {
    if (userData && userData.addresses) {
      // Once the user data is available, stop loading
      setIsLoading(false);
    }
  }, [userData]);

  // const fetchData = async () => {
  //   switch
  // };

  if (isLoading) return null;
  console.log(userData);

  const handleTabClick = (tab) => {
    console.log(typeof tab);
    setSelectedTab(tab);
  };

  return (
    <>
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
          <Order />
        </div>
      </div>
    </>
  );
};

export default BillTab;
