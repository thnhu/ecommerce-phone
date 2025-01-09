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
        <div className="navbar-logo">THEGIOIDIDONG</div>
        
        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#">Trang chủ</a></li>
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
          {/* <span className="icon">🔍</span> */}
          <span className="icon">🛒</span>
          <span className="icon">👤</span>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger">☰</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
