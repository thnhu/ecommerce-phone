import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-black-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Không tìm thấy trang</h2>
      <p className="mt-2 text-gray-600">
      Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded shadow"
      >
        Quay về Trang chủ
      </a>
    </div>
  );
};

export default NotFoundPage;
