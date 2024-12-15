import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar__main">
                <div className="navbar__logo">
                    <h1>THEGIOIDIDONG</h1>
                </div>
                <nav className="navbar__links">
                    <ul>
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Giảm giá</a></li>
                        <li><a href="#">Hàng mới về</a></li>
                        <li><a href="#">Thương hiệu</a></li>
                    </ul>
                </nav>
                <div className="navbar__search">
                    <input type="text" placeholder="Tìm kiếm sản phẩm" />
                </div>
                <div className="navbar__icons">
                    <button className="navbar__cart">🛒</button>
                    <button className="navbar__user">👤</button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
