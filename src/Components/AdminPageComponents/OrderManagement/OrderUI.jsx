import { useState } from "react";
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
export default Order;
