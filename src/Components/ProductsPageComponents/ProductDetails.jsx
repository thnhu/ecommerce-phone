import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../const/const";
import stars from "../../assets/stars";
import PropTypes from "prop-types";
import api from "../../services/api";
import CustomSnackbar from '../../Components/CustomSnackbar';
const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState(0);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [productVariantId, setProductVariantId] = useState();
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [discountEndDate, setDiscountEndDate] = useState(null);
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
  
  // useEffect(() => {console.log(product.variants[selectedColor].variantId)}, [selectedColor]);
  
  const updateQuantity = (add) => {
    const stock = product.variants[selectedColor].stock;
    if (stock === 0) {
      showSnackbar('Sản phẩm đã hết hàng', 'error');
    }

    if (add === -1 && quantity === 1) return;

    if (add === -1 && quantity - 1 > 0) {
      setQuantity((prevQuantity) => prevQuantity + add);
      if (quantity - 1 <= stock) {
        setErrorQuantity(false);
      }
    } else if (quantity >= stock) {
      setErrorQuantity(true);
      return;
    } else {
      setQuantity((prevQuantity) => prevQuantity + add);
      if (quantity + 1 <= stock) {
        setErrorQuantity(false);
      }
    }
  };

  const updateColor = (color) => {
    setColor(color);
    const variantId = product.variants[color].id;
    setProductVariantId(variantId);
    
    const stock = product.variants[color].stock;
    if (quantity > stock) {
      setErrorQuantity(true);
    } else {
      setErrorQuantity(false);
    }
  };
  //Preload stock to see if it out of stock
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      setProductVariantId(firstVariant.id);
      if (firstVariant.stock === 0) {
        setErrorQuantity(true);
      }
    }
    console.log(product);
    console.log(product.variants[0].id);
    setProductVariantId(product.variants[0].id);
  }, [product]);

  useEffect(() => {
    const fetchDiscount = async () => {
      if (!productVariantId) return;
      
      try {
        const response = await api.get(
          `/phone/product/discount/getActive/${productVariantId}`
        );
        setCurrentDiscount(response.data.discountValue || 0);
        setDiscountEndDate(response.data.endDate); // Lưu ngày kết thúc
      } catch (error) {
        console.error("Error fetching discount:", error);
        setCurrentDiscount(0);
      }
    };
  
    fetchDiscount();
  }, [productVariantId]);
 
  const handleInputBlur = () => {
    const newQuantity = Math.max(1, Math.min(stock, quantity)); // Clamp value between 1 and 5
    setQuantity(newQuantity);
  };
  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      const stock = product.variants[selectedColor].stock;

      const numericValue = Number(value);

      setQuantity(numericValue);
      if (numericValue <= stock) {
        setErrorQuantity(false);
      } else {
        setErrorQuantity(true);
      }
    }
  };

  //Format and map rating points
  const formatRating = (rating) => {
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating)) {
      return "0.0";
    }
    const roundedRating = Math.round(parsedRating * 2) / 2;
    return roundedRating.toFixed(1);
  };
  const ratingKey = formatRating(product.rating);
  const ratingImage = stars[ratingKey];

  const isValidColor = (color) => {
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    if (hexRegex.test(color)) {
      return true;
    }
    if (rgbRegex.test(color)) {
      const matches = rgbRegex.exec(color);
      // Ensure that each RGB value is between 0 and 255
      const r = parseInt(matches[1], 10);
      const g = parseInt(matches[2], 10);
      const b = parseInt(matches[3], 10);

      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        return true;
      }
    }
    return false;
  };

  // Hàm định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };
  const formatDiscountDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const time = date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const datePart = date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    });
  
    return `${time} | ${datePart}`;
  };

  const addToCart = async () => {
    const userResponse = await api.get("/phone/user/myInfo");
    const userId = userResponse.data.id;
    await api.post(
      `/phone/cart?userId=${userId}&variantId=${productVariantId}&quantity=${quantity}`
    );
  };
  
  const handleAddCart = async () => {
    if (!errorQuantity) {
      const isLoggedIn = localStorage.getItem('authToken');
      if (!isLoggedIn) {
        showSnackbar('Vui lòng đăng nhập để sử dụng chức năng này', 'error');
        return;
      }
  
      try {
        await addToCart();
        showSnackbar('Thêm vào giỏ hàng thành công!', 'success');
      } catch (e) {
        console.log(e);
        showSnackbar('Có lỗi xảy ra khi thêm vào giỏ hàng', 'error');
      }
    }
  };
  
  const handleBuyNow = async () => {
    const isLoggedIn = localStorage.getItem('authToken');
    if (!isLoggedIn) {
      showSnackbar('Vui lòng đăng nhập để mua hàng', 'error');
      return;
    }
  
    const stock = product.variants[selectedColor].stock;
    if (stock === 0 || quantity > stock) {
      showSnackbar('Số lượng không hợp lệ', 'error');
      return;
    }
  
    try {
      await addToCart(); // Thêm vào giỏ hàng trước khi chuyển trang
      navigate('/order', { 
        state: { 
          product: product,
          variantId: productVariantId,
          quantity: quantity,
          color: product.variants[selectedColor].color,
          price: hasDiscount ? discountedPrice : originalPrice
        }
      });
    } catch (e) {
      console.log(e);
      showSnackbar('Có lỗi xảy ra khi xử lý đơn hàng', 'error');
    }
  };
  
  if (!product) {
    return (
      <div className="flex justify-center items-center">
        <p>Đang tải...</p>
      </div>
    );
  }
  const hasDiscount = currentDiscount > 0;
  const originalPrice = product.variants[selectedColor].price;
  const discountedPrice = hasDiscount
    ? originalPrice * (1 - currentDiscount / 100)
    : originalPrice;
    
  return (
    <>
      <div className="md:ml-[40px] md:w-1/2 mt-4 block">
        {/* Basic info name, price, rate, description */}
        <div className="basic-info">
          <p className="header-font text-[24px] md:text-3xl lg:text-[33px] font-bold">
            {product.name || "Tên sản phẩm chưa cập nhật"}
          </p>

          <div>
            <img
              src={ratingImage}
              className="w-[108px] h-[20px] md:w-[128px] md:h-[24px] md:my-1 lg:my-2 lg:w-[148px] lg:h-[28px]"
              alt="rating"
              draggable="false"
              style={{ userSelect: "none" }}
            />
          </div>

          <div className="flex flex-col">
          {hasDiscount ? (
            <div className="flex flex-col gap-2">
              {/* Dòng hiển thị giá */}
              <div className="flex items-baseline gap-3">
                <span className="text-red-600 text-2xl font-bold">
                  {formatPrice(discountedPrice)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-500 text-lg">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                    -{currentDiscount}%
                  </span>
                </div>
              </div>

                {/* Dòng hiển thị thời gian*/}
                {discountEndDate && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                  <span>
                    Giá khuyến mãi dự kiến áp dụng đến{" "}
                    <span className="font-bold">
                      {formatDiscountDate(discountEndDate)}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ) : (
              <span className="text-red-600 text-2xl font-bold">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        </div>
        {/* Colors selector */}
        <div className="width-full">
          <div className="border-t-2 mt-[20px] mb-[20px] pt-4 pb-4">
            {product && product.variants[selectedColor].stock > 0 ? (
              errorQuantity ? (
                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-red-500">
                  Rất tiếc, số lượng sản phẩm chúng tôi hiện có là {" "}
                  {product.variants[selectedColor].stock}. Vui lòng điều chỉnh lại số lượng.
                </p>
              ) : null
            ) : (
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-red-500">
                Sản phẩm đã hết hàng
              </p>
            )}
            <p className="p-font text-[14px] md:text-[16px] lg:text-[18px] opacity-60">
              Chọn màu
            </p>
            <div className="color-selector pt-2 m-0 flex flex-auto gap-4">
             {product.variants &&
             product.variants.map((variant, index) => {
              // Tách chuỗi màu thành mã HEX và tên
              const [hexCode, colorName] = variant.color.split(" - ");
              
              if (!isValidColor(hexCode)) {
                  return null;
              }

              return (
                <div 
                  className="flex flex-col items-center gap-2 group" 
                  key={index}
                >
                  <div className="relative">
                    {/* Nút chọn màu */}
                    <button
                      className={`w-8 h-8 rounded-full transition-all duration-200 
                        shadow-md hover:shadow-lg ${
                          index === selectedColor
                            ? "ring-2 ring-offset-2 ring-black scale-110"
                            : "hover:scale-105"
                        }`}
                      onClick={() => updateColor(index)}
                      style={{ backgroundColor: hexCode }}
                    >
                      {/* Hiệu ứng hover */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity bg-white" />
                    </button>
                  </div>
        
                  {/* Tên màu */}
                  <span className="text-sm font-medium text-gray-700 text-center capitalize">
                    {colorName || "Không xác định"}
                  </span>
                </div>
              );
            })}
        </div>
        
          {/* Add to cart */}
          <div className="md:border-b-2 mb-[20px] pb-4 flex size-full mt-2 gap-3 ">
          <div
            className="relative quantity-selector flex justify-center items-center gap-4 w-[170px] h-[52px] rounded-[62px]"
            style={{ backgroundColor: theme.colors.unselectedButton }}
          >
              <button
                className="rounded-full size-12 text-[14px] md:text-[18px]"
                onClick={() => updateQuantity(-1)}
              >
                -
              </button>
              <input
                inputMode="numeric"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="m-0 text-[14px] md:text-[18px] text-center w-[50px] appearance-none -moz-appearance-none -webkit-appearance-none bg-inherit"
              />
              <button
                className="rounded-full size-12 text-[14px] md:text-[18px]"
                onClick={() => updateQuantity(1)}
              >
                +
              </button>
            </div>
          {/* Add to Cart Button */}
          <div className="bg-white rounded-[62px] flex-1 border-2 border-black hover:bg-black hover:text-white">
              <button
                className="text-sm font-semibold px-4 md:text-[16px] text-black w-full h-[44px] md:h-[52px] hover:bg-black hover:text-white rounded-full"
                onClick={handleAddCart}
                disabled={errorQuantity || product.variants[selectedColor].stock === 0}
              >
                Thêm vào giỏ
              </button>
            </div>
            {/* Buy Now Button */}
            <div className="bg-red-600 rounded-[62px] flex-1">
              <button
                className="p-font text-sm px-4 md:text-[16px] text-white w-full h-[44px] md:h-[52px]"
                onClick={handleBuyNow}
                disabled={errorQuantity || product.variants[selectedColor].stock === 0}
              >
                Mua ngay
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
      </div>
    </>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object, // Ensure product is an object
};

export default ProductDetail;