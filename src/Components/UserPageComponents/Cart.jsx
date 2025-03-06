import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import iPhone from '../../assets/images/iphone-16-pro-titan-sa-mac.png'
import api from "../../services/api";
const Cart = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const [cartItems, setCartItems] = useState([
    {
      id: "20d51858-313f-43c6-a9d9-cb840dcfe88f",
      name: "SP 2",
      size: "6.7 inches",
      color: "Titan Xanh",
      originalPrice: 35000000,
      price: 29900000,
      quantity: 1,
      stock: 5, // Thêm số lượng tồn kho
      image: iPhone,
    },
  ]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity > item.stock) {
            setSnackbarOpen(true);
            return item;
          }
          return { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) };
        }
        return item;
      })
    );
  };

  const handleQuantityChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(1, Math.min(Number(value), item.stock));
            if (newQuantity > item.stock) {
              setSnackbar({ open: true, message:'Số lượng trong kho không đủ!' });
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const totalAmount = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

    const totalQuantity = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.quantity, 0);
  

  const handleCheckout = () => {
    navigate("/order", {
      state: {
        selectedItems: cartItems.filter((item) => selectedItems.includes(item.id)),
        total: totalAmount,
      },
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20 pb-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-wrap items-center gap-4">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  color="primary"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded"
                />
                <div className="flex-1 min-w-[150px]">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Kích thước: {item.size}</p>
                    <p>Màu sắc: {item.color}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-red-600 font-bold text-lg">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      {formatPrice(item.originalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <IconButton
                      onClick={() => handleQuantity(item.id, "decrease")}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      type="text"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      inputProps={{ className: "text-center", min: 1 }}
                      className="w-16"
                    />
                    <IconButton onClick={() => handleQuantity(item.id, "increase")}
                    >
                      <Add />
                    </IconButton>
                  </div>
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        <div className="lg:w-96 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
        <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Số lượng ({totalQuantity} sản phẩm):
              </span>
              <span className="font-semibold text-lg text-red-600">
                {formatPrice(totalAmount)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className={`w-full py-3 rounded-full font-semibold text-white transition-colors
                ${selectedItems.length > 0 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-gray-400 cursor-not-allowed"}`
              }
              disabled={selectedItems.length === 0}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{vertical:'top', horizontal:'center'}}  
      >
        <Alert severity="error" sx={{ width: '100%'}}>
          Số lượng trong kho không đủ
      </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;