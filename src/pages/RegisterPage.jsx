import { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [reqSignup, setReqSignup] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reqSignup.password !== reqSignup.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/register", reqSignup);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReqSignup(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                placeholder="Nhập họ và tên"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                maxLength="10"
                minLength="1"
                placeholder="Nhập số điện thoại"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Mật khẩu</label>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Ngày sinh</label>
              <input
                type="date"
                name="dob"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.dob}
                onChange={handleInputChange}
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
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-500">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
