// import { useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";

// export const Register = () => {
//   const [userData, setUserData] = useState({
//     displayName: "",
//     email: "",
//     password: "",
//     repeatPassword: "",
//     phoneNumber: "",
//     dob: "",
//     avatar: null,
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setUserData({
//       ...userData,
//       [name]: type === "file" ? files[0] : value,
//     });
//     setErrors({
//       ...errors,
//       [name]: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (userData.password !== userData.repeatPassword) {
//       setErrors({ ...errors, repeatPassword: "Mật khẩu không khớp" });
//       return;
//     }

//     const formData = new FormData();
//     formData.append(
//       "user",
//       new Blob(
//         [
//           JSON.stringify({
//             displayName: userData.displayName,
//             email: userData.email,
//             password: userData.password,
//             phoneNumber: userData.phoneNumber,
//             dob: userData.dob,
//           }),
//         ],
//         { type: "application/json" }
//       )
//     );
//     if (userData.avatar) {
//       formData.append("avatar", userData.avatar);
//     }

//     try {
//       const response = await api('/phone/user', formData);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-1/2 flex flex-col items-center justify-center gap-3">
//       <div className="uppercase text-3xl font-extrabold text-sky-500">
//         ĐĂNG KÝ
//       </div>
//       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
//         <input
//           type="text"
//           name="displayName"
//           placeholder="Họ và tên"
//           className="bg-gray-200 w-full h-10 rounded-3xl p-3 outline-none"
//           value={userData.displayName}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Số điện thoại"
//           className="bg-gray-200 w-full h-10 rounded-3xl p-3 outline-none"
//           value={userData.phoneNumber}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="bg-gray-200 w-full h-10 rounded-3xl p-3 outline-none"
//           value={userData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="dob"
//           placeholder="Ngày sinh"
//           className="bg-gray-200 w-full h-10 rounded-3xl p-3 outline-none"
//           value={userData.dob}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Mật khẩu"
//           className="bg-gray-200 w-full h-10 rounded-3xl p-3 outline-none"
//           value={userData.password}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="repeatPassword"
//           placeholder="Nhập lại mật khẩu"
//           className="bg-gray-200 w-full h-10 rounded-3xl p-3 outline-none"
//           value={userData.repeatPassword}
//           onChange={handleChange}
//         />
//         {errors.repeatPassword && (
//           <span className="text-red-500">{errors.repeatPassword}</span>
//         )}
//         <input
//           type="file"
//           name="avatar"
//           accept="image/*"
//           className="w-full"
//           onChange={handleChange}
//         />
//         <button
//           type="submit"
//           className="bg-sky-500 w-full h-10 rounded-3xl text-white font-bold"
//         >
//           Tạo tài khoản
//         </button>
//       </form>
//       <Link to="/login" className="text-sky-500">
//         Đăng nhập
//       </Link>
//     </div>
//   );
// };

// export default Register



import { useState, useEffect } from "react";
import Navbar from "../Components/UserPageComponents/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  // ... các state khác giữ nguyên
  const [errors, setErrors] = useState({
    displayName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
    confirmPassword: "",
    avatar: "",
  });

  // Xử lý validate
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "displayName":
        if (!value.trim()) error = "Vui lòng nhập họ tên";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) error = "Email không hợp lệ";
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) error = "Số điện thoại phải có 10 chữ số";
        break;
      case "password":
        if (value.length < 6) error = "Mật khẩu phải có ít nhất 6 ký tự";
        break;
      case "dob": {
        const dobDate = new Date(value);
        const today = new Date();
        if (dobDate >= today) error = "Ngày sinh không hợp lệ";
        break;
      }
      case "confirmPassword":
        if (value !== reqSignup.password) error = "Mật khẩu không khớp";
        break;
      default:
        break;
    }
    return error;
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate tất cả trường
    const newErrors = {
      displayName: validateField("displayName", reqSignup.displayName),
      email: validateField("email", reqSignup.email),
      phoneNumber: validateField("phoneNumber", reqSignup.phoneNumber),
      password: validateField("password", reqSignup.password),
      dob: validateField("dob", reqSignup.dob),
      confirmPassword: validateField("confirmPassword", confirmPassword),
    };

    setErrors(newErrors);

    // Kiểm tra có lỗi không
    if (Object.values(newErrors).some((error) => error)) return;

    // ... phần còn lại của handleSubmit giữ nguyên
  };

  // Xử lý nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // Thêm responsive
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-2 pb-2 px-4">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Các phần khác giữ nguyên */}

          {/* Ví dụ 1 trường input có validation */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Họ và tên</label>
            <input
              type="text"
              name="displayName"
              placeholder="Nhập họ và tên"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reqSignup.displayName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            {errors.displayName && (
              <div className="text-red-500 text-sm mt-1">{errors.displayName}</div>
            )}
          </div>

          {/* Thêm các trường validation tương tự cho các input khác */}

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-full hover:bg-gray-800 transition transform hover:scale-105"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </>
  );
}

        // if (apiErrors === "User existed! Please check your phone number or email") {
        //   setErrors("Tài khoản đã tồn tại! Vui lòng sử dụng số điện thoại hoặc email khác");
