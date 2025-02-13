import React, { useState } from "react";
import Button from '../Components/Button/Button';
const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "iPhone 16 Pro", size: "6.7 inches", color: "gold", price: 28, quantity: 1 },
    { id: 2, name: "OPPO Find X8 5G 16GB/512GB", size: "6.7 inches", color: "white", price: 22, quantity: 1 },
    { id: 3, name: "Samsung Galaxy A16 5G", size: "6.7 inches", color: "blue", price: 6, quantity: 1 },
  ]);

  const deliveryFee = 15;
  const discountRate = 0.2;

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const availablePromos = {
    SAVE20: 0.2, // 20% discount
    DISCOUNT50: 0.5, // 50% discount
  };

  const handleApplyPromo = () => {
    if (availablePromos[promoCode]) {
      setAppliedPromo(promoCode);
      setErrorMessage("");
    } else {
      setErrorMessage("Mã giảm giá không hợp lệ");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * availablePromos[appliedPromo] : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 md:p-8 mt-12">
      {/* Cart Items */}
      <div className="flex-1 md:mr-8">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-300 py-4"
          >
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-200 flex-shrink-0"></div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Màu: {item.color}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                onClick={() => handleDecrease(item.id)}
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                onClick={() => handleIncrease(item.id)}
              >
                +
              </button>
              <p className="font-semibold">{item.price * item.quantity}</p>
              <button
                className="text-red-500"
                onClick={() => handleRemove(item.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Items */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Thanh toán</h2>
        <div className="flex justify-between mb-2">
          <p>Tổng tiền hàng</p>
          <p>{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Tổng giảm giá (-{discountRate * 100}%)</p>
          <p className="text-red-500">-{discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Phí vận chuyển</p>
          <p>{deliveryFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <p>Tổng thanh toán</p>
          <p>{total.toFixed(2)}</p>
        </div>
        {/* <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 w-auto p-3 border border-gray-300 rounded-lg mb-2"
          />
      
          <Button 
        variant="secondary" 
        label="Áp dụng" 
        onClick={() => handleClick('secondary') && handleApplyPromo} 
      />
 
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div> */}
        <div className="flex items-center gap-2">
  <input
    type="text"
    placeholder="Nhập mã giảm giá"
    className="flex-1 h-12 px-3 border border-gray-300 rounded-full"
  />
  <Button 
        variant="secondary" 
        label="Áp dụng" 
        onClick={() => handleClick('secondary')} 
      />
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

</div>
        <Button 
        variant="primary" 
        label="Đặt hàng" 
        onClick={() => handleClick('primary')} 
      />
      </div>
    </div>
  );
};

export default Cart;
