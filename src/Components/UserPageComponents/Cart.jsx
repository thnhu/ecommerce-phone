import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Checkbox,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import api from "../../services/api";
import CustomSnackbar from "../CustomSnackbar";
const Cart = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartWasChanged, setCartWasChanged] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'info', // default value
  });
  
  const showSnackbar = (message, severity = 'info') => {
    setSnackbarState({
      open: true,
      message,
      severity
    });
  };
  
  

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleQuantity = (id, newValue) => {
    const newQuantity = parseInt(newValue);
  
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Kiểm tra giá trị nhập vào có hợp lệ
          if (isNaN(newQuantity) || newQuantity < 1) {
            return { ...item, quantity: 1 };
          }
  
          // Kiểm tra số lượng vượt quá stock
          if (newQuantity > item.stock) {
            showSnackbar("Số lượng trong kho không đủ", "error");
            return { ...item, quantity: item.stock }; // Giữ nguyên số lượng tối đa bằng stock
          }
  
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    setCartWasChanged(true);
  };
  
  const handleQuantityChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(
              1,
              Math.min(Number(value), item.stock)
            );
            if (newQuantity > item.stock) {
              alert("Mặt hàng không đủ!");
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      );
      setCartWasChanged(true);
    }
  };

  const totalAmount = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalQuantity = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async() => {
    await handleUpdateItems()
    navigate("/order", {
      state: {
        selectedItems: cartItems.filter((item) =>
          selectedItems.includes(item.id)
        ),
        total: totalAmount,
      },
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  // fetch cart
  const fetchCart = async () => {
    try {
      const userResponse = await api.get("/phone/user/myInfo");
      setUser(userResponse.data);
      const userId = userResponse.data.id;
      try {
        const cartResponse = await api.get(`/phone/cart/${userId}`);
        console.log(cartResponse.data);
        const cartItemsData = cartResponse.data.data.items;

        // Fetch product details for each cart item and update the cart
        const updatedCartItems = await Promise.all(
          cartItemsData.map(async (item) => {
            try {
              const productResponse = await api.get(
                `/phone/product/${item.productId}`
              );
              const thisVariant = productResponse.data.variants.find(
                (variant) => variant.id === item.productVariantId
              );
              const stock = thisVariant ? thisVariant.stock : 0;
              return {
                id: item.itemId,
                ...item,
                stock: stock, // Add the product data (stock) to each item
              };
            } catch (productError) {
              console.log("Lỗi dữ liệu sản phẩm:", productError);
              return { ...item, id: item.itemId };
            }
          })
        );

        // Update the cartItems state with the updated items
        setCartItems(updatedCartItems);
      } catch (cartError) {
        console.log("Lỗi dữ liệu giỏ hàng:", cartError);
      }
    } catch (userError) {
      console.log("Lỗi dữ liệu người dùng:", userError);
    }
  };

  const handleRemoveItem = (id) => {
    const deleteItemNth = cartItems.filter((item) => item.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    try {
      console.log(deleteItemNth);
      console.log(
        `/phone/cart/deleteItem?userId=${user.id}&itemId=${deleteItemNth[0].itemId}`
      );
      const deleteItemsResponse = api.delete(
        `/phone/cart/deleteItem?userId=${user.id}&itemId=${deleteItemNth[0].itemId}`
      );
      console.log(deleteItemsResponse);
    } catch (err) {
      console.log("Lỗi xóa giỏ hàng" + err);
    }
  };

  const handleUpdateItems = () => {
    const itemsToDelete = [...cartItems];

    const promises = itemsToDelete.map((item) => {
      return api
        .delete(
          `/phone/cart/deleteItem?userId=${user.id}&itemId=${item.itemId}`
        )
        .then(() => {
          console.log(`Deleted item with id: ${item.itemId}`);

          return api.post(
            `/phone/cart?userId=${user.id}&variantId=${item.productVariantId}&quantity=${item.quantity}`
          );
        })
        .then(() => {
          console.log(`Re-added item with id: ${item.itemId}`);
        })
        .catch((error) => {
          console.error(`Error processing item with id: ${item.itemId}`, error);
        });
    });

    Promise.all(promises)
      .then(() => {
        fetchCart();
        setCartWasChanged(false);
      })
      .catch((error) => {
        console.error("Error updating cart items:", error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-20 pb-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-wrap items-center gap-4">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    color="primary"
                  />
                  <img
                    src={`data:${item.images[0].imageType};base64,${item.images[0].data}`}
                    alt="Hình ảnh sản phẩm"
                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded"
                  />
                  <div className="flex-1 min-w-[150px]">
                    <div className="text-sm text-gray-600 mt-2">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-lg text-black font-semibold inline-block"
                        >
                          {item.productName}
                        </Link>
                      <p>Màu sắc: {item.productColor}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-red-600 font-bold text-lg">
                        {formatPrice(item.price)}
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
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        inputProps={{ className: "text-center", min: 1, max:item.stock }}
                        className="w-16"
                      />
                      <IconButton
                        onClick={() => handleQuantity(item.id, "increase")}
                      >
                        <Add />
                      </IconButton>
                    </div>
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      color="error"
                    >
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
                ${
                  selectedItems.length > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={selectedItems.length === 0}
            >
              ĐẶT HÀNG
            </button>
            <button
              onClick={() => handleUpdateItems()}
              className={`w-full py-3 rounded-full font-semibold text-white transition-colors ${
                cartWasChanged
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
                `}
              disabled={!cartWasChanged}
            >
              LƯU SỐ LƯỢNG SẢN PHẨM
            </button>
          </div>
        </div>
      </div>
      <CustomSnackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState(prev => ({ ...prev, open: false }))}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />    
      </div>
  );
};

export default Cart;
