import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>ĐIỆN THOẠI DI ĐỘNG CHÍNH HÃNG</h1>
        <p>
            Hệ thống bán lẻ điện thoại với mạng lưới hàng ngàn cửa hàng trên toàn quốc
        </p>
        <button className="shop-now">Mua ngay</button>
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
        <img src="" alt="Samsung" />
        <img src="" alt="iPhone" />
        <img src="" alt="Xiaomi" />
        <img src="" alt="Hwawei" />
        <img src="" alt="Oppo" />
      </div>
    </section>
  );
};

export default Hero;
