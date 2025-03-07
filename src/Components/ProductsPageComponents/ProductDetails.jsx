import { useEffect, useState } from "react";
import { theme } from "../../const/const";
import stars from "../../assets/stars";
import PropTypes from "prop-types";

const colorsSample = ["#000000", "#898f6b", "#FF0000", "#FFF0012321"];

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState(-1);

  const updateQuantity = (add) => {
    if (add === -1 && quantity === 1) return;
    setQuantity((prevQuantity) => prevQuantity + add);
  };

  const updateColor = (color) => {
    setColor(color);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleInputBlur = () => {
    const newQuantity = Math.max(1, Math.min(1000, quantity)); // Clamp value between 1 and 5
    setQuantity(newQuantity);
  };

  useEffect(() => {
    console.log(product); // Log the product for debugging
  }, [product]);

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

  // Check if product is null or undefined
  if (!product) {
    return (
      <div className="flex justify-center items-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:ml-[40px] md:w-1/2 mt-4 block">
        {/* Basic info name, price, rate, description */}
        <div className="basic-info">
          <p className="header-font text-[24px] md:text-3xl lg:text-[33px]">
            {product.name || "Product Name Unavailable"}
          </p>
          <img
            src={stars[0]}
            className="w-[108px] h-[20px] md:w-[128px] md:h-[24px] md:my-1 lg:my-2 lg:w-[148px] lg:h-[28px]"
            alt="rating"
            draggable="false"
            style={{ userSelect: "none" }}
          />
          <h2 className="p-font text-2xl md:text-xl lg:text-2xl">
            {product.variants && product.variants.length > 0
              ? product.variants[0].price
              : "Giá chưa được cập nhật"}
          </h2>
          <p className="p-font text-[14px] md:text-[16px] lg:text-[18px] opacity-60 mt-[5px] md:mt-[8px] leading-3 md:leading-5">
            {product.description || "Chưa có mô tả"}
          </p>
        </div>

        {/* Colors selector */}
        <div className="width-full">
          <div className="border-t-2 border-b-2 mt-[20px] mb-[20px] pt-4 pb-4">
            <p className="p-font text-[14px] md:text-[16px] lg:text-[18px] opacity-60">
              Chọn màu
            </p>
            <div className="color-selector pt-2 m-0 flex flex-auto gap-4">
              {colorsSample.map((color, index) => {
                // Skip rendering if color is invalid
                if (!isValidColor(color)) {
                  return null; // If color is invalid, return null and don't render the button
                }
                return (
                  <button
                    className={`rounded-full size-7 md:size-9 ${
                      index === selectedColor
                        ? "border-[1px] border-black -translate-y-1"
                        : ""
                    }`}
                    key={index}
                    onClick={() => updateColor(index)}
                    style={{ backgroundColor: color }}
                  ></button>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <div className="md:border-b-2 mb-[20px] pb-4 flex size-full">
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
                onBlur={handleInputBlur} // Trigger validation when the input field loses focus
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
              <button className="p-font text-[14px] px-4 md:text-[16px] text-white w-full h-[44px] md:h-[52px]">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object, // Ensure product is an object
};

export default ProductDetail;
