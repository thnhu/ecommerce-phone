import React, { useState } from 'react'
import UsersTable from '../Components/AdminPageComponents/UsersTable'
import CategoriesTable from '../Components/AdminPageComponents/CategoriesTable'
import ProductsTable from '../Components/AdminPageComponents/ProductsTable'
const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('')
  const handleClick = (e) => {
    setSelectedTab(e.target.id)
  }

  const SideBar = () => {
    return (
      <aside className='w-1/6 bg-gray-900 min-w-[200px] h-full text-white pl-4 pt-3'>
        <p className='font-p text-2xl py-3'>Quản lý chung</p>
        <ul>
          <li
            key="trangchu"
            className={`w-full px-5 py-3 text-xl ${selectedTab === 'trangchu' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            <button
              id="trangchu"
              className="w-full text-left"
              onClick={handleClick}
            >
              Trang chủ
            </button>
          </li>
          <li
            key="thietbi"
            className={`w-full px-5 py-3 text-xl ${selectedTab === 'thietbi' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            <button
              id="thietbi"
              className="w-full text-left"
              onClick={handleClick}
            >
              Thiết bị
            </button>
          </li>
          <li
            key="nhacungcap"
            className={`w-full px-5 py-3 text-xl ${selectedTab === 'nhacungcap' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            
              <button
                id="nhacungcap"
                className="w-full text-left"
                onClick={handleClick}
              >
                Nhà cung cấp
              </button>
            
          </li>
          <li
            key="nguoidung"
            className={`w-full px-5 py-3 text-xl ${selectedTab === 'nguoidung' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            <button
              id="nguoidung"
              className="w-full text-left"
              onClick={handleClick}
            >
              Người dùng
            </button>
          </li>
        </ul>
      </aside>
    )
  }

  return (
    <div className='w-full h-screen flex'>
      <SideBar></SideBar>
      {selectedTab === "nguoidung" && <UsersTable />}
      {selectedTab === "nhacungcap" && <CategoriesTable />}
      {selectedTab === "thietbi" && <ProductsTable />}
    </div>
  )
}

export default AdminPage
