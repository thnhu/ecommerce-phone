import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Checkbox,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
    message: "",
    severity: "info", // default value
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleQuantity = (id, action) => {
    //id = variantId
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          let newQuantity = item.quantity;

          if (action === "increase") {
            newQuantity += 1;
          } else if (action === "decrease") {
            newQuantity -= 1;
          }

          // Kiểm tra giới hạn số lượng
          newQuantity = Math.max(1, Math.min(newQuantity, item.stock));

          // Kiểm tra nếu số lượng thay đổi
          // Hiển thị cảnh báo nếu vượt stock khi tăng
          if (action === "increase" && newQuantity > item.stock) {
            showSnackbar("Số lượng trong kho không đủ", "error");
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

  const handleColorChange = async (itemId, newVariantId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    const newVariant = item.variants.find(v => v.id === newVariantId);
    if (!newVariant) return;

    // Cập nhật thông tin màu khác
    const updatedItem = {
      ...item,
      productVariantId: newVariant.id,
      productColor: newVariant.color,
      stock: newVariant.stock,
      originalPrice: newVariant.price,
      price: newVariant.price,
      quantity: Math.min(item.quantity, newVariant.stock),
      discountValue: 0,
      discountEndDate: null,
    };

    setCartItems(prev => 
      prev.map(item => item.id === itemId ? updatedItem : item)
    );
    setCartWasChanged(true);

    // Fetch thông tin khuyến mãi cho mỗi màu 
    try {
      const discountResponse = await api.get(
        `/phone/product/discount/getActive/${newVariantId}`
      );
      const discountData = discountResponse.data;
      
      if (discountData) {
        const now = new Date();
        const endDate = new Date(discountData.endDate);
        if (endDate > now) {
          const discountedPrice = newVariant.price * (1 - discountData.discountValue / 100);
          
          setCartItems(prev => 
            prev.map(item => {
              if (item.id === itemId && item.productVariantId === newVariantId) {
                return {
                  ...item,
                  discountValue: discountData.discountValue,
                  discountEndDate: discountData.endDate,
                  price: discountedPrice,
                };
              }
              return item;
            })
          );
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khuyến mãi:", error);
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
          ).map(item => {
            // Tách hex code và tên màu từ productColor hiện tại
            const [hexCode, colorName] = item.productColor.split(" - ")
            
            return {
              ...item,
              productName: item.productName,
              productColor: colorName || item.productColor, // Chỉ lấy tên màu
              price: item.price,
              quantity: item.quantity,
              itemId: item.itemId
            }
          }),
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
      
      const cartResponse = await api.get(`/phone/cart/${userId}`);
      const cartItemsData = cartResponse.data.data.items;

      const updatedCartItems = await Promise.all(
        cartItemsData.map(async (item) => {
          try {
            const productResponse = await api.get(
              `/phone/product/${item.productId}`
            );
            const variants = productResponse.data.variants;
            const thisVariant = variants.find(v => v.id === item.productVariantId);

            // Thêm logic lấy thông tin khuyến mãi
            let discountValue = 0;
            let originalPrice = thisVariant.price;
            let discountEndDate = null;
            
            try {
              const discountResponse = await api.get(
                `/phone/product/discount/getActive/${item.productVariantId}`
              );
              const discountData = discountResponse.data;
              if (discountData) {
                const now = new Date();
                const endDate = new Date(discountData.endDate);
                if (endDate > now) {
                  discountValue = discountData.discountValue;
                  discountEndDate = discountData.endDate;
                }
              }
            } catch (error) {
              console.error("Error fetching discount:", error);
            }

            const discountedPrice = originalPrice * (1 - discountValue / 100);

            return {
              ...item,
              id: item.itemId,
              variants: variants,
              stock: thisVariant.stock,
              originalPrice: originalPrice,
              discountValue: discountValue,
              discountEndDate: discountEndDate,
              price: discountedPrice, // Cập nhật giá đã áp dụng khuyến mãi
            };
          } catch (error) {
            console.error("Lỗi xử lý sản phẩm:", error);
            return item;
          }
        })
      );

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
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

  const handleUpdateItems = async () => {
    try {
      const promises = cartItems.map((item) =>
        api.post(`/phone/cart/updateQuantity?userId=${user.id}&variantId=${item.itemId}&quantity=${item.quantity}`)
      );
      await Promise.all(promises);
      setCartWasChanged(false)
    } catch (error) {
      console.error("Error updating cart quantities:", error);
    }
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
                        <div>
                        <FormControl size="small" sx={{ mt: 1, width: 160 }}>
                        <InputLabel>Màu sắc</InputLabel>
                        <Select
                          value={item.productVariantId}
                          onChange={(e) => handleColorChange(item.id, e.target.value)}
                          label="Màu sắc"
                          sx={{ maxWidth: 240 }}
                        >
                          {item.variants.map((variant) => {
                            // Tách hex code và tên màu từ chuỗi
                            const [hexCode, colorName] = variant.color.split(" - ");
                            
                            return (
                              <MenuItem key={variant.id} value={variant.id}>
                                {colorName || variant.color}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                    {item.discountValue > 0 ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-red-600 font-bold text-lg">
                          {formatPrice(item.price)}
                        </span>
                        <span className="line-through text-gray-500 text-sm">
                          {formatPrice(item.originalPrice)}
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                          -{item.discountValue}%
                        </span>
                        {item.discountEndDate && (
                          <div className="text-red-600 text-xs mt-1">
                            Dự kiến áp dụng đến {new Date(item.discountEndDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600 font-bold text-lg">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
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
                        inputProps={{
                          className: "text-center",
                          min: 1,
                          max: item.stock,
                        }}
                        className="w-16"
                      />
                      <IconButton
                        onClick={() => handleQuantity(item.id, "increase")}
                        disabled={item.quantity >= item.stock}
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
        onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
    </div>
  );
};

export default Cart;
