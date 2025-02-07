import React,{ useState } from "react";
import Navbar from '../Components/Navbar/Navbar';
import Button from "../Components/Button/Button";
const LogInPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="text-center mb-6">
          <div className="text-xl font-bold">Thegioididong</div>
          <h2 className="text-2xl font-semibold mt-2">Chào mừng trở lại</h2>
          <p className="text-gray-500 text-sm">Vui lòng nhập thông tin để đăng nhập</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Số điện thoại</label>
            <input
              type="tel" maxlength="10" minlength="1"
              placeholder="Nhập số điện thoại"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="text-sm text-gray-600">Mật khẩu</label>
            <input
              placeholder="Nhập mật khẩu"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-blue-500 text-sm">Quên mật khẩu?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Chưa có tài khoản? <a href="#" className="text-blue-500">Đăng ký</a>
        </p>
      </div>
    </div>
    </>
  );
  
}

export default LogInPage