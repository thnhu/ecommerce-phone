import { useEffect, useState } from "react";
import { theme } from "../../const/const";
import stars from "../../assets/stars";
import PropTypes from "prop-types";
import api from "../../services/api";
import CustomSnackbar from '../../Components/CustomSnackbar';
const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState(0);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [productVariantId, setProductVariantId] = useState();
  const [discount, setDiscount] = useState();
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
    const stock = product.variants[color].stock;
    setProductVariantId(product.variants[selectedColor].id);
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
      setProductVariantId(product.variants[0].id);
      if (firstVariant.stock === 0) {
        setErrorQuantity(true);
      }
    }
    console.log(product);
    console.log(product.variants[0].id);
    setProductVariantId(product.variants[0].id);
  }, [product]);

    useEffect(() => {
      fetchDiscount();
    }, []);
  
    const fetchDiscount = async () => {
      try {
        const response = await api.get(`/phone/product/discount/getActive/${productVariantId}`);
        console.log(response.data.discountValue);
        setDiscount(response.data.discountValue);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách nhà cung cấp');
        setLoading(false);
      }
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

  const handleInputBlur = () => {
    const newQuantity = Math.max(1, Math.min(1000, quantity)); // Clamp value between 1 and 5
    setQuantity(newQuantity);
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

  const formatNumber = (number) => {
    return new Intl.NumberFormat("de-DE").format(number);
  };

  const handleAddCart = async () => {
    if (!errorQuantity) {
      // Kiểm tra trạng thái đăng nhập qua localStorage
      const isLoggedIn = localStorage.getItem('authToken');
      
      if (!isLoggedIn) {
        showSnackbar('Vui lòng đăng nhập để sử dụng chức năng này', 'error');
        return;
      }
  
      try {
        const userResponse = await api.get("/phone/user/myInfo");
        const userId = userResponse.data.id;
        try {
          const cartResponse = await api.post(
            `/phone/cart?userId=${userId}&variantId=${productVariantId}&quantity=${quantity}`
          );
          showSnackbar('Thêm vào giỏ hàng thành công!', 'success');
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
    };

  if (!product) {
    return (
      <div className="flex justify-center items-center">
        <p>Đang tải...</p>
      </div>
    );
  }
  const hasDiscount = product.variants[selectedColor].discount > 0;
      // Hàm định dạng tiền tệ
      const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    // Hàm tính giá gốc chính xác (nếu discount là phần trăm)
    const calculateOriginalPrice = (price, discount) => {
        return price * (1 - discount / 100);
    };
    const originalPrice = hasDiscount
    ? calculateOriginalPrice(product.variants[selectedColor].price, product.variants[selectedColor].discount)
    : product.variants[selectedColor].price;

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
            <div className="flex items-baseline gap-2">
                {/* Giá khuyến mãi */}
                <span className="text-rose-600 text-2xl font-bold">
                    {formatPrice(product.variants[selectedColor].price)}
                </span>
                
                {/* Giá gốc và % giảm */}
                <div className="flex items-baseline gap-1">
                    <span className="line-through text-gray-500 text-xl">
                        {formatPrice(originalPrice)}
                    </span>
                    <span className="text-red-500 font-medium text-xl">
                        (-{product.variants[selectedColor].discount}%)
                    </span>
                </div>
            </div>
        ) : (
            // Hiển thị giá thường khi không có discount
            <span className="text-rose-600 text-2xl font-bold">
                {formatPrice(product.variants[selectedColor].price)}
            </span>
        )}
        </div>
              <p className="font-normal p-font text-[14px] md:text-[16px] lg:text-[18px] opacity-60 mt-[5px] md:mt-[8px] leading-3 md:leading-5">
            {product.description || "Chưa có mô tả"}
          </p>
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
                    {colorName || "Unknown Color"}
                  </span>
                </div>
              );
            })}
        </div>
        
          {/* Add to cart */}
          <div className="md:border-b-2 mb-[20px] pb-4 flex size-full mt-2">
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
                max="5"
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
            <div className="bg-black ml-3 rounded-[62px] w-full">
              <button
                className="p-font text-xl px-4 md:text-[16px] text-white w-full h-[44px] md:h-[52px]"
                onClick={handleAddCart}
              >
                Thêm vào giỏ
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