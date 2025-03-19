import { useEffect, useState } from "react";
import api from "../../../services/api";

const Order = ({ orderData, fetchOrderData }) => {
  // State to keep track of which order is expanded
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  // State to keep track of updated status for each order
  const [updatedStatus, setUpdatedStatus] = useState(
    orderData.reduce((acc, order) => {
      acc[order.orderId] = order.status; // Initialize the status map
      return acc;
    }, {})
  );
  // State to track whether the update button has been clicked
  const [statusTracker, setStatusTracker] = useState(
    orderData.reduce((acc, order) => {
      acc[order.orderId] = false; // Track if status update button was clicked
      return acc;
    }, {})
  );

  const toggleCollapse = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' gives you the dd/mm/yyyy format
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Update the status when the user selects a new one
    setUpdatedStatus((prevState) => ({
      ...prevState,
      [orderId]: newStatus,
    }));
    // Mark that the status has been updated for the specific order
    setStatusTracker((prevState) => ({
      ...prevState,
      [orderId]: false, // Show the update button again when the status is changed
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const response = await api.post(
        `/phone/order/updateStatus/${orderId}?status=${updatedStatus[orderId]}`
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    // Mark that the update button has been clicked for the specific order
    setStatusTracker((prevState) => ({
      ...prevState,
      [orderId]: true, // Hide the update button after clicking it
    }));
    fetchOrderData();
  };

  return (
    <div className="order-details-table mt-8">
      {orderData.map((order) => (
        <div
          key={order.orderId}
          className="bg-white shadow-md rounded-lg mb-6 p-4 flex flex-col md:block"
        >
          {/* Order Overview */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">
                ID đơn hàng: {order.orderId}
                <span className="mx-3 px-3 py-1 rounded-full text-sm text-white text-nowrap bg-gray-500">
                  {order.method}
                </span>
              </p>
              <p className="text-xl">
                Thời gian đặt hàng: {formatDate(order.orderDate)}
              </p>
              <p className="text-gray-600">Người nhận: {order.receiverName}</p>
              <p className="text-gray-600">Điện thoại: {order.receiverPhone}</p>
              <p className="text-gray-600">Địa chỉ: {order.address}</p>
              {order.note && (
                <p className="text-gray-600">
                  Ghi chú:{" "}
                  <span className="text-gray-900 font-semibold">
                    {order.note}
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center md:px-5">
              {/* Status Selection Dropdown */}
              <select
                value={updatedStatus[order.orderId]}
                onChange={(e) =>
                  handleStatusChange(order.orderId, e.target.value)
                }
                className="px-3 py-2 rounded-full text-sm text-black bg-gray-200"
              >
                <option value="PENDING">ĐANG CHỜ</option>
                <option value="CONFIRM">ĐÃ XÁC NHẬN</option>
                <option value="DELIVERING">ĐANG GIAO HÀNG</option>
                <option value="DELIVERED">ĐÃ GIAO HÀNG</option>
                <option value="CANCELLED">ĐÃ HỦY</option>
                <option value="REFUNDED">ĐÃ HOÀN TIỀN</option>
              </select>

              {/* Conditionally render the update button */}
              {/* Show the update button if the status has changed */}
              {updatedStatus[order.orderId] !== order.status &&
                !statusTracker[order.orderId] && (
                  <button
                    onClick={() => handleUpdateStatus(order.orderId)}
                    className=" text-blue-500 hover:text-blue-700 p-2"
                  >
                    Cập nhật trạng thái
                  </button>
                )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-4">
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
