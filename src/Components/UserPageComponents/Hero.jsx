import React from 'react';
import samsungLogo from "../../assets/images/logo-samsung.png";
import iPhoneLogo from "../../assets/images/logo-iPhone.png";
import xiaomiLogo from "../../assets/images/logo-xiaomi.png";
import huaweiLogo from "../../assets/images/logo-huawei.jpg";
import oppoLogo from "../../assets/images/logo-oppo.png";
import Button from '../Button/Button';
const Hero = () => {
  return (
    <section className="py-12 bg-gray-100 text-center mt-4">
      <div className="mb-10">
        <h1 class="text-4xl font-bold text-gray-800">ĐIỆN THOẠI DI ĐỘNG CHÍNH HÃNG</h1>
        <p class="text-lg text-gray-600 my-5">
            Hệ thống bán lẻ điện thoại với mạng lưới hàng ngàn cửa hàng trên toàn quốc
        </p>
        <Button 
        variant="secondary" 
        label="Mua ngay" 
        onClick={() => handleClick('secondary')} 
      />
      </div>

      <div className="flex justify-evenly items-center gap-5 flex-wrap mt-8">
        <div className="text-center min-w-[150px]">
          <h2 className="text-2xl font-bold text-black">5000+</h2>
          <p className="text-lg text-gray-600">Cửa hàng trên toàn quốc</p>
        </div>
        <div className="text-center min-w-[150px]">
          <h2 className="text-2xl font-bold text-black">2,000+</h2>
          <p className="text-lg text-gray-600">Sản phẩm chất lượng cao</p>
        </div>
        <div className="text-center min-w-[150px]">
          <h2 className="text-2xl font-bold text-black">20,000+</h2>
          <p className="text-lg text-gray-600">Khách hàng</p>
        </div>
      </div>

      <div className="flex justify-center gap-8 flex-wrap mt-10">
        <img class="h-10 object-contain" src={samsungLogo} alt="Samsung" />
        <img class="h-10 object-contain" src={iPhoneLogo} alt="iPhone" />
        <img class="h-10 object-contain" src={xiaomiLogo} alt="Xiaomi" />
        <img class="h-10 object-contain" src={oppoLogo} alt="Oppo" />
        <img class="h-10 object-contain" src={huaweiLogo} alt="Hwawei" />       
      </div>
    </section>

  );
};

export default Hero;
