import { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [reqSignup, setReqSignup] = useState({
    displayName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
  });
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [avatar, setAvatar] = useState(null); // To hold the uploaded image
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (reqSignup.password !== confirmPassword) {
      setError("Xác nhận mật khẩu không khớp.");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    formData.append("user", reqSignup);

    if (avatar) {
      formData.append("avatar", avatar);
    } else {
      setError("Vui lòng chọn ảnh đại diện.");
      return;
    }

    try {
      // Send the form data with multipart/form-data header
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      const response = await axios.post(
        "http://localhost:8080/phone/user",
        formData
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      for (let [key, value] of formData.entries()) {
        console.log("Data type: " + typeof value);
        console.log(key, value);
      }
      setError("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReqSignup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // Get the first file object
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <div className="text-center mb-6">
            <div className="text-xl font-bold">Thegioididong</div>
            <h2 className="text-2xl font-semibold mt-2">Tạo tài khoản</h2>
            <p className="text-gray-500 text-sm">
              Vui lòng nhập thông tin để đăng ký
            </p>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Họ và tên</label>
              <input
                type="text"
                name="displayName"
                placeholder="Nhập họ và tên"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.displayName}
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
                name="phoneNumber"
                maxLength="10"
                minLength="1"
                placeholder="Nhập số điện thoại"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.phoneNumber}
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
                value={confirmPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
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

            {/* Avatar image input */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Ảnh đại diện</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
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
