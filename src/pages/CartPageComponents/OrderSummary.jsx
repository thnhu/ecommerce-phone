/*
import React, { useState } from "react";
import Cart from './Cart';
const OrderSummary = ({ cartItems }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleApplyPromo = () => {
    if (promoCode === "SAVE20") {
      setDiscount(0.2); // 20% discount
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = calculateSubtotal();
  const discountAmount = subtotal * discount;
  const deliveryFee = 15; // Fixed delivery fee
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Thanh toán</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tiền hàng</span>
          <span className="text-gray-800">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng giảm giá (-{discount * 100}%)</span>
          <span className="text-red-600">-{discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="text-gray-800">{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-300 mt-2"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Tổng thanh toán</span>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleApplyPromo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Áp mã giảm giá
        </button>
      </div>

      <button
        className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center space-x-2"
      >
        <span>Đặt hàng</span>
        <span className="text-lg">&rarr;</span>
      </button>
    </div>
  );
};

export default OrderSummary;
*/