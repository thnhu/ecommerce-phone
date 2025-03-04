import { useState } from "react";
import Navbar from "../Components/UserPageComponents/Navbar";
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
  const [avatar, setAvatar] = useState(null); // To hold the upload image
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Hàm validate: kiểm tra dữ liệu nhập vào từng trường
  const validate = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];
    if (!reqSignup.displayName.trim()) {
      errors.displayName = "Họ và tên không được để trống";
    }
    if (!reqSignup.email.trim()) {
      errors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(reqSignup.email)) {
        errors.email = "Email không hợp lệ";
      }
    }
    if (!reqSignup.phoneNumber.trim()) {
      errors.phoneNumber = "Số điện thoại không được để trống";
    } else if (reqSignup.phoneNumber.length < 10) {
      errors.phoneNumber = "Số điện thoại phải có ít nhất 10 số";
    }
    if (!reqSignup.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (reqSignup.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (reqSignup.password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu không khớp";
    }
    if (!reqSignup.dob) {
      errors.dob = "Ngày sinh không được để trống";
    }
    if (reqSignup.dob > today) errors.dob = "Ngày sinh không hợp lệ";
    if (!avatar) {
      errors.avatar = "Vui lòng chọn một ảnh";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset lỗi trước khi validate

    // Validate client-side
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append(
      "user",
      new Blob(
        [
          JSON.stringify({
            displayName: reqSignup.displayName,
            email: reqSignup.email,
            password: reqSignup.password,
            phoneNumber: reqSignup.phoneNumber,
            dob: reqSignup.dob,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.post("http://localhost:8080/phone/user", formData);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const apiErrors = error.response.data.errors;
        if (apiErrors) {
          setFieldErrors("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.");
        } else if (error.response.data.message === "User existed! Please check your phone number or email") {
          setErrors({ general:"Tài khoản đã tồn tại! Vui lòng sử dụng số điện thoại hoặc email khác"});
        }
      } else {
        setFieldErrors({ general: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau." });
      }
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
    setAvatar(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-xl font-bold">Thegioididong</div>
            <h2 className="text-2xl font-semibold mt-2">Tạo tài khoản</h2>
            <p className="text-gray-500 text-sm">
              Vui lòng nhập thông tin để đăng ký
            </p>
          </div>
          {errors.general && (
            <div className="text-red-500 text-center mb-4">{errors.general}</div>
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
              {errors.displayName && (
                <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Số điện thoại</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reqSignup.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
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
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Ảnh đại diện</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
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
