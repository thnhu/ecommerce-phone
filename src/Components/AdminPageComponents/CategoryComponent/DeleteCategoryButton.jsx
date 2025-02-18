import React from 'react';
import axios from 'axios';
const DeleteCategoryButton = ({ categoryId, onDeleteSuccess }) => {
  const handleDeleteCategory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`http://localhost:8080/phone/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }
      
    );
    console.log('Xóa danh mục thành công:', response.data);
    console.log('Status code:', response.status);


      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
    }
  };

  return (
    <button onClick={handleDeleteCategory}>
      Xóa danh mục
    </button>
  );
};

export default DeleteCategoryButton;
