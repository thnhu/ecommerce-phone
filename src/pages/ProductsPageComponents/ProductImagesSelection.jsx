// import { phones } from "../../const";
import Sprigatito from "../../assets/Sprigatito.png"

const ProductImagesSelection = () => {
  // const [product, setProduct] = useState({
  //   name: 'Product 1',
  // });

  return (
    <>
      <div className="w-1/2 bg-pink-300 mt-4 ml-[100px] flex gap-0">
        <div className="bg-orange-300 h-[530px] grid grid-cols-1 gap-[14px] mr-[14px]">

        <img src={Sprigatito} alt="Failed to load" className="w-[152px] h-[167px] border"></img>
        <img src={Sprigatito} alt="Failed to load" className="w-[152px] h-[167px]"></img>
        <img src={Sprigatito} alt="Failed to load" className="w-[152px] h-[167px]"></img>

        </div>
          <img src={Sprigatito} alt="Failed to load" className="w-[444px] h-[530px] flex-shrink-0"></img>
      </div>


    </>
  )
};

export default ProductImagesSelection;
