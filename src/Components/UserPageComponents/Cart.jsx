import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import api from "../../services/api";

const Cart = () => {
  const navigate = useNavigate();
  const [selectedCartItemIds, setSelectedCartItemIds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartModified, setIsCartModified] = useState(false);
  const [snackbarState, setSnackbarState] = useState({ open: false, message: "" });

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  // Fetch cart data
  const fetchCartData = useCallback(async () => {
    try {
      const userResponse = await api.get("/phone/user/myInfo");
      setCurrentUser(userResponse.data);
      
      const cartResponse = await api.get(`/phone/cart/${userResponse.data.id}`);
      const cartItemsWithStock = await Promise.all(
        cartResponse.data.data.items.map(async (cartItem) => {
          const productResponse = await api.get(`/phone/product/${cartItem.productId}`);
          const variant = productResponse.data.variants.find(v => v.id === cartItem.productVariantId);
          return { ...cartItem, stock: variant?.stock || 0 };
        })
      );
      
      setCartItems(cartItemsWithStock);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleSnackbarOpen("Lỗi tải dữ liệu giỏ hàng");
    }
  }, []);

  const handleSnackbarOpen = (message) => {
    setSnackbarState({ open: true, message });
    setTimeout(() => setSnackbarState(s => ({ ...s, open: false })), 3000);
  };

  const handleItemSelection = (cartItemId) => {
    setSelectedCartItemIds(prev => 
      prev.includes(cartItemId) 
        ? prev.filter(id => id !== cartItemId) 
        : [...prev, cartItemId]
    );
  };

  const updateItemQuantity = (cartItemId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
    setIsCartModified(true);
  };

  const handleQuantityChange = (cartItemId, action) => {
    const item = cartItems.find(i => i.id === cartItemId);
    if (!item) return;

    const newQuantity = action === "increment" 
      ? Math.min(item.quantity + 1, item.stock)
      : Math.max(1, item.quantity - 1);

    if (action === "increment" && newQuantity === item.quantity) {
      handleSnackbarOpen("Số lượng trong kho không đủ");
      return;
    }

    updateItemQuantity(cartItemId, newQuantity);
  };

  const handleManualQuantityChange = (cartItemId, value) => {
    const numericValue = Math.max(1, Math.min(Number(value), 999));
    const item = cartItems.find(i => i.id === cartItemId);
    
    if (item && numericValue > item.stock) {
      handleSnackbarOpen("Vượt quá số lượng tồn kho");
      updateItemQuantity(cartItemId, item.stock);
      return;
    }

    updateItemQuantity(cartItemId, numericValue);
  };

  const removeCartItem = async (cartItem) => {
    try {
      await api.delete(`/phone/cart/deleteItem?userId=${currentUser.id}&itemId=${cartItem.itemId}`);
      setCartItems(prev => prev.filter(i => i.id !== cartItem.id));
      setSelectedCartItemIds(prev => prev.filter(id => id !== cartItem.id));
      fetchCartData();
    } catch (error) {
      handleSnackbarOpen("Lỗi khi xóa sản phẩm");
    }
  };

  const persistCartChanges = async () => {
    try {
      await Promise.all(cartItems.map(async (item) => {
        await api.delete(`/phone/cart/deleteItem?userId=${currentUser.id}&itemId=${item.itemId}`);
        await api.post(`/phone/cart?userId=${currentUser.id}&variantId=${item.productVariantId}&quantity=${item.quantity}`);
      }));
      
      await fetchCartData();
      setIsCartModified(false);
      handleSnackbarOpen("Cập nhật giỏ hàng thành công");
    } catch (error) {
      handleSnackbarOpen("Lỗi cập nhật giỏ hàng");
    }
  };

  const proceedToCheckout = () => {
    const selectedItems = cartItems.filter(item => selectedCartItemIds.includes(item.id));
    navigate("/order", {
      state: {
        selectedItems,
        total: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    });
  };

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const totalAmount = cartItems
    .filter(item => selectedCartItemIds.includes(item.id))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4 py-8 pt-20 pb-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              isSelected={selectedCartItemIds.includes(item.id)}
              onSelect={handleItemSelection}
              onQuantityChange={handleQuantityChange}
              onManualChange={handleManualQuantityChange}
              onRemove={removeCartItem}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        <CartSummary
          totalAmount={totalAmount}
          selectedCount={selectedCartItemIds.length}
          isCartModified={isCartModified}
          onCheckout={proceedToCheckout}
          onSave={persistCartChanges}
          formatPrice={formatPrice}
        />
      </div>

      <Snackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarState.message.includes("thành công") ? "success" : "error"}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const CartItem = ({ item, isSelected, onSelect, onQuantityChange, onManualChange, onRemove, formatPrice }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex flex-wrap items-center gap-4">
      <Checkbox
        checked={isSelected}
        onChange={() => onSelect(item.id)}
        color="primary"
      />
      
      <img
        src={`data:${item.images[0]?.imageType};base64,${item.images[0]?.data}`}
        alt={item.productName}
        className="w-24 h-24 object-contain rounded"
      />
      
      <div className="flex-1 min-w-[150px]">
        <Link
          to={`/product/${item.productId}`}
          className="text-lg font-semibold hover:text-blue-600"
        >
          {item.productName}
        </Link>
        <div className="text-sm text-gray-600 mt-2">
          <p>Màu sắc: {item.productColor}</p>
          <p className="text-red-600 font-bold text-lg">
            {formatPrice(item.price)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => onQuantityChange(item.id, "decrement")}>
            <Remove />
          </IconButton>
          
          <TextField
            value={item.quantity}
            onChange={(e) => onManualChange(item.id, e.target.value)}
            inputProps={{ className: "text-center", min: 1, max: item.stock }}
            className="w-16"
          />
          
          <IconButton 
            onClick={() => onQuantityChange(item.id, "increment")}
            disabled={item.quantity >= item.stock}
          >
            <Add />
          </IconButton>
        </div>
        
        <IconButton onClick={() => onRemove(item)} color="error">
          <Delete />
        </IconButton>
      </div>
    </div>
  </div>
);

const CartSummary = ({ totalAmount, selectedCount, isCartModified, onCheckout, onSave, formatPrice }) => (
  <div className="lg:w-96 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">
          Tổng cộng ({selectedCount} sản phẩm):
        </span>
        <span className="font-semibold text-lg text-red-600">
          {formatPrice(totalAmount)}
        </span>
      </div>

      <ActionButton
        label="ĐẶT HÀNG"
        onClick={onCheckout}
        disabled={selectedCount === 0}
      />
      
      <ActionButton
        label="LƯU THAY ĐỔI"
        onClick={onSave}
        disabled={!isCartModified}
      />
    </div>
  </div>
);

const ActionButton = ({ label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 rounded-full font-semibold text-white transition-colors
      ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`
    }
  >
    {label}
  </button>
);

export default Cart;