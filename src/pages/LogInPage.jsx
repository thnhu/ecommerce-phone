import { useState, useEffect } from "react";
import Navbar from "../Components/UserPageComponents/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from '../Components/CustomSnackbar'
const LogInPage = () => {
  const navigate = useNavigate();
  const [reqLogin, setReqLogin] = useState({ phoneNumber: "", password: "" });
  const [errors, setErrors] = useState({ phone: "", password: "", general: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý validate
  const validateForm = () => {
    const newErrors = { phone: "", password: "" };
    const phoneRegex = /^0\d{9}$/;
  
    if (!reqLogin.phoneNumber) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(reqLogin.phoneNumber)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số";
    }
  
    if (!reqLogin.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (reqLogin.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
  
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/phone/auth/token", reqLogin);
      const token = response.data.data.token;
      
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/");
      } else {
        setErrors({ ...errors, general: "Đăng nhập thất bại, vui lòng thử lại" });
      }
    } catch (error) {
      let errorMsg = "";
      if (error.response.data.message = "Unauthenticated") {
        errorMsg = "Số điện thoại hoặc mật khẩu không đúng";
      }
      else errorMsg = "Lỗi hệ thống, vui lòng thử lại sau";
      setErrors({ ...errors, general: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // Thêm event listener cho Enter
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [reqLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReqLogin(prev => ({ ...prev, [name]: value }));
    // Clear error khi người dùng bắt đầu nhập lại
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-xl font-bold">DIDONGVERSE</div>
            <h2 className="text-2xl font-semibold mt-2">Chào mừng trở lại</h2>
            <p className="text-gray-500 text-sm mt-1">
            Vui lòng nhập thông tin để đăng nhập
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Số điện thoại</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                className={`w-full mt-1 p-2 border rounded-lg focus:outline-none ${
                  errors.phone ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
                value={reqLogin.phoneNumber}
                onChange={handleInputChange}
                name="phoneNumber"
                maxLength="10"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className={`w-full mt-1 p-2 border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
                value={reqLogin.password}
                onChange={handleInputChange}
                name="password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white p-2 rounded-full transition ${
                isSubmitting ? "bg-gray-400" : "bg-black hover:bg-gray-800"
              }`}
            >
              Đăng nhập
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogInPage;