import { useEffect, useState } from "react";
import Equalizer from "../../assets/sampleImages/equalizer-buttons-icon-outline-dj-music-vector.jpg";
import api from "../../services/api";
import DropdownButton from "./DropdownButton";
import Review from "./Review";
import { Link } from "react-router-dom";
const totalRatings = 432;

const ReviewSection = ({ product }) => {
  const [reviewData, setReviewData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(4);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatStar = (star) => {
    return Number.isInteger(star) ? `${star}.0` : star;
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(
        `/phone/review?page=${currentPage}&size=${size}&productId=${product.id}`
      );
      console.log(product.id);
      setReviewData(response.data.content);
      // console.log(reviewData)
      setLoading(false);
    } catch (error) {
      console.log("Error fetching reviews" + error);
    }
  };

  useEffect(() => {
    console.log(reviewData);
  }, [reviewData]);

  useEffect(() => {
    fetchReviews();
  }, [currentPage, size]);

  if (loading) {
    return null;
  }

  return (
    <>
      <div className="review-section w-full py-[26px] relative z-30">
        <div className="flex w-full items-center justify-between">
          <div className="rating-wrapper w-1/2 flex items-end md:w-[55%]  ">
            <h1 className="header-font text-[18px] md:text-[22px] lg:text-[28px]">
              Đánh giá sản phẩm
            </h1>
            {/* <p className="text-[14px] md:text-[16px] md:pb-[2px] lg:text-[18px] lg:pb-[3px] p-font opacity-60 ml-1">
              ({totalRatings})
            </p> */}
          </div>

          <div className="flex gap-1 md:gap-5 items-center justify-center ">
            {/* <button className="size-8 md:size-10 rounded-full overflow-clip flex items-center justify-center">
              <img
                src={Equalizer}
                alt=""
                className="size-5 md:size-10"
                draggable="false"
                style={{ userSelect: "none" }}
              />
            </button> */}
            {/* <DropdownButton /> */}
            {/* <Link to={"/review"}>
              <button className="p-font text-white text-[12px] md:text-[16px] lg:text-[20px] bg-black px-4 py-2 lg:px-5 rounded-[62px] whitespace-nowrap">
                <p>Viết đánh giá</p>
              </button>
            </Link> */}
          </div>
        </div>

        {/* Chưa có đánh giá */}
        {reviewData &&
            reviewData.length == 0 && <div className="p-font text-[16px] md:text-[18px] lg:text-[20px] border-opacity-10 border-black border-2 rounded-3xl px-10 md:min-h-20 py-1 mt-10 flex items-center justify-center">
          <p>Chưa có đánh giá</p>
        </div>}

        <div className="reviews mt-4 md:grid md:grid-cols-2 md:gap-5 border p-5 rounded-3xl mb-5">
          {reviewData &&
            reviewData.length > 0 &&
            reviewData.map((review, index) => {
              return (
                <Review
                  starsRating={formatStar(review.rating)}
                  username={review.displayName}
                  comment={review.comment}
                  date={formatDate(review.createdAt)}
                  key={review.id}
                  images={review.images}
                />
              );
            })}
        </div>
        {reviewData &&
            reviewData.length > 0 && <div className="flex items-center justify-center">
          <button
            className="p-font text-[16px] md:text-[18px] lg:text-[20px] border-opacity-10 border-black border-2 rounded-3xl px-5 py-1"
            onClick={() => setSize((prevPage) => prevPage + 4)}
          >
            Xem thêm đánh giá
          </button>
        </div>}
      </div>
    </>
  );
};

export default ReviewSection;
