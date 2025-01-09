import OtherProductCard from "../ProductsPageComponents/OtherProductCard";
import Sprigatito from "../../assets/sampleImages/Sprigatito.png";
import stars from "../../assets/stars";




const MainContent = () => {
    // Sample data inside the component (replace this later as needed)
    const items = [
      { id: 1, image: Sprigatito, name: "Polo with Contrast Trims aklsfdjlkagjl;hl", rateImage: stars[1], price: 212 },
      { id: 2, image: Sprigatito, name: "Polo with Contrast Trims aklsfdjlkagjl;hl", rateImage: stars[2], price: 212 },
      { id: 3, image: Sprigatito, name: "Polo with Contrast Trims aklsfdjlkagjl;hl", rateImage: stars[3], price: 212 },
      { id: 4, image: Sprigatito, name: "Polo with Contrast Trims aklsfdjlkagjl;hl", rateImage: stars[4], price: 212 },
    ];
  
  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
                <OtherProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  rateImage={item.rateImage}
                  price={item.price}
                  minH={1}
                  minW={1}
                />
              ))}
      </div>
    </>
  );
};

export default MainContent;
