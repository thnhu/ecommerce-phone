import React, { useState } from "react";

const PaymentOptions = () => {
  const [selectedMethod, setSelectedMethod] = useState("cash");

  const paymentMethods = [
    { id: "cash", label: "Thanh toán tiền mặt", icon: "" },
    { id: "credit", label: "Thẻ tín dụng/Ghi nợ", logo: "" },
  ];

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Chọn hình thức thanh toán</h2>
      <ul className="space-y-4">
        {paymentMethods.map((method) => (
          <li key={method.id} className="flex items-center space-x-4">
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleSelectMethod(method.id)}
              className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-500"
            />
            <label htmlFor={method.id} className="flex items-center cursor-pointer w-full">
              {method.logo ? (
                <img src={method.logo} alt={method.label} className="h-8 w-8 mr-4" />
              ) : (
                <span className="text-lg mr-4">{method.icon}</span>
              )}
              <span className="text-gray-700 font-medium">{method.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => alert(`Bạn đã chọn: ${paymentMethods.find((method) => method.id === selectedMethod).label}`)}
      >
        Xác nhận
      </button>
    </div>
  );
};

export default PaymentOptions;
