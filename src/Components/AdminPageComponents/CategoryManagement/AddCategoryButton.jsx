import React, { useState } from 'react';
import api from '../../../services/api';
const AddCategoryButton = () => {
  const [category, setCategory] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCategory = async () => {
    if (category.trim() === "") {
        console.log("Ten thuong hieu khong duoc de trong")
        return;
    }
    try {
      const response = await api.post("/phone/category",{ name: category },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Thêm thương hiệu thành công!", response.data);
      alert("Thêm thương hiệu thành công!");
      setCategory("");
    } 
     
    catch (err) {
      if (err.response && err.response.status === 401) {
        console.error("Không có quyền truy cập. Kiểm tra token của bạn hoặc đăng nhập lại.");
        alert("Không có quyền truy cập. Kiểm tra token của bạn hoặc đăng nhập lại.");
      } else {
        console.error("Có lỗi xảy ra:", err);
      }
    }
  };

  return (
    <>
      <div>
        <h2>Thêm nhà cung cấp</h2>        
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
      </div>
    </>
  );
};

export default AddCategoryButton;
