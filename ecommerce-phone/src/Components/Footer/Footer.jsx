import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section">
          <h3 className="footer-title">THEGIOIDIDONG</h3>
          <p className="footer-description">
            Giới thiệu công ty
          </p>
        </div>

        {/* Links Sections */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Về công ty</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Giới thiệu</a></li>
            <li><a href="#" className="footer-link">Tuyển dụng</a></li>
            <li><a href="#" className="footer-link">Gửi góp ý</a></li>
            <li><a href="#" className="footer-link">Tìm siêu thị</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Hỗ trợ</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Chăm sóc khách hàng</a></li>
            <li><a href="#" className="footer-link">Giao hàng & Thanh toán</a></li>
            <li><a href="#" className="footer-link">Chính sách bảo hành</a></li>
            <li><a href="#" className="footer-link">Chính sách đổi trả</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Hỏi đáp</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Tài khoản</a></li>
            <li><a href="#" className="footer-link">Phiếu mua hàng</a></li>
            <li><a href="#" className="footer-link">Lịch sử mua hàng</a></li>
            <li><a href="#" className="footer-link">Thanh toán</a></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Thegioididong © 2024, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
