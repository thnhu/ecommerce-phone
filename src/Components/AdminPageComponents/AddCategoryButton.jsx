import React, { useState } from 'react';
import axios from 'axios';

const AddCategoryButton = () => {
  const [showInput, setShowInput] = useState(false);
  const [category, setCategory] = useState("");

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleAddCategory = async () => {
    if (category.trim() === "") {
        console.log("Ten thuong hieu khong duoc de trong")
        return;
    }
    try {
      const response = await axios.post("http://localhost:8080/phone/category",{ name: category });
      console.log("Thêm thương hiệu thành công!");
      setCategory("");
      setShowInput(false);
    } 
    catch (err) {
      console.log("Có lỗi xảy ra khi thêm thương hiệu.");
      console.error(err);
    }
  };

  return (
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
  );
};

export default AddCategoryButton;
