import React from 'react';
import './Hero.css';
import samsungLogo from "../../assets/images/logo-samsung.png";
import iPhoneLogo from "../../assets/images/logo-iPhone.png";
import xiaomiLogo from "../../assets/images/logo-xiaomi.png";
import huaweiLogo from "../../assets/images/logo-huawei.jpg";
import oppoLogo from "../../assets/images/logo-oppo.png";
import Button from '../Button/Button';
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>ĐIỆN THOẠI DI ĐỘNG CHÍNH HÃNG</h1>
        <p>
            Hệ thống bán lẻ điện thoại với mạng lưới hàng ngàn cửa hàng trên toàn quốc
        </p>
        <Button 
        variant="primary" 
        label="Mua ngay" 
        onClick={() => handleClick('primary')} 
      />
      </div>

      <div className="hero-stats">
        <div className="stat">
          <h2>5000+</h2>
          <p>Cửa hàng trên toàn quốc</p>
        </div>
        <div className="stat">
          <h2>2,000+</h2>
          <p>Sản phẩm chất lượng cao</p>
        </div>
        <div className="stat">
          <h2>30,000+</h2>
          <p>Khách hàng</p>
        </div>
      </div>

      <div className="hero-logos">
        <img src={samsungLogo} alt="Samsung" />
        <img src={iPhoneLogo} alt="iPhone" />
        <img src={xiaomiLogo} alt="Xiaomi" />
        <img src={oppoLogo} alt="Oppo" />
        <img src={huaweiLogo} alt="Hwawei" />       
      </div>
    </section>
  );
};

export default Hero;
