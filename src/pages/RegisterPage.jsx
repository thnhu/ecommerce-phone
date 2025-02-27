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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if passwords match
  //   if (reqSignup.password !== confirmPassword) {
  //     setError("Xác nhận mật khẩu không khớp.");
  //     return;
  //   }

  //   // Create a new FormData object
  //   const formData = new FormData();

  //   formData.append("user", reqSignup);

  //   if (avatar) {
  //     formData.append("avatar", avatar);
  //   } else {
  //     setError("Vui lòng chọn ảnh đại diện.");
  //     return;
  //   }

  //   try {
  //     // Send the form data with multipart/form-data header
  //     // for (let [key, value] of formData.entries()) {
  //     //   console.log(key, value);
  //     // }
  //     const response = await axios.post(
  //       "http://localhost:8080/phone/user",
  //       formData
  //     );

  //     if (response.status === 200) {
  //       navigate("/login");
  //     } else {
  //       setError("Đăng ký thất bại. Vui lòng thử lại sau.");
  //     }
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     for (let [key, value] of formData.entries()) {
  //       console.log("Data type: " + typeof value);
  //       console.log(key, value);
  //     }
  //     setError("Đăng ký thất bại. Vui lòng thử lại sau.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reqSignup.password !== confirmPassword) {
      setError("Mật khẩu không khớp");
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
    console.log(reqSignup)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:8080/phone/user', formData);
      console.log(response);
    } catch (error) {
      console.log(error);
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