import React from 'react';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const userAddress = {
  name: 'Nguyễn Văn A',
  phone: '0912 345 678',
  address: 'Số 1, Đường ABC, Quận XYZ, TP. Hồ Chí Minh'
};

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Nhận dữ liệu từ giỏ hàng
  const orderItems = state?.selectedItems || [];
  const totalAmount = state?.total || 0;

  const [notes, setNotes] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Thông tin nhận hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Thông tin nhận hàng</h2>
        <hr className="border-t border-gray-200 mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong className="font-medium">Họ tên:</strong> {userAddress.name}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">SĐT:</strong> {userAddress.phone}
            </p>
          </div>
          <div className="text-gray-700">
            <p>
              <strong className="font-medium">Địa chỉ:</strong> {userAddress.address}
            </p>
          </div>
        </div>
      </div>

      {/* Chi tiết đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Chi tiết đơn hàng</h2>
        <hr className="border-t border-gray-200 mb-4" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Sản phẩm</th>
                <th className="text-right p-3 font-semibold hidden md:table-cell">Đơn giá</th>
                <th className="text-center p-3 font-semibold">Số lượng</th>
                <th className="text-right p-3 font-semibold">Thành tiền</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-right hidden md:table-cell">
                    {formatPrice(item.price)}
                  </td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
              
              <tr className="bg-gray-50">
                <td colSpan={2} className="p-3 font-semibold">Tổng cộng</td>
                <td className="p-3 text-center font-semibold"></td>
                <td className="p-3 text-right font-semibold text-lg">
                  {formatPrice(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ghi chú đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Ghi chú đơn hàng</h2>
        <hr className="border-t border-gray-200 mb-4" />
        
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Nhập ghi chú cho đơn hàng..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Nút xác nhận */}
      <div className="text-right">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Xác nhận đặt hàng
        </button>
      </div>

      {/* Thông báo thành công */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <CheckCircle className="mr-2" />
          Đặt hàng thành công! Đang chuyển về trang chủ...
        </div>
      )}
    </div>
  );
}

export default Order;