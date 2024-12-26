import { useState } from "react";
import Sprigatito from "../../assets/sampleImages/Sprigatito.png";
import Fuecoco from "../../assets/sampleImages/Fuecoco.png";
import Quaxly from "../../assets/sampleImages/Quaxly.png";

const arrayOfImage = [Sprigatito, Fuecoco, Quaxly, Sprigatito]; 

const ProductImagesSelection = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0); 

  const setCurrentSelectedImage = (index) => {
    setSelectedImage(index);
  };

  const nextImages = () => {
    // Loop to the start if we're at the end of the array
    if (selectedImage < arrayOfImage.length - 1) {
      setSelectedImage((index) => index + 1);
      if (startIndex + 3 < arrayOfImage.length) {
        setStartIndex(startIndex + 1)
      }
    } else {
      setSelectedImage(0)
      setStartIndex(0); // Loop back to the start
    }
  };

  const prevImages = () => {
    // Loop to the end if we're at the start
    if (selectedImage > 0) {
      setSelectedImage((index) => index - 1);
      if (startIndex > 0) {
        setStartIndex(startIndex - 1)
      }
    } else {
      setSelectedImage(arrayOfImage.length - 1)
      setStartIndex(arrayOfImage.length - 3)
    }
  };

  return (
    <div className="flex flex-col-reverse md:w-1/2 bg-pink-300 mt-4 md:flex-row gap-0">
      <div className="flex justify-between items-center bg-orange-300 md:h-[530px] gap-3  md:grid md:grid-cols-1 md:gap-[14px] md:mr-[14px] relative">
        {/* Previous Button */}
        <button
          onClick={prevImages}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:rotate-90"
        >
          &lt;
        </button>

        {/* Images carousel */}
        <div className="w-full flex gap-3 md:flex-col justify-evenly align-middle">
          {arrayOfImage
            .slice(startIndex, startIndex + 3)
            .map((image, index) => (
              <button
                key={index} // Unique key for each button
                onClick={() => setCurrentSelectedImage(startIndex + index)} // Set the clicked image as selected
                className={`${
                  selectedImage === startIndex + index
                    ? "border-[1px] border-black rounded-md"
                    : ""
                } box-border`}
              >
                <img
                  src={image}
                  alt={`Image ${startIndex + index}`}
                  className="w-[111px] h-[106px] md:w-[152px] md:h-[167px]"
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
        <img
          src={arrayOfImage[selectedImage]}
          alt="Failed to load"
          className="w-[358px] h-[290px] overflow-clip md:w-[444px] md:h-[530px] object-contain "
        />
      </div>
    </div>
  );
};

export default ProductImagesSelection;
