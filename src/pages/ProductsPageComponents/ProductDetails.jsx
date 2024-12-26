const ProductDetail = () => {
  return (
    <>
      <div className="ml-[40px] bg-blue-400 w-1/2 mt-4 mr-[100px]">
        <div className="basic-info">
          <p className="header-font text-3xl">One Life Graphic TShirt</p>
          <p className="mt-[14px]">Star holder</p>
          <h2 className="p-font text-2xl">$260</h2>
          <p className="p-font text-[16px] opacity-60 mt-[20px]">
            This is nice
          </p>
        </div>
        <div>
          <div className="border-t-2 border-b-2 mt-[20px] mb-[20px] pt-4 pb-4">
            <p className="p-font text-[16px] opacity-60">Select Colors</p>
            <div className="color-selector pt-1 m-0 flex flex-auto gap-3">
              <button className="rounded-full bg-[#000000] size-7"></button>
              <button className="rounded-full bg-[#00FF00] size-7"></button>
              <button className="rounded-full bg-[#FF0000] size-7"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
