import React, { useState } from 'react';
import api from '../../../services/api';
const AddCategoryButton = () => {
  const [showInput, setShowInput] = useState(false);
  const [category, setCategory] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
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
      const response = await api.post("/phone/category",{ name: category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Thêm thương hiệu thành công!", response.data);
      alert("Thêm thương hiệu thành công!");
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
