import { useState } from "react";
import Navbar from '../Components/Navbar/Navbar';

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="text-center mb-6">
          <div className="text-xl font-bold">Thegioididong</div>
          <h2 className="text-2xl font-semibold mt-2">Tạo tài khoản</h2>
          <p className="text-gray-500 text-sm">Vui lòng nhập thông tin để đăng ký</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
            <label className="text-sm text-gray-600">Mật khẩu</label>
            <input
              placeholder="Nhập mật khẩu"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Xác nhận mật khẩu</label>
            <input
              placeholder="Nhập lại mật khẩu"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Ngày sinh</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Đã có tài khoản? <a href="#" className="text-blue-500">Đăng nhập</a>
        </p>
      </div>
    </div>
    </>
  );
}
