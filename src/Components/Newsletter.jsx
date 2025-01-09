import React from 'react';
const Newsletter = () => {
  return (
    <div className="bg-black text-white py-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          ĐĂNG KÝ ĐỂ NHẬN TIN KHUYẾN MÃI
        </h2>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center w-full sm:w-auto border border-gray-300 rounded-full overflow-hidden bg-white">
            <input
              type="email"
              placeholder="Nhập email của bạn tại đây"
              className="w-full sm:w-72 px-4 py-2 outline-none bg-transparent text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 transition duration-300"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;