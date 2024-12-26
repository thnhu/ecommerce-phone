import { useState } from "react";
import { theme } from "../../const/const";
import stars from "../../assets/stars";
import PropTypes from "prop-types";

const colorsSample = ["#000000", "#898f6b", "#FF0000"];

const ProductDetail = ({ starsRating }) => {
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

  return (
    <>
      <div className="md:ml-[40px] bg-blue-400 md:w-1/2 mt-4 block">
        {/* Basic info name price rate description */}
        <div className="basic-info">
          <p className="header-font text-[24px] md:text-3xl lg:text-[33px]">
            Pokemon Cards
          </p>
          <img
            src={stars[starsRating]}
            className="w-[108px] h-[20px] md:w-[128px] md:h-[24px] md:my-1 lg:my-2 lg:w-[148px] lg:h-[28px]"
            alt="rating"
            draggable="false"
            style={{ userSelect: "none" }}
          />
          <h2 className="p-font text-2xl md:text-xl lg:text-2xl">$260</h2>
          <p className="p-font text-[14px] md:text-[16px] lg:text-[18px] opacity-60 mt-[5px] md:mt-[8px] leading-3 md:leading-5">
            This is so nice. I really want one of these at my home at all time,
            writing too long to see the wrapping
          </p>
        </div>
        {/* other fields */}
        <div className="width-full">
          {/* colors */}
          <div className="border-t-2 border-b-2 mt-[20px] mb-[20px] pt-4 pb-4">
            <p className="p-font text-[14px] md:text-[16px] lg:text-[18px] opacity-60">
              Select Colors
            </p>
            <div className="color-selector pt-2 m-0 flex flex-auto gap-4">
              {colorsSample.map((color, index) => (
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
              ))}
            </div>
          </div>
          {/* add to cart */}
          <div className="border-b-2 mb-[20px] pb-4 flex size-full">
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
              {/* <p className="m-0 text-[14px] md:text-[18px]">{quantity}</p> */}
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
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductDetail.propTypes = {
  starsRating: PropTypes.string.isRequired,
};

export default ProductDetail;
