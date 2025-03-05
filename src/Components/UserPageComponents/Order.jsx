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
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-gray-100 min-h-screen pt-20 mb-4">
      {/* Thông tin nhận hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Thông tin người nhận</h2>
        <hr className="border-t border-gray-300 mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-800">
              <strong className="font-medium">Họ tên:</strong> {userAddress.name}
            </p>
            <p className="text-gray-800">
              <strong className="font-medium">SĐT:</strong> {userAddress.phone}
            </p>
          </div>
          <div className="text-gray-800">
            <p>
              <strong className="font-medium">Địa chỉ:</strong> {userAddress.address}
            </p>
          </div>
        </div>
      </div>

      {/* Chi tiết đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Chi tiết đơn hàng</h2>
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
                  <td className="p-3 text-gray-800">{item.name}</td>
                  <td className="p-3 text-right text-gray-800">{formatPrice(item.price)}</td>
                  <td className="p-3 text-center text-gray-800">{item.quantity}</td>
                  <td className="p-3 text-right text-gray-800">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={2} className="p-3 font-semibold">Tổng cộng</td>
                <td className="p-3 text-center font-semibold"></td>
                <td className="p-3 text-right font-semibold text-lg">{formatPrice(totalAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Hiển thị dạng card trên mobile */}
        <div className="md:hidden space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-gray-600">Đơn giá: {formatPrice(item.price)}</p>
              <p className="text-gray-600">Số lượng: {item.quantity}</p>
              <p className="font-semibold text-right text-blue-600">Thành tiền: {formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="p-4 bg-blue-50 rounded-lg font-semibold text-lg text-right">
            Tổng cộng: {formatPrice(totalAmount)}
          </div>
        </div>
      </div>

      {/* Ghi chú đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Lời nhắn cho chúng tôi</h2>
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
