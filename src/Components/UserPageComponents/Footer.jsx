import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-5 py-10 text-sm text-gray-800 h-full p-0 m-0 w-full b-0">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        {/* Logo and Description */}
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-5">
          <h3 className="text-lg font-semibold mb-3">DIDONGVERSE</h3>
          <p className="text-gray-600 leading-relaxed">
            Giới thiệu công ty
          </p>
        </div>

        {/* Links Sections */}
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-5">
          <h4 className="text-lg font-semibold mb-3">Về công ty</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Giới thiệu</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Tuyển dụng</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Gửi góp ý</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Tìm siêu thị</a></li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 mb-5">
          <h4 className="text-lg font-semibold mb-3">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Chăm sóc khách hàng</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Giao hàng & Thanh toán</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Chính sách bảo hành</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Chính sách đổi trả</a></li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 mb-5">
          <h4 className="text-lg font-semibold mb-3">Hỏi đáp</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Tài khoản</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Phiếu mua hàng</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Lịch sử mua hàng</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Thanh toán</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-10">
        <p>DIDONGVERSE © 2025, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
