import React, { useState } from 'react';
import axios from 'axios';
const AddCategoryButton = () => {
  const [showInput, setShowInput] = useState(false);
  const [category, setCategory] = useState("");
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
  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleAddCategory = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token không tồn tại. Hãy đăng nhập lại.");
      return;
    }
    if (category.trim() === "") {
        console.log("Ten thuong hieu khong duoc de trong")
        return;
    }
    try {
      const response = await axios.post("http://localhost:8080/phone/category",{ name: category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Thêm thương hiệu thành công!", response.data);
      setCategory("");
      setShowInput(false);
        
    } 
     
    catch (err) {
      if (err.response && err.response.status === 401) {
        console.error("Không có quyền truy cập. Kiểm tra token của bạn hoặc đăng nhập lại.");
      } else {
        console.error("Có lỗi xảy ra:", err);
      }
    }
  };

  return (
    <>
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
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
          </form>
          <div>
      <button onClick={handleShowInput}>Thêm thương hiệu</button>
      
      {showInput && (
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Nhập tên thương hiệu"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button onClick={handleAddCategory} style={{ marginLeft: '5px' }}>
            Thêm
          </button>
        </div>
      )}

    </div>

    </>
  );
};

export default AddCategoryButton;
