import React, { useState } from 'react'
import UsersTable from '../Components/AdminPageComponents/UsersTable'
// import ProductData from '../Components/AdminPageComponents/ProductComponent/ProductData'
import CategoriesList from '../Components/AdminPageComponents/CategoryManagement/CategoryList'
const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('')
  const handleClick = (e) => {
    setSelectedTab(e.target.id)
  }

  const SideBar = () => {
    return (
      <aside className=' lg:w-1/6 bg-gray-900 min-w-[100px] md:min-w-[200px] h-full text-white pl-4 pr-1 md:pt-3'>
        <p className='font-p text-xl lg:text-2xl py-3'>Quản lý chung</p>
        <ul>
          <li
            key="trangchu"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${selectedTab === 'trangchu' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            <button
              id="trangchu"
              className="md:w-full text-left"
              onClick={handleClick}
            >
              Trang chủ
            </button>
          </li>
          <li
            key="thietbi"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${selectedTab === 'thietbi' ? 'bg-gray-800 rounded-md' : ''}`}
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
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${selectedTab === 'nhacungcap' ? 'bg-gray-800 rounded-md' : ''}`}
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
            key="nguoidung"
            className={`md:w-full md:px-5 px-1 py-3 text-sm lg:text-xl ${selectedTab === 'nguoidung' ? 'bg-gray-800 rounded-md' : ''}`}
          >
            <button
              id="nguoidung"
              className="md:w-full text-left"
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
    <>
      <div className='w-full h-screen flex'>
        <SideBar></SideBar>
        {selectedTab === "nguoidung" && <UsersTable />}
        {selectedTab === "nhacungcap" && <CategoriesList />}
        {/* {selectedTab === "thietbi" && <ProductData />} */}
      </div>
      
    </>
    
  )
}

export default AdminPage
