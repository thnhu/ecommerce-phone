import "./ProductsPage.css"
import SwipeableList from "./SwipeableList";


const OtherProduct = () => {
  return (
    <>
    {/* Display Product Slides */}
    <div className="otherProducts">
      <h1 className="header-font self-center justify-self-center w-full text-center text-[32px] md:text-[36px] lg:text-[54px] mt-6 md:mt-8 lg:mt-10">
        YOU MIGHT ALSO LIKE
      </h1>
      <SwipeableList/>
    </div>     
    </>
  );
};

export default OtherProduct;
