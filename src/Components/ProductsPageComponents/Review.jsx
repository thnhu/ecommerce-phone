import stars from "../../assets/stars";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const FullScreenImage = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-32 md:inset-x-16 flex items-center justify-center bg-black ">
      <img
        src={`data:image/*;base64,${imageUrl}`}
        alt="Full Screen"
        className="max-w-full max-h-full object-contain"
      />
      <button
        className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full shadow-md"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

const Review = ({ starsRating, username, comment, date, images }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imgURL, setImgURL] = useState(0);

  return (
    <>
      <>
        {isFullScreen && (
          <FullScreenImage
            imageUrl={imgURL}
            onClose={() => setIsFullScreen(false)}
          />
        )}
        <div className="review w-full border-[1px] border-opacity-10 border-black rounded-3xl px-8 py-5  md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center w-full">
              <img
                src={stars[starsRating]}
                className="w-[108px] h-[20px] md:w-[128px] md:h-[24px] lg:w-[148px] lg:h-[28px]"
                alt="rating"
                draggable="false"
                style={{ userSelect: "none" }}
              />
              {/* <button className="hidden md:inline-block justify-self-end">
                <p className="p-text opacity-60 ">...</p>
              </button> */}
            </div>
            <div className="mt-[5px]">
              <h2 className="header-font text-[15px] md:text-[17px] lg:text-[20px]">
                {username}
              </h2>
              <p className="text-[13px] md:text-[15px] md:mt-1 lg:text-[17px] leading-tight p-font opacity-60">
                {comment}
              </p>
              <div className="m-3">
                {images.map((image, index) => (
                  <img
                    src={`data:image/*;base64,${image.data}`}
                    className="w-20 h-20 object-cover rounded"
                    key={index}
                    onClick={() => {
                      setIsFullScreen(true);
                      setImgURL(image.data);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-1 text-[13px] p-font opacity-60 md:text-[15px] md:mt-1 lg:text-[17px]">
            Đăng ngày {date}
          </p>
        </div>
      </>
    </>
  );
};

Review.propTypes = {
  starsRating: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Review;
