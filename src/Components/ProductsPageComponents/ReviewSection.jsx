import Equalizer from "../../assets/sampleImages/equalizer-buttons-icon-outline-dj-music-vector.jpg";
import DropdownButton from "./DropdownButton";
import Review from "./Review";
import { Link } from "react-router-dom";
const totalRatings = 432;

const ReviewSection = () => {
  return (
    <>
      <div className="review-section w-full py-[26px] relative z-30">
        <div className="flex w-full items-center justify-between">
          <div className="rating-wrapper w-1/2 flex items-end md:w-[55%]  ">
            <h1 className="header-font text-[18px] md:text-[22px] lg:text-[28px]">
              Tất cả đánh giá
            </h1>
            <p className="text-[14px] md:text-[16px] md:pb-[2px] lg:text-[18px] lg:pb-[3px] p-font opacity-60 ml-1">
              ({totalRatings})
            </p>
          </div>

          <div className="flex gap-1 md:gap-5 items-center justify-center ">
            <button className="size-8 md:size-10 rounded-full overflow-clip flex items-center justify-center">
              <img
                src={Equalizer}
                alt=""
                className="size-5 md:size-10"
                draggable="false"
                style={{ userSelect: "none" }}
              />
            </button>
            <DropdownButton />
            <Link to={"/review"}>
              <button className="p-font text-white text-[12px] md:text-[16px] lg:text-[20px] bg-black px-4 py-2 lg:px-5 rounded-[62px] whitespace-nowrap">
                <p>Viết đánh giá</p>
              </button>
            </Link>
          </div>
        </div>

        <div className="reviews mt-4 md:grid md:grid-cols-2 md:gap-5">
          <Review
            starsRating="0.5"
            username="Samatha D."
            comment="Hàng chính hãng. Giao nhanh, đóng gói cẩn thận."
            date="24/02/2025"
          />
          <Review
            starsRating="0.5"
            username="Samatha D."
            comment="Giao hàng nhanh chóng. Hàng chính hãng, đúng mẫu mã"
            date="10/03/2025"
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="p-font text-[16px] md:text-[18px] lg:text-[20px] border-opacity-10 border-black border-2 rounded-3xl px-5 py-1">
            Xem thêm đánh giá
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
