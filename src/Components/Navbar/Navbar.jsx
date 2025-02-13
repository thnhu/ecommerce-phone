import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/"><div className="navbar-logo">THEGIOIDIDONG</div></a>
        
        
        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="#">Giảm giá</a></li>
            <li><a href="#">Hàng mới về</a></li>
            <li><a href="#">Thương hiệu</a></li>
          </ul>
        </div>

        <div className="navbar-icons">
          <input 
            type="text" 
            placeholder="Tìm kiếm" 
            className="navbar-search"
          />
          <a href="/cart"><span className="icon">Giỏ hàng</span></a>
          <a href="/login"><span className="icon">Đăng nhập</span></a>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger">Menu</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
