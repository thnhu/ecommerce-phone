import stars from "../../assets/stars";
import PropTypes from "prop-types";

const Review = ({ starsRating, username, comment, date }) => {
  return (
    <>
      <>
        <div className="review w-full border-[1px] border-opacity-10 border-black rounded-3xl px-5 py-4 my-5 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center w-full">
              <img
                src={stars[starsRating]}
                className="w-[108px] h-[20px] md:w-[128px] md:h-[24px] lg:w-[148px] lg:h-[28px]"
                alt="rating"
                draggable="false"
                style={{ userSelect: "none" }}
              />
              <button className="hidden md:inline-block justify-self-end">
                <p className="p-text opacity-60 ">...</p>
              </button>
            </div>
            <div className="mt-[5px]">
              <h2 className="header-font text-[15px] md:text-[17px] lg:text-[20px]">
                {username}
              </h2>
              <p className="text-[13px] md:text-[15px] md:mt-1 lg:text-[17px] leading-tight p-font opacity-60">
                {comment}
              </p>
            </div>
          </div>
          <p className="mt-1 text-[13px] p-font opacity-60 md:text-[15px] md:mt-1 lg:text-[17px]">
            Posted on {date}
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
