import { useState } from "react";
import Navbar from "../Components/UserPageComponents/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Components/UserPageComponents/LogoutButton";
const LogInPage = () => {
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [reqLogin, setReqLogin] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/phone/auth/token", reqLogin)
      .then((response) => {
        console.log("Response:", response.data.data.token);
        const token = response.data.data.token;
        if (token) {
          localStorage.setItem("authToken", token); // Save token to localStorage
          console.log("Token saved:", token); // Log the token after saving it
          navigate("/");
        } else {
          console.error("No token found in the response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReqLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <div className="text-center mb-6">
            <div className="text-xl font-bold">Thegioididong</div>
            <h2 className="text-2xl font-semibold mt-2">Chào mừng trở lại</h2>
            <p className="text-gray-500 text-sm">
              Vui lòng nhập thông tin để đăng nhập
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Số điện thoại</label>
              <input
                type="tel"
                maxLength="10"
                minLength="1"
                placeholder="Nhập số điện thoại"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqLogin.phone}
                onChange={handleInputChange}
                name="phoneNumber"
              />
            </div>
            <div className="mb-4 relative">
              <label className="text-sm text-gray-600">Mật khẩu</label>
              <input
              type="password"
                placeholder="Nhập mật khẩu"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqLogin.password}
                onChange={handleInputChange}
                name="password"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <a href="#" className="text-blue-500 text-sm">
                Quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>

          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-500">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
