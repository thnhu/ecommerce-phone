import PropTypes from "prop-types";

const OtherProductCard = ({ image, name, rateImage, price }) => {
  return (
    <div className="flex-col mt-8 md:mt-12 lg:mt-14 min-h-[290px] min-w-[200px]">
      <a href="#">
        <div className="w-full flex items-center justify-center">
          <img
            src={image}
            alt="Product Image"
            className="h-[200px] md:h-[230px] lg:h-[260px] w-full rounded-2xl"
          />
        </div>
        <p className="p-font font-extrabold overflow-x-hidden text-nowrap pt-2 text-[16px] md:text-[18px] lg:text-[20px]">
          {name}
        </p>
        <img src={rateImage} alt="" className="w-1/2 pt-1" />
        <p className="p-font bold text-[20px] md:text-[22px] lg:text-[24px] pt-1">${price}</p>
      </a>
    </div>
  );
};

OtherProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rateImage: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSwipe: PropTypes.func.isRequired,
};

export default OtherProductCard;
