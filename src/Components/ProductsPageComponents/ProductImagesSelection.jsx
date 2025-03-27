import { useState, useEffect } from "react";

const ProductImagesSelection = ({ productImg }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const setCurrentSelectedImage = (index) => {
    setSelectedImage(index);
  };

  const nextImages = () => {
    if (selectedImage < productImg.length - 1) {
      setSelectedImage((index) => index + 1);
      if (startIndex + 3 < productImg.length) {
        setStartIndex(startIndex + 1);
      }
    } else {
      setSelectedImage(0);
      setStartIndex(0);
    }
  };

  const prevImages = () => {
    if (selectedImage > 0) {
      setSelectedImage((index) => index - 1);
      if (startIndex > 0) {
        setStartIndex(startIndex - 1);
      }
    } else {
      setSelectedImage(productImg.length - 1);
      setStartIndex(Math.max(0, productImg.length - 3)); // Ensure we don't go negative
    }
  };

  // Calculate how many images to display (max 3)
  const imagesToDisplay = Math.min(productImg?.length || 0, 3);

  // Check if productImg is undefined or an empty array
  if (!productImg || productImg.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:w-1/2 mt-4 md:flex-row gap-0">
      <div className="flex justify-between items-center  md:h-[530px] gap-3  md:grid md:grid-cols-1 md:gap-[14px] md:mr-[14px] relative">
        {/* Previous Button */}
        <button
          onClick={prevImages}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:rotate-90"
        >
          &lt;
        </button>

        {/* Images carousel */}
        <div className="w-full flex gap-3 md:flex-col justify-evenly align-middle mt-2 md:mt-0">
          {productImg && productImg.length > 0 && productImg
            .slice(startIndex, startIndex + imagesToDisplay)  // Dynamically slice the images
            .map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSelectedImage(startIndex + index)}
                className={`${
                  selectedImage === startIndex + index
                    ? "border-[1px] border-black rounded-md"
                    : ""
                } box-border`}
              >
                <img
                  src={`data:image/*;base64,${image.data}`}  // Use base64 data
                  alt={`Image ${startIndex + index}`}
                  className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] object-co"
                />
              </button>
            ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextImages}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md md:bottom-0 md:right-1/2 md:translate-x-1/2 md:translate-y-1/2 md:top-auto md:rotate-90"
        >
          &gt;
        </button>
      </div>

      {/* Main Display Image */}
      <div className="flex justify-center align-middle w-full">
        {productImg && productImg.length > 0 && (
          <img
            src={`data:image/*;base64,${productImg[selectedImage].data}`}  // Main image with base64 data
            alt="Failed to load"
            className="w-[358px] h-[290px] overflow-clip md:w-[444px] md:h-[530px] object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImagesSelection;
