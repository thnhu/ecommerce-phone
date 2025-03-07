import React, { useState } from 'react'
import CategorisTable from '../Components/AdminPageComponents/CategoriesTable'
import ProductsTable from '../Components/AdminPageComponents/ProductManagement/ProductsTable'
import StockTable from '../Components/AdminPageComponents/StockManagement/StockTable'
import { Link } from "react-router-dom";
const StaffPage = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const handleClick = (e) => {
    setSelectedTab(e.target.id);
  };

  const SideBar = () => {
    return (
      <aside className="lg:w-1/6 bg-gray-900 min-w-[100px] md:min-w-[200px] text-white pl-4 pr-1 md:pt-3 h-full">
        <p className="font-p text-xl lg:text-2xl py-3">Quản lý chung</p>
        <ul>
          <li
            key="trangchu"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${
              selectedTab === "trangchu" ? "bg-gray-800 rounded-md" : ""
            }`}
          >
            <Link to="/">
              <button
                id="trangchu"
                className="md:w-full text-left"
                onClick={handleClick}
              >
                Trang chủ
              </button>
            </Link>
          </li>
          <li
            key="thietbi"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${
              selectedTab === "thietbi" ? "bg-gray-800 rounded-md" : ""
            }`}
          >
            <button
              id="thietbi"
              className="md:w-full text-left"
              onClick={handleClick}
            >
              Thiết bị
            </button>
          </li>
          <li
            key="nhacungcap"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${
              selectedTab === "nhacungcap" ? "bg-gray-800 rounded-md" : ""
            }`}
          >
            <button
              id="nhacungcap"
              className="md:w-full text-left"
              onClick={handleClick}
            >
              Nhà cung cấp
            </button>
          </li>
          <li
            key="kho"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${selectedTab === 'kho' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            <button
              id="kho"
              className="md:w-full text-left"
              onClick={handleClick}
            >
              Quản lý kho
            </button>
          </li>
        </ul>
      </aside>
    );
  };

  return (
    <>
      {/* Full height container */}
      <div className="w-full h-screen flex">
        {/* Sidebar will take full height of screen */}
        <SideBar />

        {/* Main content with flexible height */}
        <div className="flex-grow h-full overflow-auto">
          {selectedTab === "nhacungcap" && <CategorisTable />}
          {selectedTab === "thietbi" && <ProductsTable />}
          {selectedTab === "kho" && <StockTable />}
        </div>
      </div>
    </>
  );
};

export default StaffPage;
