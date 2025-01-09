import Equalizer from "../../assets/sampleImages/equalizer-buttons-icon-outline-dj-music-vector.jpg";

const Sidebar = () => {
  return (
    <>
      <div className="w-1/4 m-[5px] border rounded-xl border-black border-opacity-10 p-[10px] hidden md:block">
        {/* Title */}
        <div className="title flex items-center justify-between ">
          <h1 className="text-l lg:text-xl font-bold text-center p-font">Filters</h1>
          <button className="size-8 md:size-10 rounded-full overflow-clip flex items-center justify-center">
            <img
              src={Equalizer}
              alt=""
              className="size-5 md:size-10"
              draggable="false"
              style={{ userSelect: "none" }}
            />
          </button>
        </div>
        {/* Category */}
        <div className="mt-[24px] border-t-[1px] border-b-[1px] border-black border-opacity-10 py-[20px] ">
          <ul>
            <li>
              <a href="#" className="w-full">
                <div className="flex items-center justify-around opacity-60">
                  <p className="p-font">T-shirt</p>
                  <div className="w-1/4 lg:w-1/2"></div>
                  <p>{">"}</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="w-full">
                <div className="flex items-center justify-around opacity-60">
                  <p className="p-font">T-shirt</p>
                  <div className="w-1/4 lg:w-1/2"></div>
                  <p>{">"}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        {/* Price  */}
        <div className="price-select">
        <div className="flex items-center justify-around opacity-60 py-[20px]">
                  <p className="p-font">Price</p>
                  <div className="w-1/4 lg:w-1/2"></div>

                </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
