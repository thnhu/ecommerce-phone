// import Sprigatito from "../../assets/sampleImages/Sprigatito.png";
import Sprigatito from "../../assets/images/iphone-16-pro-titan-sa-mac.png"
import stars from "../../assets/stars";
import OtherProductCard from "./OtherProductCard";

const SwipeableList = () => {
  // Sample data inside the component (replace this later as needed)
  const items = [
    { id: 1, image: Sprigatito, name: "Related phone ", rateImage: stars[1], price: 212 },
    { id: 2, image: Sprigatito, name: "Related phone ", rateImage: stars[2], price: 212 },
    { id: 3, image: Sprigatito, name: "Related phone ", rateImage: stars[3], price: 212 },
    { id: 4, image: Sprigatito, name: "Related phone ", rateImage: stars[4], price: 212 },
  ];

  return (
    <div className="flex gap-x-5 md:gap-x-10 lg:gap-x-15 overflow-auto">
      {items.map((item) => (
        <OtherProductCard
          key={item.id}
          image={item.image}
          name={item.name}
          rateImage={item.rateImage}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default SwipeableList;
